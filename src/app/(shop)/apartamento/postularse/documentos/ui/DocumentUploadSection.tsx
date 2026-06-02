"use client";

import { useEffect, useRef, useState } from "react";
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoCloudUploadOutline,
} from "react-icons/io5";

import { uploadFileToCloudinary } from "@/actions";
import type { PostulacionDocumentKey } from "@/lib/postulacion/document-keys";

export interface UploadedFile {
  url: string;
  originalName: string;
  format: string;
  size: number;
}

interface DocumentUploadSectionProps {
  label: string;
  documentKey: PostulacionDocumentKey;
  hideDropZone?: boolean;
  initialFiles?: UploadedFile[];
}

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const DocumentUploadSection = ({
  label,
  documentKey,
  hideDropZone = false,
  initialFiles = [],
}: DocumentUploadSectionProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] =
    useState<UploadedFile[]>(initialFiles);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUploadedFiles(initialFiles);
  }, [initialFiles]);

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadFileToCloudinary(formData);

    if (result.ok) {
      setUploadedFiles((prev) => [
        {
          url: result.url!,
          originalName: result.originalName!,
          format: result.format!,
          size: result.size!,
        },
        ...prev,
      ]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } else {
      setError(result.message ?? "Error al subir el archivo");
    }

    setIsUploading(false);
  };

  const handleFile = (file: File | undefined) => {
    if (!file || isUploading) return;
    uploadFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const openPicker = () => {
    if (!isUploading) fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <input
        type="hidden"
        name={`documents_${documentKey}`}
        value={JSON.stringify(uploadedFiles)}
        readOnly
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <button
          type="button"
          onClick={openPicker}
          disabled={isUploading}
          className={`shrink-0 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm font-medium text-gray-800 transition-colors hover:border-rose-200 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60 sm:text-center ${
            hideDropZone ? "w-full" : "sm:w-52"
          }`}
        >
          {isUploading ? "Subiendo..." : label}
          {hideDropZone && (
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          )}
        </button>

        {!hideDropZone && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={openPicker}
            className={`flex min-h-[52px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed px-4 py-3 text-center transition-colors ${
              isDragging
                ? "border-rose-400 bg-rose-50"
                : "border-gray-300 hover:border-rose-300 hover:bg-gray-50"
            }`}
          >
            <IoCloudUploadOutline className="h-5 w-5 shrink-0 text-gray-400" />
            <span className="text-xs text-gray-500 sm:text-sm">
              {isUploading
                ? "Subiendo..."
                : "Arrastra aquí o haz clic para subir"}
            </span>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </div>
        )}
      </div>

      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-600">
          <IoCloseCircleOutline className="h-4 w-4 shrink-0" />
          {error}
        </p>
      )}

      {uploadedFiles.length > 0 && (
        <ul
          className={
            hideDropZone ? "space-y-1.5" : "space-y-1.5 pl-0 sm:pl-[13.25rem]"
          }
        >
          {uploadedFiles.map((file) => (
            <li
              key={file.url}
              className="flex items-center gap-2 rounded-md border border-gray-100 bg-gray-50 px-3 py-2"
            >
              <IoCheckmarkCircleOutline className="h-4 w-4 shrink-0 text-green-500" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-gray-800">
                  {file.originalName}
                </p>
                <p className="text-[11px] text-gray-400">
                  {file.format.toUpperCase()} · {formatSize(file.size)}
                </p>
              </div>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-xs font-medium text-rose-600 hover:text-rose-700"
              >
                Ver
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
