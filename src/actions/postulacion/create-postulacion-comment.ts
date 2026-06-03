"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const documentIdSchema = z.string().trim().regex(/^\d+$/);

const attachmentSchema = z.object({
  url: z.string().url(),
  originalName: z.string().min(1),
  format: z.string().min(1),
  size: z.number().int().nonnegative(),
});

const createCommentSchema = z
  .object({
    documentId: documentIdSchema,
    text: z.string().trim(),
    attachments: z.array(attachmentSchema).max(20),
  })
  .superRefine((data, ctx) => {
    if (!data.text && data.attachments.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Escribe un comentario o adjunta al menos un archivo",
        path: ["text"],
      });
    }
  });

function revalidatePostulacionPaths(documentId: string) {
  revalidatePath("/admin/apartamento/postulaciones");
  revalidatePath(`/admin/apartamento/postulaciones/${documentId}`);
}

export async function createPostulacionComment(
  documentId: string,
  text: string,
  attachments: z.infer<typeof attachmentSchema>[],
): Promise<{ ok: boolean; message?: string }> {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return { ok: false, message: "Debe de ser un usuario administrador" };
  }

  const parsed = createCommentSchema.safeParse({
    documentId,
    text,
    attachments,
  });

  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message;
    return { ok: false, message: first ?? "Datos inválidos" };
  }

  const authorId = session.user.id as string;
  const authorName =
    (typeof session.user.name === "string" && session.user.name.trim()) ||
    session.user.email ||
    "Administrador";

  try {
    const user = await prisma.user.findUnique({
      where: { documentId: parsed.data.documentId },
      select: { postulacionApplication: { select: { id: true } } },
    });

    if (!user?.postulacionApplication) {
      return { ok: false, message: "Postulación no encontrada" };
    }

    await prisma.postulacionComment.create({
      data: {
        text: parsed.data.text,
        authorId,
        authorName,
        applicationId: user.postulacionApplication.id,
        attachments: {
          create: parsed.data.attachments.map((file) => ({
            url: file.url,
            originalName: file.originalName,
            format: file.format,
            size: file.size,
          })),
        },
      },
    });

    revalidatePostulacionPaths(parsed.data.documentId);

    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "No se pudo guardar el comentario" };
  }
}
