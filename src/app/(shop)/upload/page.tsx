'use client';

import { useRef, useState } from 'react';
import { IoCloudUploadOutline, IoDocumentOutline, IoCheckmarkCircleOutline, IoCloseCircleOutline } from 'react-icons/io5';
import { uploadFileToCloudinary } from '@/actions';
import { titleFont } from '@/config/fonts';

interface UploadedFile {
  url: string;
  originalName: string;
  format: string;
  size: number;
}

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

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
      if (fileInputRef.current) fileInputRef.current.value = '';
    } else {
      setError(result.message ?? 'Error desconocido');
    }

    setIsUploading(false);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className={`${titleFont.className} text-3xl mb-2 font-bold`}>
        Subir Archivos
      </h1>
      <p className="text-gray-500 mb-8">
        Selecciona o arrastra un archivo para subirlo a la nube.
      </p>

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200
          ${isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }
        `}
      >
        <IoCloudUploadOutline className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <p className="text-lg text-gray-600 font-medium">
          {selectedFile
            ? selectedFile.name
            : 'Arrastra tu archivo aquí o haz clic para seleccionar'}
        </p>
        {selectedFile && (
          <p className="text-sm text-gray-400 mt-1">
            {formatSize(selectedFile.size)}
          </p>
        )}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!selectedFile || isUploading}
        className={`
          mt-6 w-full py-3 rounded-lg font-semibold text-white transition-all
          ${!selectedFile || isUploading
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-700 hover:bg-blue-800 active:bg-blue-900'
          }
        `}
      >
        {isUploading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Subiendo...
          </span>
        ) : (
          'Subir Archivo'
        )}
      </button>

      {/* Error */}
      {error && (
        <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
          <IoCloseCircleOutline className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Archivos subidos</h2>
          <div className="space-y-3">
            {uploadedFiles.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <IoCheckmarkCircleOutline className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.originalName}</p>
                  <p className="text-sm text-gray-400">
                    {file.format.toUpperCase()} · {formatSize(file.size)}
                  </p>
                </div>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex-shrink-0"
                >
                  Ver archivo
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
