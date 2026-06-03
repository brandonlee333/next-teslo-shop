import { auth } from "@/auth.config";

import {
  getPostulacionCompletionStatus,
  hasAnyPostulacionProgress,
} from "@/lib/postulacion/completion-status";
import type { PostulacionReviewStatus } from "@/lib/postulacion/review-status";
import prisma from "@/lib/prisma";

export type PostulacionAdminDetail = {
  documentId: string;
  createdAt: Date;
  updatedAt: Date;
  status: "complete" | "partial";
  reviewStatus: PostulacionReviewStatus;
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
};

export async function getPostulacionAdminDetail(
  documentId: string,
): Promise<PostulacionAdminDetail | null> {
  const session = await auth();
  if (session?.user.role !== "admin") {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { documentId },
    include: {
      postulacionApplication: {
        include: { documents: true },
      },
    },
  });

  const application = user?.postulacionApplication;
  if (!user?.documentId || !application) {
    return null;
  }

  const documentCount = application.documents.length;

  if (!hasAnyPostulacionProgress(application, documentCount)) {
    return null;
  }

  const status = getPostulacionCompletionStatus(application, documentCount);
  if (!status) {
    return null;
  }

  const documentsByCategory = application.documents.reduce<
    PostulacionAdminDetail["documentsByCategory"]
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
    documentId: user.documentId,
    createdAt: application.createdAt,
    updatedAt: application.updatedAt,
    status,
    reviewStatus: application.reviewStatus,
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
  };
}
