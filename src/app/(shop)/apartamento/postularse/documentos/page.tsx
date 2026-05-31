import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { titleFont } from "@/config/fonts";
import { PostulacionDocumentosFlow } from "./ui/PostulacionDocumentosFlow";

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
        <p className="text-sm text-gray-500">
          Completa tu perfil y sube los documentos requeridos.
        </p>
      </div>

      <PostulacionDocumentosFlow documentId={documentId} />

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
