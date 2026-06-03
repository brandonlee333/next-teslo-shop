"use server";

import { auth } from "@/auth.config";
import {
  countFilledPostulacionFields,
  getPostulacionCompletionStatus,
  getPostulacionDisplayStatus,
  hasAnyPostulacionProgress,
  type PostulacionDisplayStatus,
} from "@/lib/postulacion/completion-status";
import { POSTULACION_REQUIRED_FIELDS } from "@/lib/postulacion/validate-postulacion-fields";
import prisma from "@/lib/prisma";

export type AdminPostulacionRow = {
  id: string;
  documentId: string;
  titularNames: string | null;
  titularEmails: string | null;
  createdAt: Date;
  updatedAt: Date;
  status: "complete" | "partial";
  displayStatus: PostulacionDisplayStatus;
  filledFields: number;
  totalFields: number;
  documentCount: number;
};

export async function getPostulacionesAdmin(): Promise<{
  ok: boolean;
  message?: string;
  postulaciones?: AdminPostulacionRow[];
}> {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe de ser un usuario administrador",
    };
  }

  const applications = await prisma.postulacionApplication.findMany({
    include: {
      user: {
        select: { documentId: true },
      },
      _count: {
        select: { documents: true },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  const postulaciones: AdminPostulacionRow[] = [];

  for (const application of applications) {
    const documentId = application.user.documentId;
    if (!documentId) continue;

    const documentCount = application._count.documents;

    if (!hasAnyPostulacionProgress(application, documentCount)) {
      continue;
    }

    const status = getPostulacionCompletionStatus(application, documentCount);
    const displayStatus = getPostulacionDisplayStatus(application, documentCount);
    if (!status || !displayStatus) continue;

    postulaciones.push({
      id: application.id,
      documentId,
      titularNames: application.titularNames,
      titularEmails: application.titularEmails,
      createdAt: application.createdAt,
      updatedAt: application.updatedAt,
      status,
      displayStatus,
      filledFields: countFilledPostulacionFields(application),
      totalFields: POSTULACION_REQUIRED_FIELDS.length,
      documentCount,
    });
  }

  return { ok: true, postulaciones };
}
