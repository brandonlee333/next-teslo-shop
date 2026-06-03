"use server";

import { auth } from "@/auth.config";
import {
  POSTULACION_REVIEW_STATUSES,
  type PostulacionReviewStatus,
} from "@/lib/postulacion/review-status";
import { POSTULACION_REJECTION_CLEAR_DATA } from "@/lib/postulacion/rejection";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const documentIdSchema = z.string().trim().regex(/^\d+$/);

const reviewStatusSchema = z.enum(POSTULACION_REVIEW_STATUSES);

function revalidatePostulacionPaths(documentId: string) {
  revalidatePath("/admin/apartamento/postulaciones");
  revalidatePath(`/admin/apartamento/postulaciones/${documentId}`);
  revalidatePath("/apartamento/postularse/documentos");
}

export async function updatePostulacionReviewStatus(
  documentId: string,
  reviewStatus: PostulacionReviewStatus,
): Promise<{ ok: boolean; message?: string }> {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return { ok: false, message: "Debe de ser un usuario administrador" };
  }

  const documentParsed = documentIdSchema.safeParse(documentId);
  const statusParsed = reviewStatusSchema.safeParse(reviewStatus);

  if (!documentParsed.success || !statusParsed.success) {
    return { ok: false, message: "Datos inválidos" };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { documentId: documentParsed.data },
      select: { postulacionApplication: { select: { id: true } } },
    });

    if (!user?.postulacionApplication) {
      return { ok: false, message: "Postulación no encontrada" };
    }

    await prisma.postulacionApplication.update({
      where: { id: user.postulacionApplication.id },
      data: {
        reviewStatus: statusParsed.data,
        ...(statusParsed.data !== "DISCARDED"
          ? POSTULACION_REJECTION_CLEAR_DATA
          : {}),
      },
    });

    revalidatePostulacionPaths(documentParsed.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "No se pudo actualizar el estado" };
  }
}
