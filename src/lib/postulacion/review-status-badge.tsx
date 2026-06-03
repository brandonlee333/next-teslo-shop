import {
  getReviewStatusBadgeClassName,
  POSTULACION_REVIEW_STATUS_LABELS,
  type PostulacionReviewStatus,
} from "@/lib/postulacion/review-status";

export function PostulacionReviewStatusBadge({
  reviewStatus,
}: {
  reviewStatus: PostulacionReviewStatus;
}) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${getReviewStatusBadgeClassName(reviewStatus)}`}
    >
      {POSTULACION_REVIEW_STATUS_LABELS[reviewStatus]}
    </span>
  );
}
