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

/** Texto visible para el postulante en su formulario */
export const POSTULACION_REVIEW_STATUS_APPLICANT_LABELS: Record<
  PostulacionReviewStatus,
  string
> = {
  IN_PROGRESS: "En proceso",
  APPROVED: "Aprobado",
  DISCARDED: "Descartado",
};

export function getApplicantReviewStatusClassName(
  status: PostulacionReviewStatus,
): string {
  switch (status) {
    case "APPROVED":
      return "border-green-200 bg-green-50 text-green-800";
    case "DISCARDED":
      return "border-red-200 bg-red-50 text-red-800";
    default:
      return "border-blue-200 bg-blue-50 text-blue-800";
  }
}

export function getReviewStatusBadgeClassName(
  status: PostulacionReviewStatus,
): string {
  switch (status) {
    case "APPROVED":
      return "bg-green-100 text-green-800";
    case "DISCARDED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-blue-100 text-blue-800";
  }
}
