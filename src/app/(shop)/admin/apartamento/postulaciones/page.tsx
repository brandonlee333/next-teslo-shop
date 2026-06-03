export const revalidate = 0;

import { getPostulacionesAdmin } from "@/actions/postulacion/get-postulaciones-admin";
import { Title } from "@/components";
import { redirect } from "next/navigation";

import { PostulacionesTable } from "./ui/PostulacionesTable";

export default async function AdminPostulacionesPage() {
  const { ok, postulaciones = [] } = await getPostulacionesAdmin();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Postulaciones al apartamento" />

      <p className="mb-6 text-sm text-gray-600">
        Listado ordenado por fecha de ingreso (primero en registrarse, primero en
        la lista). Incluye postulaciones con datos guardados de forma completa o
        parcial. Una postulación se marca como{" "}
        <strong className="font-medium text-gray-800">Completa</strong> solo
        cuando respondió todas las preguntas y subió al menos un documento.
      </p>

      <div className="mb-10">
        <PostulacionesTable postulaciones={postulaciones} />
      </div>
    </>
  );
}
