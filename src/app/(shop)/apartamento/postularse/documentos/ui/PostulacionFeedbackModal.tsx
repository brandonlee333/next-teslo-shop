"use client";

import { useEffect } from "react";
import clsx from "clsx";
import {
  IoAlertCircleOutline,
  IoCheckmarkCircleOutline,
  IoCloseOutline,
} from "react-icons/io5";

export type PostulacionFeedbackModalContent = {
  variant: "error" | "success";
  title: string;
  message: string;
};

interface Props {
  feedback: PostulacionFeedbackModalContent | null;
  onClose: () => void;
}

export const PostulacionFeedbackModal = ({ feedback, onClose }: Props) => {
  useEffect(() => {
    if (!feedback) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [feedback, onClose]);

  if (!feedback) return null;

  const isSuccess = feedback.variant === "success";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="postulacion-feedback-title"
      aria-describedby="postulacion-feedback-message"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-label="Cerrar mensaje"
        onClick={onClose}
      />

      <div
        className="relative w-full max-w-md rounded-2xl border bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          aria-label="Cerrar"
        >
          <IoCloseOutline className="h-6 w-6" />
        </button>

        <div
          className={clsx(
            "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full",
            isSuccess ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600",
          )}
        >
          {isSuccess ? (
            <IoCheckmarkCircleOutline className="h-7 w-7" />
          ) : (
            <IoAlertCircleOutline className="h-7 w-7" />
          )}
        </div>

        <h2
          id="postulacion-feedback-title"
          className={clsx(
            "pr-8 text-center text-lg font-semibold",
            isSuccess ? "text-green-900" : "text-red-900",
          )}
        >
          {feedback.title}
        </h2>

        <p
          id="postulacion-feedback-message"
          className="mt-3 text-center text-sm leading-relaxed text-gray-600"
        >
          {feedback.message}
        </p>

        <button
          type="button"
          onClick={onClose}
          className={clsx(
            "mt-6 w-full rounded-xl py-3 text-sm font-semibold text-white transition-colors",
            isSuccess
              ? "bg-green-600 hover:bg-green-700"
              : "bg-rose-600 hover:bg-rose-700",
          )}
        >
          {isSuccess ? "Continuar" : "Entendido"}
        </button>
      </div>
    </div>
  );
};
