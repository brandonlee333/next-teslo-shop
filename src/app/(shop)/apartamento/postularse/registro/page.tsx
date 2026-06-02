import Link from "next/link";

import { titleFont } from "@/config/fonts";
import { PostulacionRegisterForm } from "./ui/PostulacionRegisterForm";

export default function PostulacionRegistroPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <h1
            className={`${titleFont.className} mb-2 text-center text-2xl font-bold text-gray-900`}
          >
            Registro
          </h1>
          <p className="mb-8 text-center text-sm text-gray-500">
            Crea tu cuenta con tu documento de identidad y una contraseña
          </p>

          <PostulacionRegisterForm />
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link
            href="/apartamento"
            className="font-medium text-rose-600 hover:text-rose-700 transition-colors"
          >
            ← Volver al apartamento
          </Link>
        </p>
      </div>
    </div>
  );
}
