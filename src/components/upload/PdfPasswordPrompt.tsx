"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface PdfPasswordPromptProps {
  fileName: string;
  passwordError: string | null;
  isSubmitting: boolean;
  onSubmit: (password: string) => void;
  onCancel: () => void;
}

export const PdfPasswordPrompt = ({
  fileName,
  passwordError,
  isSubmitting,
  onSubmit,
  onCancel,
}: PdfPasswordPromptProps) => {
  const titleId = useId();
  const [password, setPassword] = useState("");
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [passwordError]);

  const submitPassword = () => {
    const trimmed = password.trim();
    if (!trimmed || isSubmitting) return;
    onSubmit(trimmed);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    event.stopPropagation();
    if (event.key === "Enter") {
      event.preventDefault();
      submitPassword();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
      onKeyDown={(event) => event.stopPropagation()}
    >
      <div
        className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-5 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h3 id={titleId} className="text-sm font-semibold text-gray-900">
          PDF protegido con contraseña
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          El archivo{" "}
          <span className="font-medium text-gray-800">{fileName}</span> requiere
          contraseña para subirse.
        </p>

        <label
          htmlFor={`${titleId}-password`}
          className="mt-4 mb-1.5 block text-sm font-medium text-gray-700"
        >
          Contraseña del PDF
        </label>
        <input
          ref={inputRef}
          id={`${titleId}-password`}
          type="password"
          autoComplete="off"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSubmitting}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-100 disabled:opacity-60"
          placeholder="Ingresa la contraseña"
        />

        {passwordError && (
          <p className="mt-2 text-xs text-red-600" role="alert">
            {passwordError}
          </p>
        )}

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={submitPassword}
            disabled={isSubmitting || !password.trim()}
            className="rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Subiendo..." : "Subir con contraseña"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
