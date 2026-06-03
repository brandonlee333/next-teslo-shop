"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { updatePostulacionReviewStatus } from "@/actions/postulacion/update-postulacion-review-status";
import {
  POSTULACION_REVIEW_STATUS_LABELS,
  type PostulacionReviewStatus,
} from "@/lib/postulacion/review-status";

interface Props {
  documentId: string;
  reviewStatus: PostulacionReviewStatus;
}

const ACTIONS: {
  status: PostulacionReviewStatus;
  label: string;
  activeClass: string;
  idleClass: string;
}[] = [
  {
    status: "IN_PROGRESS",
    label: "En proceso",
    activeClass: "bg-blue-600 text-white ring-2 ring-blue-300",
    idleClass:
      "border border-blue-200 bg-white text-blue-700 hover:bg-blue-50",
  },
  {
    status: "APPROVED",
    label: "Aprobar",
    activeClass: "bg-green-600 text-white ring-2 ring-green-300",
    idleClass:
      "border border-green-200 bg-white text-green-700 hover:bg-green-50",
  },
  {
    status: "DISCARDED",
    label: "Descartar",
    activeClass: "bg-red-600 text-white ring-2 ring-red-300",
    idleClass: "border border-red-200 bg-white text-red-700 hover:bg-red-50",
  },
];

export const PostulacionReviewActions = ({
  documentId,
  reviewStatus,
}: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = (status: PostulacionReviewStatus) => {
    if (status === reviewStatus || isPending) return;

    startTransition(async () => {
      const result = await updatePostulacionReviewStatus(documentId, status);
      if (result.ok) {
        router.refresh();
      }
    });
  };

  return (
    <section className="mt-10 rounded-xl border border-gray-200 bg-gray-50 px-5 py-6">
      <h2 className="mb-1 text-lg font-semibold text-gray-900">
        Decisión del administrador
      </h2>
      <p className="mb-5 text-sm text-gray-500">
        Estado actual:{" "}
        <span className="font-medium text-gray-800">
          {POSTULACION_REVIEW_STATUS_LABELS[reviewStatus]}
        </span>
      </p>

      <div className="flex flex-wrap gap-3">
        {ACTIONS.map(({ status, label, activeClass, idleClass }) => {
          const isActive = reviewStatus === status;
          return (
            <button
              key={status}
              type="button"
              disabled={isPending}
              onClick={() => handleClick(status)}
              className={clsx(
                "min-w-[8.5rem] rounded-lg px-5 py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60",
                isActive ? activeClass : idleClass,
              )}
            >
              {label}
            </button>
          );
        })}
      </div>
    </section>
  );
};
