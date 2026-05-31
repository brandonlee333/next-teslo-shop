"use client";

import { useRef, useState } from "react";
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoCloudUploadOutline,
} from "react-icons/io5";

import { uploadFileToCloudinary } from "@/actions";

interface UploadedFile {
  url: string;
  originalName: string;
  format: string;
  size: number;
}

interface DocumentUploadSectionProps {
  title: string;
}

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const DocumentUploadSection = ({ title }: DocumentUploadSectionProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    setSelectedFile(file);
    setError(null);
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

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

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
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } else {
      setError(result.message ?? "Error al subir el archivo");
    }

    setIsUploading(false);
  };

  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="mb-4 text-sm font-semibold leading-relaxed text-gray-900 sm:text-base">
        {title}
      </h2>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
          isDragging
            ? "border-rose-400 bg-rose-50"
            : "border-gray-300 hover:border-rose-300 hover:bg-gray-50"
        }`}
      >
        <IoCloudUploadOutline className="mx-auto mb-3 h-12 w-12 text-gray-400" />
        <p className="text-sm font-medium text-gray-600 sm:text-base">
          {selectedFile
            ? selectedFile.name
            : "Arrastra tu archivo aquí o haz clic para seleccionar"}
        </p>
        {selectedFile && (
          <p className="mt-1 text-sm text-gray-400">{formatSize(selectedFile.size)}</p>
        )}
        <p className="mt-2 text-xs text-gray-400">
          PDF, imagen u otro tipo de documento
        </p>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>

      <button
        type="button"
        onClick={handleUpload}
        disabled={!selectedFile || isUploading}
        className={`mt-4 w-full rounded-lg py-3 text-sm font-semibold text-white transition-all ${
          !selectedFile || isUploading
            ? "cursor-not-allowed bg-gray-300"
            : "bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600 shadow-md shadow-rose-500/30 hover:scale-[1.01] hover:shadow-lg active:scale-[0.99]"
        }`}
      >
        {isUploading ? "Subiendo..." : "Subir archivo"}
      </button>

      {error && (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          <IoCloseCircleOutline className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <ul className="mt-4 space-y-2">
          {uploadedFiles.map((file) => (
            <li
              key={file.url}
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
            >
              <IoCheckmarkCircleOutline className="h-5 w-5 shrink-0 text-green-500" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-800">
                  {file.originalName}
                </p>
                <p className="text-xs text-gray-400">
                  {file.format.toUpperCase()} · {formatSize(file.size)}
                </p>
              </div>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-sm font-medium text-rose-600 hover:text-rose-700"
              >
                Ver
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};
