import { auth } from "@/auth.config";

import {
  getPostulacionCompletionStatus,
  getPostulacionDisplayStatus,
  hasAnyPostulacionProgress,
  type PostulacionDisplayStatus,
} from "@/lib/postulacion/completion-status";
import type { PostulacionReviewStatus } from "@/lib/postulacion/review-status";
import {
  getPostulacionRejection,
  type PostulacionRejection,
} from "@/lib/postulacion/rejection";
import { getPostulacionQueuePosition } from "@/lib/postulacion/queue-position";
import prisma from "@/lib/prisma";

export type PostulacionAdminCommentAttachment = {
  url: string;
  originalName: string;
  format: string;
  size: number;
};

export type PostulacionAdminComment = {
  id: string;
  text: string;
  authorName: string;
  createdAt: Date;
  attachments: PostulacionAdminCommentAttachment[];
};

export type PostulacionAdminDetail = {
  documentId: string;
  createdAt: Date;
  updatedAt: Date;
  status: "complete" | "partial";
  displayStatus: PostulacionDisplayStatus;
  reviewStatus: PostulacionReviewStatus;
  rejection: PostulacionRejection | null;
  submittedAt: Date | null;
  queuePosition: number | null;
  comments: PostulacionAdminComment[];
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
        include: {
          documents: true,
          comments: {
            include: { attachments: true },
            orderBy: { createdAt: "asc" },
          },
        },
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
  const displayStatus = getPostulacionDisplayStatus(application, documentCount);
  if (!status || !displayStatus) {
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

  const comments: PostulacionAdminComment[] = application.comments.map(
    (comment) => ({
      id: comment.id,
      text: comment.text,
      authorName: comment.authorName,
      createdAt: comment.createdAt,
      attachments: comment.attachments.map((file) => ({
        url: file.url,
        originalName: file.originalName,
        format: file.format,
        size: file.size,
      })),
    }),
  );

  const queueInfo = await getPostulacionQueuePosition(user.documentId);

  return {
    documentId: user.documentId,
    createdAt: application.createdAt,
    updatedAt: application.updatedAt,
    status,
    displayStatus,
    reviewStatus: application.reviewStatus,
    rejection: getPostulacionRejection(application),
    submittedAt: application.submittedAt,
    queuePosition: queueInfo?.position ?? null,
    comments,
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
