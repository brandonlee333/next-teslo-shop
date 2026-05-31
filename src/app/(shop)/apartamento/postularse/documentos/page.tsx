import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { titleFont } from "@/config/fonts";
import { DocumentUploadSection } from "./ui/DocumentUploadSection";

const documentSections = [
  "Certificados laborales de las personas que habitarán el apartamento",
  "Extractos bancarios de los últimos 2 meses",
];

export default function PostulacionDocumentosPage() {
  const documentId = cookies().get("postulacion_document")?.value;

  if (!documentId) {
    redirect("/apartamento/postularse");
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-10 sm:py-14">
      <div className="mb-8 text-center">
        <h1
          className={`${titleFont.className} mb-2 text-2xl font-bold text-gray-900 sm:text-3xl`}
        >
          Documentos de postulación
        </h1>
        <p className="text-sm text-gray-500 sm:text-base">
          Sube los documentos requeridos para continuar con tu postulación.
        </p>
        <p className="mt-2 text-xs text-gray-400">
          Documento titular: {documentId}
        </p>
      </div>

      <div className="space-y-6">
        {documentSections.map((title) => (
          <DocumentUploadSection key={title} title={title} />
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-gray-500">
        <Link
          href="/apartamento"
          className="font-medium text-rose-600 transition-colors hover:text-rose-700"
        >
          ← Volver al apartamento
        </Link>
      </p>
    </div>
  );
}
