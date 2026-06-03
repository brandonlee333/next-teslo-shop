"use server";

import { cookies } from "next/headers";
import { z } from "zod";

import prisma from "@/lib/prisma";
import {
  POSTULACION_DOCUMENT_KEYS,
  type PostulacionDocumentKey,
} from "@/lib/postulacion/document-keys";
import { getMissingPostulacionFieldIds } from "@/lib/postulacion/validate-postulacion-fields";
import { hasMinimumPostulacionDocuments } from "@/lib/postulacion/validate-postulacion-documents";
import { revalidatePath } from "next/cache";

const uploadedFileSchema = z.object({
  url: z.string().url(),
  originalName: z.string().min(1),
  format: z.string().min(1),
  size: z.number().int().nonnegative(),
});

const formSchema = z.object({
  documentId: z
    .string()
    .trim()
    .min(1)
    .max(20)
    .regex(/^\d+$/),
  saveMode: z.enum(["full", "personal"]).optional(),
  occupantCount: z
    .union([z.string(), z.null()])
    .optional()
    .superRefine((value, ctx) => {
      const raw = value?.toString().trim() ?? "";
      if (!raw) return;
      const count = Number(raw);
      if (!Number.isInteger(count) || count < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Número de ocupantes inválido",
        });
      }
    }),
  occupantAges: z.string().trim().optional(),
  titularNames: z.string().trim().optional(),
  titularEmails: z.string().trim().optional(),
  currentResidence: z.string().trim().optional(),
  previousRent: z.string().trim().optional(),
  moveReason: z.string().trim().optional(),
  pets: z.string().trim().optional(),
  vehicleParking: z.string().trim().optional(),
});

function parseDocuments(
  formData: FormData,
): Partial<Record<PostulacionDocumentKey, z.infer<typeof uploadedFileSchema>[]>> {
  const result: Partial<
    Record<PostulacionDocumentKey, z.infer<typeof uploadedFileSchema>[]>
  > = {};

  for (const key of POSTULACION_DOCUMENT_KEYS) {
    const raw = formData.get(`documents_${key}`);
    if (typeof raw !== "string" || !raw.trim()) {
      continue;
    }

    try {
      const parsed = z.array(uploadedFileSchema).safeParse(JSON.parse(raw));
      if (parsed.success && parsed.data.length > 0) {
        result[key] = parsed.data;
      }
    } catch {
      // ignore invalid JSON for this category
    }
  }

  return result;
}

export async function savePostulacion(
  prevState: string | undefined,
  formData: FormData,
) {
  const sessionDocumentId = cookies().get("postulacion_document")?.value;

  const parsed = formSchema.safeParse({
    documentId: formData.get("documentId"),
    saveMode: formData.get("saveMode") ?? undefined,
    occupantCount: formData.get("occupantCount") || undefined,
    occupantAges: formData.get("occupantAges") ?? "",
    titularNames: formData.get("titularNames") ?? "",
    titularEmails: formData.get("titularEmails") ?? "",
    currentResidence: formData.get("currentResidence") ?? "",
    previousRent: formData.get("previousRent") ?? "",
    moveReason: formData.get("moveReason") ?? "",
    pets: formData.get("pets") ?? "",
    vehicleParking: formData.get("vehicleParking") ?? "",
  });

  if (!parsed.success) {
    return "InvalidData";
  }

  const {
    documentId,
    occupantCount: occupantCountRaw,
    saveMode,
    ...fields
  } = parsed.data;

  const saveModeValue = saveMode ?? "full";

  if (saveModeValue === "full") {
    const missingFields = getMissingPostulacionFieldIds(formData);
    if (missingFields.length > 0) {
      return "IncompleteQuestions";
    }

    const acceptTerms = formData.get("acceptTerms");
    if (acceptTerms !== "on") {
      return "TermsNotAccepted";
    }

    if (!hasMinimumPostulacionDocuments(formData)) {
      return "MissingDocuments";
    }
  }

  const occupantCountRawString = occupantCountRaw?.toString().trim() ?? "";
  const occupantCountValue = occupantCountRawString
    ? Number(occupantCountRawString)
    : null;

  if (!sessionDocumentId || sessionDocumentId !== documentId) {
    return "Unauthorized";
  }

  const user = await prisma.user.findUnique({
    where: { documentId },
    select: { id: true },
  });

  if (!user) {
    return "Unauthorized";
  }

  const documents = parseDocuments(formData);

  const emptyToNull = (value: string | undefined) => {
    const trimmed = value?.trim();
    return trimmed ? trimmed : null;
  };

  try {
    const application = await prisma.postulacionApplication.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        occupantCount: occupantCountValue,
        occupantAges: emptyToNull(fields.occupantAges),
        titularNames: emptyToNull(fields.titularNames),
        titularEmails: emptyToNull(fields.titularEmails),
        currentResidence: emptyToNull(fields.currentResidence),
        previousRent: emptyToNull(fields.previousRent),
        moveReason: emptyToNull(fields.moveReason),
        pets: emptyToNull(fields.pets),
        vehicleParking: emptyToNull(fields.vehicleParking),
      },
      update: {
        occupantCount: occupantCountValue,
        occupantAges: emptyToNull(fields.occupantAges),
        titularNames: emptyToNull(fields.titularNames),
        titularEmails: emptyToNull(fields.titularEmails),
        currentResidence: emptyToNull(fields.currentResidence),
        previousRent: emptyToNull(fields.previousRent),
        moveReason: emptyToNull(fields.moveReason),
        pets: emptyToNull(fields.pets),
        vehicleParking: emptyToNull(fields.vehicleParking),
      },
    });

    if (saveModeValue === "full" && !application.submittedAt) {
      await prisma.postulacionApplication.update({
        where: { id: application.id },
        data: { submittedAt: new Date() },
      });
    }

    for (const key of POSTULACION_DOCUMENT_KEYS) {
      const files = documents[key];
      if (!files) {
        continue;
      }

      await prisma.postulacionDocument.deleteMany({
        where: { applicationId: application.id, category: key },
      });

      await prisma.postulacionDocument.createMany({
        data: files.map((file) => ({
          applicationId: application.id,
          category: key,
          url: file.url,
          originalName: file.originalName,
          format: file.format,
          size: file.size,
        })),
      });
    }

    revalidatePath("/apartamento/postularse/documentos");

    return "Success";
  } catch (error) {
    console.log(error);
    return "Error";
  }
}
