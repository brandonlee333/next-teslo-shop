"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import clsx from "clsx";

import { savePostulacion } from "@/actions";
import type { PostulacionDocumentKey } from "@/lib/postulacion/document-keys";
import {
  getApplicantReviewStatusClassName,
  POSTULACION_REVIEW_STATUS_APPLICANT_LABELS,
  type PostulacionReviewStatus,
} from "@/lib/postulacion/review-status";
import {
  getMissingPostulacionFieldIds,
  type PostulacionRequiredFieldId,
} from "@/lib/postulacion/validate-postulacion-fields";
import { DocumentUploadSection, type UploadedFile } from "./DocumentUploadSection";

const inputClassName =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-rose-300 focus:ring-1 focus:ring-rose-100";

const inputErrorClassName =
  "border-red-400 bg-red-50/60 focus:border-red-400 focus:ring-red-100";

export interface PostulacionInitialData {
  occupantCount: number | null;
  occupantAges: string;
  titularNames: string;
  titularEmails: string;
  currentResidence: string;
  previousRent: string;
  moveReason: string;
  pets: string;
  vehicleParking: string;
  documentsByCategory: Record<string, UploadedFile[]>;
}

interface PostulacionDocumentosFlowProps {
  documentId: string;
  initialData: PostulacionInitialData | null;
  reviewStatus: PostulacionReviewStatus;
  queuePosition: number | null;
}

function getInitialFiles(
  initialData: PostulacionInitialData | null,
  key: PostulacionDocumentKey,
): UploadedFile[] {
  return initialData?.documentsByCategory[key] ?? [];
}

export const PostulacionDocumentosFlow = ({
  documentId,
  initialData,
  reviewStatus,
  queuePosition,
}: PostulacionDocumentosFlowProps) => {
  const [state, dispatch] = useFormState(savePostulacion, undefined);

  const formRef = useRef<HTMLFormElement | null>(null);
  const saveModeInputRef = useRef<HTMLInputElement | null>(null);
  const suppressAutoSaveRef = useRef(false);
  const saveTimerRef = useRef<number | null>(null);
  const hasPendingChangesRef = useRef(false);
  const wasAutoSubmitRef = useRef(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [validationErrors, setValidationErrors] = useState<
    Set<PostulacionRequiredFieldId>
  >(() => new Set());

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
    };
  }, []);

  const submitPersonalDraft = useCallback(() => {
    if (!formRef.current || !saveModeInputRef.current) return;
    wasAutoSubmitRef.current = true;
    setAutoSaveStatus("saving");
    saveModeInputRef.current.value = "personal";
    formRef.current.requestSubmit();
    hasPendingChangesRef.current = false;
  }, []);

  useEffect(() => {
    if (state !== "IncompleteQuestions" || !formRef.current) return;

    const missing = getMissingPostulacionFieldIds(new FormData(formRef.current));
    setValidationErrors(new Set(missing));

    const firstField = formRef.current.querySelector<HTMLElement>(
      `#${missing[0]}`,
    );
    firstField?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [state]);

  useEffect(() => {
    if (!wasAutoSubmitRef.current) return;

    if (state === "Success") {
      setAutoSaveStatus("saved");
      wasAutoSubmitRef.current = false;
      return;
    }

    if (state === "InvalidData" || state === "Unauthorized" || state === "Error") {
      setAutoSaveStatus("error");
      wasAutoSubmitRef.current = false;
    }
  }, [state]);

  useEffect(() => {
    const saveBeforeLeave = () => {
      if (suppressAutoSaveRef.current) return;
      if (!hasPendingChangesRef.current) return;
      submitPersonalDraft();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        saveBeforeLeave();
      }
    };

    window.addEventListener("pagehide", saveBeforeLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("pagehide", saveBeforeLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [submitPersonalDraft]);

  const handleManualSubmit = useCallback(() => {
    // Evita que el blur del último input dispare un auto-save
    // cuando el usuario presiona "Guardar postulación".
    suppressAutoSaveRef.current = true;
    if (saveModeInputRef.current) saveModeInputRef.current.value = "full";

    if (saveTimerRef.current) {
      window.clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }

    window.setTimeout(() => {
      suppressAutoSaveRef.current = false;
    }, 600);
  }, []);

  const autoSave = useCallback(() => {
    if (suppressAutoSaveRef.current) return;
    if (!formRef.current || !saveModeInputRef.current) return;

    if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);

    // Debounce para no enviar demasiadas requests al navegar con Tab.
    saveTimerRef.current = window.setTimeout(() => {
      if (!hasPendingChangesRef.current) return;
      submitPersonalDraft();
      saveTimerRef.current = null;
    }, 200);
  }, [submitPersonalDraft]);

  const fieldClassName = (fieldId: PostulacionRequiredFieldId) =>
    clsx(
      inputClassName,
      validationErrors.has(fieldId) && inputErrorClassName,
    );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get("saveMode") !== "full") {
      setValidationErrors(new Set());
      return;
    }

    const missing = getMissingPostulacionFieldIds(formData);
    if (missing.length === 0) {
      setValidationErrors(new Set());
      return;
    }

    event.preventDefault();
    setValidationErrors(new Set(missing));

    const firstField = form.querySelector<HTMLElement>(`#${missing[0]}`);
    firstField?.scrollIntoView({ behavior: "smooth", block: "center" });
    firstField?.focus();
  };

  return (
    <form
      ref={formRef}
      action={dispatch}
      className="space-y-8"
      onSubmit={handleSubmit}
      onChangeCapture={() => {
        hasPendingChangesRef.current = true;
        setValidationErrors(new Set());
      }}
    >
      <input type="hidden" name="documentId" value={documentId} readOnly />

      <input
        type="hidden"
        name="saveMode"
        defaultValue="full"
        ref={saveModeInputRef}
      />

      {state === "Success" && (
        <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          Tu postulación se guardó correctamente.
        </p>
      )}

      {validationErrors.size > 0 && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          Hay preguntas sin contestar. Completa los campos marcados en rojo
          antes de guardar tu postulación.
        </p>
      )}

      {state === "IncompleteQuestions" && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Hay preguntas sin contestar. Completa todos los campos del formulario
          e intenta de nuevo.
        </p>
      )}

      {state === "InvalidData" && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Revisa los datos ingresados e intenta de nuevo.
        </p>
      )}

      {state === "Unauthorized" && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Tu sesión expiró. Vuelve a iniciar sesión en el paso anterior.
        </p>
      )}

      {state === "Error" && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          No se pudo guardar la postulación. Intenta de nuevo.
        </p>
      )}

      <section className="space-y-4 rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-5 sm:px-5">
        <p className="text-xs text-gray-400">Documento titular: {documentId}</p>

        <div>
          <label
            htmlFor="occupantCount"
            className="mb-1 block text-sm text-gray-700"
          >
            ¿Cuántas personas habitarán el inmueble?
          </label>
          <input
            id="occupantCount"
            name="occupantCount"
            type="number"
            min={1}
            defaultValue={initialData?.occupantCount ?? ""}
            className={fieldClassName("occupantCount")}
            placeholder="2"
            aria-invalid={validationErrors.has("occupantCount")}
            onBlur={autoSave}
          />
        </div>

        <div>
          <label
            htmlFor="occupantAges"
            className="mb-1 block text-sm text-gray-700"
          >
            Ingresa las edades de las personas que habitarán el inmueble:
          </label>
          <input
            id="occupantAges"
            name="occupantAges"
            type="text"
            defaultValue={initialData?.occupantAges ?? ""}
            className={fieldClassName("occupantAges")}
            placeholder="28, 35"
            aria-invalid={validationErrors.has("occupantAges")}
            onBlur={autoSave}
          />
        </div>

        <div>
          <label
            htmlFor="titularNames"
            className="mb-1 block text-sm text-gray-700"
          >
            Nombre de quienes se harán responsables economicamente del arriendo:
          </label>
          <input
            id="titularNames"
            name="titularNames"
            type="text"
            defaultValue={initialData?.titularNames ?? ""}
            className={fieldClassName("titularNames")}
            placeholder="María García, Juan Pérez"
            aria-invalid={validationErrors.has("titularNames")}
            onBlur={autoSave}
          />
        </div>

        <div>
          <label
            htmlFor="titularEmails"
            className="mb-1 block text-sm text-gray-700"
          >
            Correo de la persona titular{" "}
            <span className="font-normal text-gray-400">
              (aquí recibirás las notificaciones de la aseguradora):
            </span>
          </label>
          <input
            id="titularEmails"
            name="titularEmails"
            type="text"
            defaultValue={initialData?.titularEmails ?? ""}
            className={fieldClassName("titularEmails")}
            placeholder="maria@correo.com, juan@correo.com"
            aria-invalid={validationErrors.has("titularEmails")}
            onBlur={autoSave}
          />
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-violet-100 bg-violet-50/70 px-4 py-5 sm:px-5">
        <div>
          <label
            htmlFor="currentResidence"
            className="mb-1 block text-sm text-gray-700"
          >
            ¿Dónde vives actualmente?{" "}
            <span className="font-normal text-gray-400">
              Ejemplo: barrio Los Molinos
            </span>
          </label>
          <input
            id="currentResidence"
            name="currentResidence"
            type="text"
            defaultValue={initialData?.currentResidence ?? ""}
            className={fieldClassName("currentResidence")}
            placeholder="Barrio Los Molinos"
            aria-invalid={validationErrors.has("currentResidence")}
            onBlur={autoSave}
          />
        </div>

        <div>
          <label
            htmlFor="previousRent"
            className="mb-1 block text-sm text-gray-700"
          >
            ¿Cuánto pagabas en tu anterior arriendo?
          </label>
          <input
            id="previousRent"
            name="previousRent"
            type="text"
            inputMode="numeric"
            defaultValue={initialData?.previousRent ?? ""}
            className={fieldClassName("previousRent")}
            placeholder="1.200.000"
            aria-invalid={validationErrors.has("previousRent")}
            onBlur={autoSave}
          />
        </div>

        <div>
          <label
            htmlFor="moveReason"
            className="mb-1 block text-sm text-gray-700"
          >
            ¿Por qué te quieres mudar?{" "}
            <span className="font-normal text-gray-400">
              (sé lo más sincero(a) posible)
            </span>
          </label>
          <textarea
            id="moveReason"
            name="moveReason"
            rows={4}
            defaultValue={initialData?.moveReason ?? ""}
            className={clsx(
              fieldClassName("moveReason"),
              "resize-y min-h-[100px]",
            )}
            placeholder="La dueña del inmueble no me ha querido resolver una gotera y por eso me quiero ir"
            aria-invalid={validationErrors.has("moveReason")}
            onBlur={autoSave}
          />
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-emerald-100 bg-emerald-50/70 px-4 py-5 sm:px-5">
        <div>
          <label htmlFor="pets" className="mb-1 block text-sm text-gray-700">
            ¿Tiene mascotas? ¿Cuáles y cuántas?
          </label>
          <input
            id="pets"
            name="pets"
            type="text"
            defaultValue={initialData?.pets ?? ""}
            className={fieldClassName("pets")}
            placeholder="Sí, 1 perro y 2 gatos / No"
            aria-invalid={validationErrors.has("pets")}
            onBlur={autoSave}
          />
        </div>

        <div>
          <label
            htmlFor="vehicleParking"
            className="mb-1 block text-sm text-gray-700"
          >
            ¿Tiene vehículo? ¿Necesita parqueadero?
          </label>
          <input
            id="vehicleParking"
            name="vehicleParking"
            type="text"
            defaultValue={initialData?.vehicleParking ?? ""}
            className={fieldClassName("vehicleParking")}
            placeholder="Sí, carro. Necesito parqueadero / No"
            aria-invalid={validationErrors.has("vehicleParking")}
            onBlur={autoSave}
          />
        </div>
      </section>

      <section className="space-y-5 rounded-xl border border-amber-100 bg-amber-50/70 px-4 py-6 sm:px-5">
        <h2 className="text-sm font-semibold text-amber-900">
          ¿Eres empleado asalariado?
        </h2>
        <DocumentUploadSection
          documentKey="asalariado_identidad"
          initialFiles={getInitialFiles(initialData, "asalariado_identidad")}
          label="Subir fotocopia documentos de identidad"
        />
        <DocumentUploadSection
          documentKey="asalariado_laborales"
          initialFiles={getInitialFiles(initialData, "asalariado_laborales")}
          label="Subir certificados laborales (no mayor a 30 días)"
        />
        <DocumentUploadSection
          documentKey="asalariado_extractos"
          initialFiles={getInitialFiles(initialData, "asalariado_extractos")}
          label="Subir extractos bancarios (últimos tres (3) meses)"
        />
      </section>

      <section className="space-y-5 border-t border-gray-100 pt-8">
        <h2 className="text-sm font-semibold text-gray-900">
          ¿Eres independiente?
        </h2>
        <DocumentUploadSection
          documentKey="independiente_identidad"
          hideDropZone
          initialFiles={getInitialFiles(initialData, "independiente_identidad")}
          label="Subir fotocopia documentos de identidad"
        />
        <DocumentUploadSection
          documentKey="independiente_camara_comercio"
          hideDropZone
          initialFiles={getInitialFiles(
            initialData,
            "independiente_camara_comercio",
          )}
          label="Certificado de Cámara de Comercio (no mayor a 30 días)"
        />
        <DocumentUploadSection
          documentKey="independiente_extractos"
          hideDropZone
          initialFiles={getInitialFiles(initialData, "independiente_extractos")}
          label="Subir extractos bancarios (últimos tres (3) meses)"
        />
      </section>

      <section className="space-y-5 border-t border-gray-100 pt-8">
        <h2 className="text-sm font-semibold text-gray-900">
          ¿Eres pensionado(a)?
        </h2>
        <DocumentUploadSection
          documentKey="pensionado_identidad"
          hideDropZone
          initialFiles={getInitialFiles(initialData, "pensionado_identidad")}
          label="Subir fotocopia documentos de identidad"
        />
        <DocumentUploadSection
          documentKey="pensionado_pension"
          hideDropZone
          initialFiles={getInitialFiles(initialData, "pensionado_pension")}
          label="Subir certificado o colilla de pensión (no mayor a 30 días)"
        />
        <DocumentUploadSection
          documentKey="pensionado_extractos"
          hideDropZone
          initialFiles={getInitialFiles(initialData, "pensionado_extractos")}
          label="Subir extractos bancarios (últimos tres (3) meses)"
        />
      </section>

      <section className="space-y-5 rounded-xl border border-rose-200 bg-rose-50/70 px-4 py-6 sm:px-5">
        <h2 className="text-sm font-semibold text-rose-900">
          ¿Cuentas con fiador/codeudor?{" "}
          <span className="font-normal text-gray-500">
            (recuerda que esta persona NO debe habitar el inmueble contigo :))
          </span>
        </h2>
        <DocumentUploadSection
          documentKey="fiador_identidad"
          hideDropZone
          initialFiles={getInitialFiles(initialData, "fiador_identidad")}
          label="Subir documentos de identidad"
        />
        <DocumentUploadSection
          documentKey="fiador_libertad_tradicion"
          hideDropZone
          initialFiles={getInitialFiles(
            initialData,
            "fiador_libertad_tradicion",
          )}
          label="Certificado de libertad y tradición (si es con finca raíz)"
        />
        <DocumentUploadSection
          documentKey="fiador_extractos"
          hideDropZone
          initialFiles={getInitialFiles(initialData, "fiador_extractos")}
          label="Subir extractos bancarios (últimos tres (3) meses) (si es empleado)"
        />
        <DocumentUploadSection
          documentKey="fiador_laborales"
          hideDropZone
          initialFiles={getInitialFiles(initialData, "fiador_laborales")}
          label="Subir certificados laborales (no mayor a 30 días) (si es empleado)"
        />
      </section>

      {autoSaveStatus !== "idle" && (
        <p
          className={clsx(
            "text-center text-xs",
            autoSaveStatus === "error" ? "text-red-600" : "text-gray-500",
          )}
        >
          {autoSaveStatus === "saving" && "Guardando borrador..."}
          {autoSaveStatus === "saved" && "Guardado automáticamente"}
          {autoSaveStatus === "error" &&
            "No se pudo guardar automáticamente. Usa el botón Guardar postulación."}
        </p>
      )}

      <SaveButton onBeforeSubmit={handleManualSubmit} />

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">Estado de tu postulación</p>
        <p
          className={clsx(
            "mt-2 inline-block rounded-full border px-4 py-2 text-sm font-semibold",
            getApplicantReviewStatusClassName(reviewStatus),
          )}
        >
          {POSTULACION_REVIEW_STATUS_APPLICANT_LABELS[reviewStatus]}
        </p>
      </div>

      {queuePosition != null && (
        <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-5 text-center text-sm leading-relaxed text-gray-700">
          {queuePosition > 1 && (
            <p>
              Antes que tú, otras personas también han enviado sus documentos.
            </p>
          )}
          <p className={clsx(queuePosition > 1 && "mt-2")}>
            Estás en la posición{" "}
            <span className="font-bold text-rose-600">{queuePosition}</span>.
          </p>
          <p className="mt-3 text-gray-600">
            Nos comprometemos a revisar tu documentación lo más pronto posible
            para darte una respuesta sobre tu proceso.
          </p>
        </div>
      )}
    </form>
  );
};

function SaveButton({ onBeforeSubmit }: { onBeforeSubmit: () => void }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      onMouseDown={onBeforeSubmit}
      className={clsx(
        "w-full rounded-xl py-4 text-sm font-semibold text-white transition-all",
        pending
          ? "cursor-not-allowed bg-gray-400"
          : "bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600 shadow-md shadow-rose-500/30 hover:scale-[1.01] hover:shadow-lg active:scale-[0.99]",
      )}
    >
      {pending ? "Guardando..." : "Guardar postulación"}
    </button>
  );
};
