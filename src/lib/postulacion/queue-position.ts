import { isEligibleForPostulacionQueue } from "@/lib/postulacion/completion-status";
import prisma from "@/lib/prisma";

export type PostulacionQueueInfo = {
  position: number;
  totalInQueue: number;
};

export async function getOrderedPostulacionDocumentIds(): Promise<string[]> {
  const applications = await prisma.postulacionApplication.findMany({
    where: { submittedAt: { not: null } },
    orderBy: { submittedAt: "asc" },
    include: {
      user: { select: { documentId: true } },
    },
  });

  const documentIds: string[] = [];

  for (const application of applications) {
    const documentId = application.user.documentId;
    if (!documentId) continue;

    if (!isEligibleForPostulacionQueue(application)) {
      continue;
    }

    documentIds.push(documentId);
  }

  return documentIds;
}

export async function getPostulacionQueuePosition(
  documentId: string,
): Promise<PostulacionQueueInfo | null> {
  const queue = await getOrderedPostulacionDocumentIds();
  const index = queue.indexOf(documentId);

  if (index === -1) {
    return null;
  }

  return {
    position: index + 1,
    totalInQueue: queue.length,
  };
}
