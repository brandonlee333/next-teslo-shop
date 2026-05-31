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
      <section className="space-y-4">
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

      <section className="space-y-5 border-t border-gray-100 pt-8">
        <h2 className="text-sm font-semibold text-gray-900">
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
    </div>
  );
};
