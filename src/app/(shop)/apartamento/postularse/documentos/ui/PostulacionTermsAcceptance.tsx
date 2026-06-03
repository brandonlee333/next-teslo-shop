"use client";

import Link from "next/link";
import clsx from "clsx";

import { POSTULACION_TERMINOS_PATH } from "@/lib/postulacion/terminos-content";

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  showError: boolean;
}

export const PostulacionTermsAcceptance = ({
  checked,
  onChange,
  showError,
}: Props) => {
  return (
    <div
      className={clsx(
        "rounded-xl border px-4 py-4 transition-colors",
        showError
          ? "border-red-300 bg-red-50/50"
          : "border-gray-200 bg-white",
      )}
    >
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          name="acceptTerms"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-rose-600 focus:ring-rose-500"
          aria-invalid={showError}
          aria-describedby={showError ? "terms-error" : undefined}
        />
        <span className="text-sm leading-relaxed text-gray-700">
          He leído y acepto los{" "}
          <Link
            href={POSTULACION_TERMINOS_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-rose-600 underline-offset-2 hover:text-rose-700 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            términos y condiciones
          </Link>{" "}
          y autorizo el tratamiento de mis datos personales y documentos para el
          estudio de mi postulación de arrendamiento.
        </span>
      </label>
      {showError && (
        <p id="terms-error" role="alert" className="mt-3 text-sm text-red-700">
          Debes aceptar los términos y condiciones para enviar tu documentación.
        </p>
      )}
    </div>
  );
};
