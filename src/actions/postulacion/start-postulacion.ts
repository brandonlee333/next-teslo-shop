"use server";

import bcryptjs from "bcryptjs";
import { cookies } from "next/headers";
import { z } from "zod";

import prisma from "@/lib/prisma";

export async function startPostulacion(
  prevState: string | undefined,
  formData: FormData,
) {
  const documentId = formData.get("documentId");
  const password = formData.get("password");

  const documentParsed = z
    .object({
      documentId: z
        .string()
        .trim()
        .min(1, "Documento inválido")
        .max(20, "Documento inválido")
        .regex(/^\d+$/, "Documento inválido"),
    })
    .safeParse({ documentId });

  if (!documentParsed.success) {
    return "InvalidDocument";
  }

  const passwordParsed = z
    .object({
      password: z.string().min(6, "Contraseña inválida"),
    })
    .safeParse({ password });

  if (!passwordParsed.success) {
    return "InvalidPassword";
  }

  const user = await prisma.user.findUnique({
    where: { documentId: documentParsed.data.documentId },
  });

  if (
    !user ||
    !bcryptjs.compareSync(passwordParsed.data.password, user.password)
  ) {
    return "InvalidCredentials";
  }

  cookies().set("postulacion_document", documentParsed.data.documentId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  return "Success";
}
