"use client";

import Link from "next/link";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import {
  IoCloseOutline,
  IoDocumentTextOutline,
  IoHomeOutline,
  IoImagesOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

import { useUIStore } from "@/store";
import { logout } from "@/actions";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === "admin";

  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      {/* Sidemenu */}
      <nav
        className={clsx(
          "fixed right-0 top-0 z-20 flex h-screen w-[min(100vw,20rem)] flex-col overflow-y-auto bg-white p-4 shadow-2xl transition-transform duration-300 sm:w-96 sm:p-5 lg:w-[500px]",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          className="absolute right-4 top-4 h-7 w-7 shrink-0 cursor-pointer sm:right-5 sm:top-5 sm:h-10 sm:w-10"
          onClick={() => closeMenu()}
        />

        {/* Input */}
        <div className="relative mt-12 sm:mt-14">
          <IoSearchOutline className="absolute left-2 top-2 h-4 w-4 sm:h-5 sm:w-5" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full rounded border-b-2 border-gray-200 bg-gray-50 py-1.5 pl-9 pr-8 text-base focus:border-blue-500 focus:outline-none sm:pl-10 sm:text-lg"
          />
        </div>

        {/* Menú */}
        <div className="mt-4 flex flex-1 flex-col sm:mt-6">
          <Link
            href="/"
            onClick={() => closeMenu()}
            className="flex items-center rounded p-2 transition-all hover:bg-gray-100"
          >
            <IoHomeOutline className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
            <span className="ml-3 text-base sm:text-lg">Apartamento</span>
          </Link>

          {isAdmin && (
            <>
              <Link
                href="/admin/apartamento/galeria"
                onClick={() => closeMenu()}
                className="mt-3 flex items-center rounded p-2 transition-all hover:bg-gray-100 sm:mt-4"
              >
                <IoImagesOutline className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
                <span className="ml-3 text-base sm:text-lg">Galería</span>
              </Link>

              <Link
                href="/admin/apartamento/postulaciones"
                onClick={() => closeMenu()}
                className="mt-3 flex items-center rounded p-2 transition-all hover:bg-gray-100 sm:mt-4"
              >
                <IoDocumentTextOutline className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
                <span className="ml-3 text-base sm:text-lg">Postulaciones</span>
              </Link>
            </>
          )}

          {isAuthenticated && (
            <button
              className="mt-3 flex w-full items-center rounded p-2 transition-all hover:bg-gray-100 sm:mt-4"
              onClick={() => logout()}
            >
              <IoLogOutOutline className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
              <span className="ml-3 text-base sm:text-lg">Salir</span>
            </button>
          )}

          {!isAuthenticated && (
            <Link
              href="/auth/login"
              className="mt-3 flex items-center rounded p-2 transition-all hover:bg-gray-100 sm:mt-4"
              onClick={() => closeMenu()}
            >
              <IoLogInOutline className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
              <span className="ml-3 text-base sm:text-lg">Ingresar</span>
            </Link>
          )}

          {isAdmin && (
            <>
              <div className="my-5 h-px w-full bg-gray-200 sm:my-8" />

              <Link
                href="/admin/products"
                onClick={() => closeMenu()}
                className="flex items-center rounded p-2 transition-all hover:bg-gray-100"
              >
                <IoShirtOutline className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
                <span className="ml-3 text-base sm:text-lg">Productos</span>
              </Link>

              <Link
                href="/admin/orders"
                onClick={() => closeMenu()}
                className="mt-3 flex items-center rounded p-2 transition-all hover:bg-gray-100 sm:mt-4"
              >
                <IoTicketOutline className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
                <span className="ml-3 text-base sm:text-lg">Ordenes</span>
              </Link>

              <Link
                href="/admin/users"
                onClick={() => closeMenu()}
                className="mt-3 flex items-center rounded p-2 transition-all hover:bg-gray-100 sm:mt-4"
              >
                <IoPeopleOutline className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
                <span className="ml-3 text-base sm:text-lg">Usuarios</span>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};
