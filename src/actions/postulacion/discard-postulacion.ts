"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const documentIdSchema = z.string().trim().regex(/^\d+$/);

const rejectionImageSchema = z.object({
  url: z.string().url(),
  originalName: z.string().min(1),
  format: z.string().min(1),
  size: z.number().int().nonnegative(),
});

const discardSchema = z.object({
  documentId: documentIdSchema,
  reason: z.string().trim().min(1, "Debes indicar el motivo del rechazo"),
  image: rejectionImageSchema.nullable(),
});

function revalidatePostulacionPaths(documentId: string) {
  revalidatePath("/admin/apartamento/postulaciones");
  revalidatePath(`/admin/apartamento/postulaciones/${documentId}`);
  revalidatePath("/apartamento/postularse/documentos");
}

export async function discardPostulacion(
  documentId: string,
  reason: string,
  image: z.infer<typeof rejectionImageSchema> | null,
): Promise<{ ok: boolean; message?: string }> {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return { ok: false, message: "Debe de ser un usuario administrador" };
  }

  const parsed = discardSchema.safeParse({ documentId, reason, image });
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Datos inválidos" };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { documentId: parsed.data.documentId },
      select: { postulacionApplication: { select: { id: true } } },
    });

    if (!user?.postulacionApplication) {
      return { ok: false, message: "Postulación no encontrada" };
    }

    await prisma.postulacionApplication.update({
      where: { id: user.postulacionApplication.id },
      data: {
        reviewStatus: "DISCARDED",
        rejectionReason: parsed.data.reason,
        rejectionImageUrl: parsed.data.image?.url ?? null,
        rejectionImageName: parsed.data.image?.originalName ?? null,
        rejectionImageFormat: parsed.data.image?.format ?? null,
        rejectionImageSize: parsed.data.image?.size ?? null,
        rejectedAt: new Date(),
      },
    });

    revalidatePostulacionPaths(parsed.data.documentId);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "No se pudo descartar la postulación" };
  }
}
