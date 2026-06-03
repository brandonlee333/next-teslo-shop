"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import {
  IoAttachOutline,
  IoCloseCircleOutline,
  IoCloudUploadOutline,
} from "react-icons/io5";

import { uploadFileToCloudinary } from "@/actions";
import { discardPostulacion } from "@/actions/postulacion/discard-postulacion";
import { updatePostulacionReviewStatus } from "@/actions/postulacion/update-postulacion-review-status";
import { PostulacionRejectionNotice } from "@/components/postulacion/PostulacionRejectionNotice";
import type { PostulacionRejection } from "@/lib/postulacion/rejection";
import {
  POSTULACION_REVIEW_STATUS_LABELS,
  type PostulacionReviewStatus,
} from "@/lib/postulacion/review-status";

interface Props {
  documentId: string;
  reviewStatus: PostulacionReviewStatus;
  rejection: PostulacionRejection | null;
}

type PendingImage = {
  url: string;
  originalName: string;
  format: string;
  size: number;
};

const FILE_ACCEPT = "image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,application/pdf";

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
  rejection,
}: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showDiscardForm, setShowDiscardForm] = useState(false);
  const [reason, setReason] = useState("");
  const [pendingImage, setPendingImage] = useState<PendingImage | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetDiscardForm = () => {
    setShowDiscardForm(false);
    setReason("");
    setPendingImage(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleStatusClick = (status: PostulacionReviewStatus) => {
    if (isPending || isUploading) return;

    if (status === "DISCARDED") {
      if (reviewStatus === "DISCARDED") return;
      setShowDiscardForm(true);
      setError(null);
      return;
    }

    resetDiscardForm();

    if (status === reviewStatus) return;

    startTransition(async () => {
      const result = await updatePostulacionReviewStatus(documentId, status);
      if (result.ok) {
        router.refresh();
      } else {
        setError(result.message ?? "No se pudo actualizar el estado");
      }
    });
  };

  const uploadImage = async (file: File) => {
    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadFileToCloudinary(formData);

    if (result.ok && result.url) {
      setPendingImage({
        url: result.url,
        originalName: result.originalName ?? file.name,
        format: result.format ?? "file",
        size: result.size ?? file.size,
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
    } else {
      setError(result.message ?? "Error al subir la imagen");
    }

    setIsUploading(false);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items?.length) return;

    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          e.preventDefault();
          void uploadImage(file);
          return;
        }
      }
    }
  };

  const handleConfirmDiscard = () => {
    if (isPending || isUploading || !reason.trim()) return;

    startTransition(async () => {
      setError(null);
      const result = await discardPostulacion(
        documentId,
        reason.trim(),
        pendingImage,
      );

      if (result.ok) {
        resetDiscardForm();
        router.refresh();
      } else {
        setError(result.message ?? "No se pudo descartar la postulación");
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
              disabled={isPending || isUploading}
              onClick={() => handleStatusClick(status)}
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

      {showDiscardForm && reviewStatus !== "DISCARDED" && (
        <div className="mt-5 rounded-lg border border-red-200 bg-white p-4">
          <h3 className="text-sm font-semibold text-red-900">
            Motivo del rechazo
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            Este mensaje y la imagen (si la adjuntas) serán visibles para el
            postulante.
          </p>

          <textarea
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            onPaste={handlePaste}
            disabled={isPending}
            placeholder="Explica por qué se descarta esta postulación…"
            className="mt-3 w-full resize-y rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-100 disabled:opacity-60"
          />

          {pendingImage && (
            <div className="mt-3 flex items-center gap-2 rounded-md border border-gray-100 bg-gray-50 px-3 py-2">
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-gray-800">
                  {pendingImage.originalName}
                </p>
                <p className="text-[11px] text-gray-400">
                  {pendingImage.format.toUpperCase()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPendingImage(null)}
                disabled={isPending || isUploading}
                className="shrink-0 text-gray-400 hover:text-red-600"
                aria-label="Quitar imagen"
              >
                <IoCloseCircleOutline className="h-5 w-5" />
              </button>
            </div>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isPending || isUploading}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:border-red-200 hover:bg-red-50 disabled:opacity-60"
            >
              <IoAttachOutline className="h-4 w-4" />
              Adjuntar imagen (opcional)
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept={FILE_ACCEPT}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void uploadImage(file);
              }}
            />
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
              <IoCloudUploadOutline className="h-4 w-4" />
              También puedes pegar una imagen (Ctrl+V)
            </span>
          </div>

          {error && (
            <p className="mt-3 flex items-center gap-1.5 text-xs text-red-600">
              <IoCloseCircleOutline className="h-4 w-4 shrink-0" />
              {error}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleConfirmDiscard}
              disabled={isPending || isUploading || !reason.trim()}
              className="rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Descartando…" : "Confirmar descarte"}
            </button>
            <button
              type="button"
              onClick={resetDiscardForm}
              disabled={isPending}
              className="rounded-lg border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {rejection && reviewStatus === "DISCARDED" && (
        <PostulacionRejectionNotice rejection={rejection} variant="admin" />
      )}

      {error && !showDiscardForm && (
        <p className="mt-3 text-xs text-red-600">{error}</p>
      )}
    </section>
  );
};
