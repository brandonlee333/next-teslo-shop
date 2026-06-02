"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import clsx from "clsx";

import { startPostulacion } from "@/actions";

export const PostulacionLoginForm = () => {
  const [state, dispatch] = useFormState(startPostulacion, undefined);

  useEffect(() => {
    if (state === "Success") {
      window.location.replace("/apartamento/postularse/documentos");
    }
  }, [state]);

  return (
    <form action={dispatch} className="space-y-5">
      <div>
        <label htmlFor="documentId" className="mb-1.5 block text-sm font-medium text-gray-700">
          Documento de identidad
        </label>
        <input
          id="documentId"
          name="documentId"
          type="text"
          inputMode="numeric"
          required
          autoComplete="off"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition-colors focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
          placeholder="Ej: 1234567890"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          minLength={6}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition-colors focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
          placeholder="Ingresa tu contraseña"
        />
      </div>

      {state === "InvalidDocument" && (
        <p className="text-sm text-red-500">Ingresa un documento de identidad válido.</p>
      )}

      {state === "InvalidPassword" && (
        <p className="text-sm text-red-500">Ingresa una contraseña válida (mínimo 6 caracteres).</p>
      )}

      {state === "InvalidCredentials" && (
        <p className="text-sm text-red-500">
          Documento o contraseña incorrectos. Si no tienes cuenta,{" "}
          <Link
            href="/apartamento/postularse/registro"
            className="font-medium underline hover:text-red-600"
          >
            regístrate
          </Link>
          .
        </p>
      )}

      <SubmitButton />

      <div className="border-t border-gray-100 pt-6 text-center">
        <p className="text-base font-bold tracking-tight text-indigo-600">
          ¿No estás registrado?
        </p>
        <Link
          href="/apartamento/postularse/registro"
          className="mt-3 flex w-full items-center justify-center rounded-lg border-2 border-indigo-500 bg-indigo-50 py-3 text-sm font-semibold text-indigo-700 transition-all hover:bg-indigo-100 hover:shadow-md active:scale-[0.99]"
        >
          Regístrate
        </Link>
      </div>
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
          : "bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600 shadow-md shadow-rose-500/30 hover:scale-[1.01] hover:shadow-lg active:scale-[0.99]"
      )}
    >
      {pending ? "Verificando..." : "Continuar"}
    </button>
  );
};
