import { getPostulacionQueuePosition } from "@/lib/postulacion/queue-position";
import {
  getPostulacionRejection,
  type PostulacionRejection,
} from "@/lib/postulacion/rejection";
import type { PostulacionReviewStatus } from "@/lib/postulacion/review-status";
import prisma from "@/lib/prisma";

export type PostulacionByDocumentResult = {
  initialData: {
    occupantCount: number | null;
    occupantAges: string;
    titularNames: string;
    titularEmails: string;
    currentResidence: string;
    previousRent: string;
    moveReason: string;
    pets: string;
    vehicleParking: string;
    documentsByCategory: Record<
      string,
      {
        url: string;
        originalName: string;
        format: string;
        size: number;
      }[]
    >;
  } | null;
  reviewStatus: PostulacionReviewStatus;
  rejection: PostulacionRejection | null;
  queuePosition: number | null;
};

export async function getPostulacionByDocument(
  documentId: string,
): Promise<PostulacionByDocumentResult | null> {
  const user = await prisma.user.findUnique({
    where: { documentId },
    include: {
      postulacionApplication: {
        include: { documents: true },
      },
    },
  });

  if (!user) {
    return null;
  }

  const reviewStatus: PostulacionReviewStatus =
    user.postulacionApplication?.reviewStatus ?? "IN_PROGRESS";

  const queueInfo = await getPostulacionQueuePosition(documentId);

  if (!user.postulacionApplication) {
    return {
      initialData: null,
      reviewStatus,
      rejection: null,
      queuePosition: queueInfo?.position ?? null,
    };
  }

  const { postulacionApplication: application } = user;
  const rejection = getPostulacionRejection(application);

  const documentsByCategory = application.documents.reduce<
    Record<
      string,
      {
        url: string;
        originalName: string;
        format: string;
        size: number;
      }[]
    >
  >((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push({
      url: doc.url,
      originalName: doc.originalName,
      format: doc.format,
      size: doc.size,
    });
    return acc;
  }, {});

  return {
    initialData: {
      occupantCount: application.occupantCount,
      occupantAges: application.occupantAges ?? "",
      titularNames: application.titularNames ?? "",
      titularEmails: application.titularEmails ?? "",
      currentResidence: application.currentResidence ?? "",
      previousRent: application.previousRent ?? "",
      moveReason: application.moveReason ?? "",
      pets: application.pets ?? "",
      vehicleParking: application.vehicleParking ?? "",
      documentsByCategory,
    },
    reviewStatus,
    rejection,
    queuePosition: queueInfo?.position ?? null,
  };
}
