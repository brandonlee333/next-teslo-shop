import Link from "next/link";
import {
  IoArrowBackOutline,
  IoDownloadOutline,
  IoOpenOutline,
} from "react-icons/io5";

import type { PostulacionAdminDetail } from "@/lib/postulacion/get-postulacion-admin-detail";
import {
  getDocumentLabel,
  orderedDocumentKeysWithFiles,
} from "@/lib/postulacion/document-labels";
import { POSTULACION_REVIEW_STATUS_LABELS } from "@/lib/postulacion/review-status";
import { formatPostulacionDateTime } from "@/lib/postulacion/format-datetime";
import { PostulacionDisplayStatusBadge } from "@/lib/postulacion/display-status-labels";
import { POSTULACION_REQUIRED_FIELDS } from "@/lib/postulacion/validate-postulacion-fields";

import { PostulacionCommentsSection } from "./PostulacionCommentsSection";
import { PostulacionReviewActions } from "./PostulacionReviewActions";

interface Props {
  detail: PostulacionAdminDetail;
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

function getFieldValue(
  detail: PostulacionAdminDetail,
  name: (typeof POSTULACION_REQUIRED_FIELDS)[number]["name"],
): string {
  if (name === "occupantCount") {
    return detail.occupantCount != null ? String(detail.occupantCount) : "";
  }
  return detail[name] ?? "";
}

export const PostulacionAdminDetailView = ({ detail }: Props) => {
  const documentKeys = orderedDocumentKeysWithFiles(detail.documentsByCategory);

  return (
    <div className="mx-auto max-w-3xl pb-12">
      <Link
        href="/admin/apartamento/postulaciones"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-rose-600 transition-colors hover:text-rose-700"
      >
        <IoArrowBackOutline className="h-4 w-4" />
        Volver a postulaciones
      </Link>

      <header className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Postulación — cédula {detail.documentId}
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Ingreso:{" "}
              {formatPostulacionDateTime(detail.createdAt, { dateStyle: "long" })}
              <span className="mx-2">·</span>
              Última actualización:{" "}
              {formatPostulacionDateTime(detail.updatedAt, { dateStyle: "long" })}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <PostulacionDisplayStatusBadge
              displayStatus={detail.displayStatus}
              size="md"
            />
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
              {POSTULACION_REVIEW_STATUS_LABELS[detail.reviewStatus]}
            </span>
          </div>
        </div>
      </header>

      <section className="mb-10 space-y-4 rounded-xl border border-blue-100 bg-blue-50/50 px-5 py-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Respuestas del formulario
        </h2>
        <dl className="space-y-4">
          {POSTULACION_REQUIRED_FIELDS.map((field) => {
            const value = getFieldValue(detail, field.name).trim();
            return (
              <div key={field.id}>
                <dt className="text-sm font-medium text-gray-700">
                  {field.label}
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {value || (
                    <span className="italic text-gray-400">Sin responder</span>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </section>

      <section className="space-y-6 rounded-xl border border-amber-100 bg-amber-50/40 px-5 py-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Documentos subidos
        </h2>

        {documentKeys.length === 0 ? (
          <p className="text-sm text-gray-500">
            Este postulante aún no ha subido documentos.
          </p>
        ) : (
          <ul className="space-y-8">
            {documentKeys.map((key) => {
              const files = detail.documentsByCategory[key] ?? [];
              return (
                <li key={key}>
                  <h3 className="mb-3 text-sm font-semibold text-amber-900">
                    {getDocumentLabel(key)}
                  </h3>
                  <ul className="space-y-4">
                    {files.map((file, index) => (
                      <li
                        key={`${file.url}-${index}`}
                        className="rounded-lg border border-gray-200 bg-white p-4"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900">
                              {file.originalName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {file.format.toUpperCase()} ·{" "}
                              {formatSize(file.size)}
                            </p>
                          </div>
                          <div className="flex shrink-0 gap-2">
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                            >
                              <IoOpenOutline className="h-4 w-4" />
                              Ver
                            </a>
                            <a
                              href={file.url}
                              download={file.originalName}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-md bg-rose-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-rose-700"
                            >
                              <IoDownloadOutline className="h-4 w-4" />
                              Descargar
                            </a>
                          </div>
                        </div>
                        {isPreviewableImage(file.format) && (
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 block"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={file.url}
                              alt={file.originalName}
                              className="max-h-64 w-auto max-w-full rounded-md border border-gray-100 object-contain"
                            />
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <PostulacionReviewActions
        documentId={detail.documentId}
        reviewStatus={detail.reviewStatus}
      />

      <PostulacionCommentsSection
        documentId={detail.documentId}
        comments={detail.comments}
      />
    </div>
  );
};
