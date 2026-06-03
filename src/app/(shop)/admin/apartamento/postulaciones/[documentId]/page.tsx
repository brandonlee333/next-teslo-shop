export const revalidate = 0;

import { Title } from "@/components";
import { getPostulacionAdminDetail } from "@/lib/postulacion/get-postulacion-admin-detail";
import { notFound } from "next/navigation";
import { z } from "zod";

import { PostulacionAdminDetailView } from "./ui/PostulacionAdminDetail";

const documentIdSchema = z
  .string()
  .trim()
  .regex(/^\d+$/, "Documento inválido");

interface Props {
  params: { documentId: string };
}

export default async function AdminPostulacionDetailPage({ params }: Props) {
  const parsed = documentIdSchema.safeParse(params.documentId);

  if (!parsed.success) {
    notFound();
  }

  const detail = await getPostulacionAdminDetail(parsed.data);

  if (!detail) {
    notFound();
  }

  return (
    <>
      <Title title={`Postulación ${detail.documentId}`} />
      <PostulacionAdminDetailView detail={detail} />
    </>
  );
}
