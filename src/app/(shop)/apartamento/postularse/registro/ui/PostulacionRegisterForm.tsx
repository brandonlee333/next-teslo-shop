"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import clsx from "clsx";

import { registerPostulacion } from "@/actions";

const inputClassName =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition-colors focus:border-rose-400 focus:ring-2 focus:ring-rose-100";

export const PostulacionRegisterForm = () => {
  const [state, dispatch] = useFormState(registerPostulacion, undefined);

  useEffect(() => {
    if (state === "Success") {
      window.location.replace("/apartamento/postularse/documentos");
    }
  }, [state]);

  return (
    <form action={dispatch} className="space-y-5">
      <div>
        <label
          htmlFor="documentId"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Documento de identidad
        </label>
        <input
          id="documentId"
          name="documentId"
          type="text"
          inputMode="numeric"
          required
          autoComplete="off"
          className={inputClassName}
          placeholder="Ej: 1234567890"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="new-password"
          minLength={6}
          className={inputClassName}
          placeholder="Mínimo 6 caracteres"
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-1.5 block text-sm font-medium text-gray-700"
        >
          Confirmar contraseña
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          autoComplete="new-password"
          minLength={6}
          className={inputClassName}
          placeholder="Repite tu contraseña"
        />
      </div>

      {state === "InvalidDocument" && (
        <p className="text-sm text-red-500">
          Ingresa un documento de identidad válido.
        </p>
      )}

      {state === "InvalidPassword" && (
        <p className="text-sm text-red-500">
          La contraseña debe tener al menos 6 caracteres.
        </p>
      )}

      {state === "PasswordMismatch" && (
        <p className="text-sm text-red-500">Las contraseñas no coinciden.</p>
      )}

      {state === "DocumentExists" && (
        <p className="text-sm text-red-500">
          Este documento ya está registrado.{" "}
          <Link
            href="/apartamento/postularse"
            className="font-medium underline hover:text-red-600"
          >
            Inicia sesión
          </Link>
        </p>
      )}

      {state === "Error" && (
        <p className="text-sm text-red-500">
          No se pudo completar el registro. Intenta de nuevo.
        </p>
      )}

      <SubmitButton />

      <p className="text-center text-sm text-gray-500">
        <Link
          href="/apartamento/postularse"
          className="font-medium text-rose-600 hover:text-rose-700 transition-colors"
        >
          ← Ya tengo cuenta
        </Link>
      </p>
    </form>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={clsx(
        "w-full rounded-lg py-3.5 text-sm font-semibold text-white transition-all",
        pending
          ? "cursor-not-allowed bg-gray-400"
          : "bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600 shadow-md shadow-rose-500/30 hover:scale-[1.01] hover:shadow-lg active:scale-[0.99]",
      )}
    >
      {pending ? "Registrando..." : "Crear cuenta"}
    </button>
  );
}
