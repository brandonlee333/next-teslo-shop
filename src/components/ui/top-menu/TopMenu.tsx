"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  IoDocumentTextOutline,
  IoHomeOutline,
  IoImagesOutline,
} from "react-icons/io5";

import { titleFont } from "@/config/fonts";
import { useUIStore } from "@/store";

export const TopMenu = () => {

  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const { data: session } = useSession();
  const isAdmin = session?.user.role === "admin";

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className } antialiased font-bold`}>
            arriendos
          </span>
          <span> | confiables</span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className="hidden sm:block">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 inline-flex items-center gap-1"
          href="/"
        >
          <IoHomeOutline className="w-4 h-4" />
          Apartamento
        </Link>
        {isAdmin && (
          <>
            <Link
              className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 inline-flex items-center gap-1"
              href="/admin/apartamento/galeria"
            >
              <IoImagesOutline className="w-4 h-4" />
              Galería
            </Link>
            <Link
              className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 inline-flex items-center gap-1"
              href="/admin/apartamento/postulaciones"
            >
              <IoDocumentTextOutline className="w-4 h-4" />
              Postulaciones
            </Link>
          </>
        )}
      </div>

      {/* Menu */}
      <div className="flex items-center">
        <button
          onClick={openSideMenu}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menú
        </button>
      </div>
    </nav>
  );
};
