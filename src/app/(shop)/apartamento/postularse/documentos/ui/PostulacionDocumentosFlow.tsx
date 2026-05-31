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
            htmlFor="titularNames"
            className="mb-1 block text-sm text-gray-700"
          >
            Ingresa el nombre de las personas titulares que van a habitar el
            inmueble:
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
            Ingresa los correos de las personas titulares que van a habitar el
            inmueble:
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
        <DocumentUploadSection label="Subir certificados laborales" />
        <DocumentUploadSection label="Subir extractos bancarios" />
      </section>
    </div>
  );
};
