"use client";

import { DocumentUploadSection } from "./DocumentUploadSection";

const inputClassName =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-rose-300 focus:ring-1 focus:ring-rose-100";

interface PostulacionDocumentosFlowProps {
  documentId: string;
}

export const PostulacionDocumentosFlow = ({
  documentId,
}: PostulacionDocumentosFlowProps) => {
  return (
    <div className="space-y-8">
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
            className={inputClassName}
            placeholder="2"
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
            className={inputClassName}
            placeholder="28, 35"
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
            className={inputClassName}
            placeholder="María García, Juan Pérez"
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
            className={inputClassName}
            placeholder="maria@correo.com, juan@correo.com"
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
            className={inputClassName}
            placeholder="Barrio Los Molinos"
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
            className={inputClassName}
            placeholder="1.200.000"
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
            className={`${inputClassName} resize-y min-h-[100px]`}
            placeholder="La dueña del inmueble no me ha querido resolver una gotera y por eso me quiero ir"
          />
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-emerald-100 bg-emerald-50/70 px-4 py-5 sm:px-5">
        <div>
          <label
            htmlFor="pets"
            className="mb-1 block text-sm text-gray-700"
          >
            ¿Tiene mascotas? ¿Cuáles y cuántas?
          </label>
          <input
            id="pets"
            name="pets"
            type="text"
            className={inputClassName}
            placeholder="Sí, 1 perro y 2 gatos / No"
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
            className={inputClassName}
            placeholder="Sí, carro. Necesito parqueadero / No"
          />
        </div>
      </section>

      <section className="space-y-5 rounded-xl border border-amber-100 bg-amber-50/70 px-4 py-6 sm:px-5">
        <h2 className="text-sm font-semibold text-amber-900">
          ¿Eres empleado asalariado?
        </h2>
        <DocumentUploadSection label="Subir fotocopia documentos de identidad" />
        <DocumentUploadSection label="Subir certificados laborales (no mayor a 30 días)" />
        <DocumentUploadSection label="Subir extractos bancarios (últimos tres (3) meses)" />
      </section>

      <section className="space-y-5 border-t border-gray-100 pt-8">
        <h2 className="text-sm font-semibold text-gray-900">
          ¿Eres independiente?
        </h2>
        <DocumentUploadSection
          hideDropZone
          label="Subir fotocopia documentos de identidad"
        />
        <DocumentUploadSection
          hideDropZone
          label="Certificado de Cámara de Comercio (no mayor a 30 días)"
        />
        <DocumentUploadSection
          hideDropZone
          label="Subir extractos bancarios (últimos tres (3) meses)"
        />
      </section>

      <section className="space-y-5 border-t border-gray-100 pt-8">
        <h2 className="text-sm font-semibold text-gray-900">
          ¿Eres pensionado(a)?
        </h2>
        <DocumentUploadSection
          hideDropZone
          label="Subir fotocopia documentos de identidad"
        />
        <DocumentUploadSection
          hideDropZone
          label="Subir certificado o colilla de pensión (no mayor a 30 días)"
        />
        <DocumentUploadSection
          hideDropZone
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
          hideDropZone
          label="Subir documentos de identidad"
        />
        <DocumentUploadSection
          hideDropZone
          label="Certificado de libertad y tradición (si es con finca raíz)"
        />
        <DocumentUploadSection
          hideDropZone
          label="Subir extractos bancarios (últimos tres (3) meses) (si es empleado)"
        />
        <DocumentUploadSection
          hideDropZone
          label="Subir certificados laborales (no mayor a 30 días) (si es empleado)"
        />
      </section>
    </div>
  );
};
