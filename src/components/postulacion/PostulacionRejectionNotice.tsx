import {
  IoDownloadOutline,
  IoOpenOutline,
} from "react-icons/io5";

import { formatPostulacionDateTime } from "@/lib/postulacion/format-datetime";
import type { PostulacionRejection } from "@/lib/postulacion/rejection";

interface Props {
  rejection: PostulacionRejection;
  variant?: "admin" | "applicant";
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isPreviewableImage(format: string) {
  return ["jpg", "jpeg", "png", "gif", "webp", "bmp"].includes(
    format.toLowerCase(),
  );
}

export const PostulacionRejectionNotice = ({
  rejection,
  variant = "admin",
}: Props) => {
  const isApplicant = variant === "applicant";

  return (
    <div
      className={
        isApplicant
          ? "rounded-xl border border-red-200 bg-red-50 px-5 py-5"
          : "mt-5 rounded-lg border border-red-200 bg-red-50/80 px-4 py-4"
      }
    >
      <h3
        className={
          isApplicant
            ? "text-base font-semibold text-red-900"
            : "text-sm font-semibold text-red-900"
        }
      >
        {isApplicant
          ? "Tu postulación fue descartada"
          : "Motivo del rechazo"}
      </h3>
      <p className="mt-1 text-xs text-red-700">
        {formatPostulacionDateTime(rejection.rejectedAt, { dateStyle: "long" })}
      </p>
      <p
        className={`mt-3 whitespace-pre-wrap text-red-950 ${
          isApplicant ? "text-sm" : "text-sm"
        }`}
      >
        {rejection.reason}
      </p>

      {rejection.image && (
        <div className="mt-4 rounded-md border border-red-100 bg-white p-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">
                {rejection.image.originalName}
              </p>
              <p className="text-xs text-gray-500">
                {rejection.image.format.toUpperCase()} ·{" "}
                {formatSize(rejection.image.size)}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <a
                href={rejection.image.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
              >
                <IoOpenOutline className="h-3.5 w-3.5" />
                Ver
              </a>
              <a
                href={rejection.image.url}
                download={rejection.image.originalName}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md bg-red-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-red-700"
              >
                <IoDownloadOutline className="h-3.5 w-3.5" />
                Descargar
              </a>
            </div>
          </div>
          {isPreviewableImage(rejection.image.format) && (
            <a
              href={rejection.image.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={rejection.image.url}
                alt={rejection.image.originalName}
                className="max-h-56 w-auto max-w-full rounded border border-gray-100 object-contain"
              />
            </a>
          )}
        </div>
      )}
    </div>
  );
};
