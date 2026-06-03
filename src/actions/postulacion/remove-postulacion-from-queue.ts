"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const documentIdSchema = z.string().trim().regex(/^\d+$/);

function revalidatePostulacionPaths(documentId: string) {
  revalidatePath("/admin/apartamento/postulaciones");
  revalidatePath(`/admin/apartamento/postulaciones/${documentId}`);
  revalidatePath("/apartamento/postularse/documentos");
}

export async function removePostulacionFromQueue(
  documentId: string,
): Promise<{ ok: boolean; message?: string }> {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return { ok: false, message: "Debe de ser un usuario administrador" };
  }

  const parsed = documentIdSchema.safeParse(documentId);
  if (!parsed.success) {
    return { ok: false, message: "Datos inválidos" };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { documentId: parsed.data },
      select: {
        postulacionApplication: {
          select: { id: true, submittedAt: true },
        },
      },
    });

    if (!user?.postulacionApplication) {
      return { ok: false, message: "Postulación no encontrada" };
    }

    if (!user.postulacionApplication.submittedAt) {
      return {
        ok: false,
        message: "Este postulante no está en la fila de revisión",
      };
    }

    await prisma.postulacionApplication.update({
      where: { id: user.postulacionApplication.id },
      data: { submittedAt: null },
    });

    revalidatePostulacionPaths(parsed.data);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "No se pudo quitar de la fila" };
  }
}
