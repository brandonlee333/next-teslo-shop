"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import {
  IoAttachOutline,
  IoCloseCircleOutline,
  IoCloudUploadOutline,
  IoDownloadOutline,
  IoOpenOutline,
  IoSendOutline,
} from "react-icons/io5";

import { uploadFileToCloudinary } from "@/actions";
import { createPostulacionComment } from "@/actions/postulacion/create-postulacion-comment";
import type { PostulacionAdminComment } from "@/lib/postulacion/get-postulacion-admin-detail";
import { formatPostulacionDateTime } from "@/lib/postulacion/format-datetime";

interface PendingAttachment {
  url: string;
  originalName: string;
  format: string;
  size: number;
}

interface Props {
  documentId: string;
  comments: PostulacionAdminComment[];
}

const FILE_ACCEPT =
  "image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

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

export const PostulacionCommentsSection = ({
  documentId,
  comments,
}: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [text, setText] = useState("");
  const [pendingAttachments, setPendingAttachments] = useState<
    PendingAttachment[]
  >([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadFileToCloudinary(formData);

    if (result.ok && result.url) {
      setPendingAttachments((prev) => [
        ...prev,
        {
          url: result.url!,
          originalName: result.originalName ?? file.name,
          format: result.format ?? "file",
          size: result.size ?? file.size,
        },
      ]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } else {
      setError(result.message ?? "Error al subir el archivo");
    }

    setIsUploading(false);
  };

  const handleFiles = async (files: FileList | File[] | null | undefined) => {
    if (!files?.length || isUploading || isPending) return;
    for (const file of Array.from(files)) {
      await uploadFile(file);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items?.length) return;

    const imageFiles: File[] = [];
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) imageFiles.push(file);
      }
    }

    if (imageFiles.length > 0) {
      e.preventDefault();
      void handleFiles(imageFiles);
    }
  };

  const removePending = (url: string) => {
    setPendingAttachments((prev) => prev.filter((f) => f.url !== url));
  };

  const handleSubmit = () => {
    if (isPending || isUploading) return;

    startTransition(async () => {
      setError(null);
      const result = await createPostulacionComment(
        documentId,
        text.trim(),
        pendingAttachments,
      );

      if (result.ok) {
        setText("");
        setPendingAttachments([]);
        router.refresh();
      } else {
        setError(result.message ?? "No se pudo publicar el comentario");
      }
    });
  };

  const canSubmit =
    !isPending &&
    !isUploading &&
    (text.trim().length > 0 || pendingAttachments.length > 0);

  return (
    <section className="mt-10 space-y-6 rounded-xl border border-violet-100 bg-violet-50/40 px-5 py-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Comentarios</h2>
        <p className="mt-1 text-sm text-gray-500">
          Notas internas del equipo. Puedes escribir texto, pegar imágenes desde
          el portapapeles o adjuntar cualquier documento.
        </p>
      </div>

      {comments.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="rounded-lg border border-gray-200 bg-white p-4"
            >
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-sm font-semibold text-gray-900">
                  {comment.authorName}
                </p>
                <time
                  dateTime={new Date(comment.createdAt).toISOString()}
                  className="text-xs text-gray-500"
                >
                  {formatPostulacionDateTime(comment.createdAt)}
                </time>
              </div>

              {comment.text.trim() ? (
                <p className="whitespace-pre-wrap text-sm text-gray-800">
                  {comment.text}
                </p>
              ) : null}

              {comment.attachments.length > 0 && (
                <ul
                  className={
                    comment.text.trim() ? "mt-4 space-y-3" : "space-y-3"
                  }
                >
                  {comment.attachments.map((file) => (
                    <li
                      key={file.url}
                      className="rounded-md border border-gray-100 bg-gray-50 p-3"
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
                            className="inline-flex items-center gap-1 rounded-md border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-white"
                          >
                            <IoOpenOutline className="h-3.5 w-3.5" />
                            Ver
                          </a>
                          <a
                            href={file.url}
                            download={file.originalName}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-md bg-rose-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-rose-700"
                          >
                            <IoDownloadOutline className="h-3.5 w-3.5" />
                            Descargar
                          </a>
                        </div>
                      </div>
                      {isPreviewableImage(file.format) && (
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 block"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={file.url}
                            alt={file.originalName}
                            className="max-h-48 w-auto max-w-full rounded border border-gray-100 object-contain"
                          />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">Aún no hay comentarios.</p>
      )}

      <div className="rounded-lg border border-violet-200 bg-white p-4">
        <label htmlFor="postulacion-comment" className="sr-only">
          Nuevo comentario
        </label>
        <textarea
          id="postulacion-comment"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onPaste={handlePaste}
          disabled={isPending}
          placeholder="Escribe un comentario… También puedes pegar imágenes (Ctrl+V) en este campo."
          className="w-full resize-y rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200 disabled:opacity-60"
        />

        {pendingAttachments.length > 0 && (
          <ul className="mt-3 space-y-2">
            {pendingAttachments.map((file) => (
              <li
                key={file.url}
                className="flex items-center gap-2 rounded-md border border-gray-100 bg-gray-50 px-3 py-2"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-gray-800">
                    {file.originalName}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {file.format.toUpperCase()} · {formatSize(file.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removePending(file.url)}
                  disabled={isPending || isUploading}
                  className="shrink-0 text-gray-400 hover:text-red-600 disabled:opacity-50"
                  aria-label={`Quitar ${file.originalName}`}
                >
                  <IoCloseCircleOutline className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {error && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-red-600">
            <IoCloseCircleOutline className="h-4 w-4 shrink-0" />
            {error}
          </p>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isPending || isUploading}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-violet-200 hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <IoAttachOutline className="h-4 w-4" />
            Adjuntar archivo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            multiple
            accept={FILE_ACCEPT}
            onChange={(e) => {
              void handleFiles(e.target.files);
            }}
          />

          <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
            <IoCloudUploadOutline className="h-4 w-4" />
            {isUploading
              ? "Subiendo archivo…"
              : "Imágenes, PDF, Word, Excel y más"}
          </span>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="ml-auto inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <IoSendOutline className="h-4 w-4" />
            {isPending ? "Publicando…" : "Publicar comentario"}
          </button>
        </div>
      </div>
    </section>
  );
};
