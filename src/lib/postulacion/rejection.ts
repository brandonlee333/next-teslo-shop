export type PostulacionRejectionImage = {
  url: string;
  originalName: string;
  format: string;
  size: number;
};

export type PostulacionRejection = {
  reason: string;
  image: PostulacionRejectionImage | null;
  rejectedAt: Date;
};

type RejectionRecord = {
  rejectionReason: string | null;
  rejectionImageUrl: string | null;
  rejectionImageName: string | null;
  rejectionImageFormat: string | null;
  rejectionImageSize: number | null;
  rejectedAt: Date | null;
};

export function getPostulacionRejection(
  application: RejectionRecord,
): PostulacionRejection | null {
  if (!application.rejectionReason?.trim() || !application.rejectedAt) {
    return null;
  }

  const image =
    application.rejectionImageUrl &&
    application.rejectionImageName &&
    application.rejectionImageFormat &&
    application.rejectionImageSize != null
      ? {
          url: application.rejectionImageUrl,
          originalName: application.rejectionImageName,
          format: application.rejectionImageFormat,
          size: application.rejectionImageSize,
        }
      : null;

  return {
    reason: application.rejectionReason.trim(),
    image,
    rejectedAt: application.rejectedAt,
  };
}

export const POSTULACION_REJECTION_CLEAR_DATA = {
  rejectionReason: null,
  rejectionImageUrl: null,
  rejectionImageName: null,
  rejectionImageFormat: null,
  rejectionImageSize: null,
  rejectedAt: null,
} as const;
