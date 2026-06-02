"use server";

import bcryptjs from "bcryptjs";
import { z } from "zod";

import prisma from "@/lib/prisma";

const documentIdSchema = z
  .string()
  .trim()
  .min(1, "Documento inválido")
  .max(20, "Documento inválido")
  .regex(/^\d+$/, "Documento inválido");

const passwordSchema = z.string().min(6, "Contraseña inválida");

export async function registerPostulacion(
  prevState: string | undefined,
  formData: FormData,
) {
  const documentParsed = documentIdSchema.safeParse(formData.get("documentId"));

  if (!documentParsed.success) {
    return "InvalidDocument";
  }

  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  const passwordParsed = passwordSchema.safeParse(password);

  if (!passwordParsed.success) {
    return "InvalidPassword";
  }

  if (password !== confirmPassword) {
    return "PasswordMismatch";
  }

  const documentId = documentParsed.data;

  const existing = await prisma.user.findUnique({
    where: { documentId },
  });

  if (existing) {
    return "DocumentExists";
  }

  try {
    await prisma.user.create({
      data: {
        documentId,
        name: documentId,
        email: `postulacion+${documentId}@tenant.local`,
        password: bcryptjs.hashSync(passwordParsed.data),
      },
    });

    return "Success";
  } catch (error) {
    console.log(error);
    return "Error";
  }
}
