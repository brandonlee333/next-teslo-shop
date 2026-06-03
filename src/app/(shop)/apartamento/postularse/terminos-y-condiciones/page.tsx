import type { Metadata } from "next";
import Link from "next/link";

import { titleFont } from "@/config/fonts";
import {
  POSTULACION_TERMINOS_LAST_UPDATED,
  POSTULACION_TERMINOS_SECTIONS,
} from "@/lib/postulacion/terminos-content";

export const metadata: Metadata = {
  title: "Términos y condiciones — Postulación",
  description:
    "Términos, condiciones y autorización de tratamiento de datos personales para el proceso de postulación de arrendamiento.",
};

export default function TerminosYCondicionesPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
      <Link
        href="/apartamento/postularse/documentos"
        className="mb-6 inline-flex text-sm font-medium text-rose-600 transition-colors hover:text-rose-700"
      >
        ← Volver al formulario de documentos
      </Link>

      <header className="mb-10 border-b border-gray-200 pb-8">
        <h1
          className={`${titleFont.className} mb-3 text-2xl font-bold text-gray-900 sm:text-3xl`}
        >
          Términos y condiciones de postulación
        </h1>
        <p className="text-sm text-gray-500">
          Última actualización: {POSTULACION_TERMINOS_LAST_UPDATED}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          Lea atentamente este documento antes de enviar su documentación. Al
          aceptar, autoriza el tratamiento de sus datos personales para el
          estudio de su perfil como posible arrendatario.
        </p>
      </header>

      <article className="space-y-8 text-sm leading-relaxed text-gray-800">
        {POSTULACION_TERMINOS_SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="mb-3 text-base font-semibold text-gray-900">
              {section.title}
            </h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mb-3">
                {paragraph}
              </p>
            ))}
            {section.list && (
              <ul className="mb-3 list-disc space-y-2 pl-6">
                {section.list.map((item) => (
                  <li key={item.slice(0, 40)}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>

      <footer className="mt-12 rounded-xl border border-rose-100 bg-rose-50/60 px-5 py-4 text-center text-sm text-gray-700">
        Si no está de acuerdo con estos términos, no marque la casilla de
        aceptación ni envíe su documentación a través del formulario.
      </footer>
    </div>
  );
}
