"use server";

import { cookies } from "next/headers";
import { z } from "zod";

export async function startPostulacion(
  prevState: string | undefined,
  formData: FormData,
) {
  const parsed = z
    .object({
      documentId: z
        .string()
        .trim()
        .min(1, "Documento inválido")
        .max(20, "Documento inválido")
        .regex(/^\d+$/, "Documento inválido"),
    })
    .safeParse({
      documentId: formData.get("documentId"),
    });

  if (!parsed.success) {
    return "InvalidDocument";
  }

  cookies().set("postulacion_document", parsed.data.documentId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  return "Success";
}
