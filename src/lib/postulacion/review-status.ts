export const POSTULACION_REVIEW_STATUSES = [
  "IN_PROGRESS",
  "APPROVED",
  "DISCARDED",
] as const;

export type PostulacionReviewStatus =
  (typeof POSTULACION_REVIEW_STATUSES)[number];

export const POSTULACION_REVIEW_STATUS_LABELS: Record<
  PostulacionReviewStatus,
  string
> = {
  IN_PROGRESS: "En proceso",
  APPROVED: "Aprobada",
  DISCARDED: "Descartada",
};
