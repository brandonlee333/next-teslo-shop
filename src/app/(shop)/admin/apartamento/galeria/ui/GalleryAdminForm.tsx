"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  IoArrowDownOutline,
  IoArrowUpOutline,
  IoImagesOutline,
  IoTrashOutline,
} from "react-icons/io5";
import {
  addApartmentGalleryImages,
  deleteApartmentGalleryImage,
  reorderApartmentGalleryImages,
  seedDefaultApartmentGallery,
  updateApartmentGalleryImage,
} from "@/actions";
import type { ApartmentGalleryImageItem } from "@/lib/apartment-gallery-defaults";

interface Props {
  images: ApartmentGalleryImageItem[];
  isPersisted: boolean;
}

export const GalleryAdminForm = ({ images: initialImages, isPersisted }: Props) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState(initialImages);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setImages(initialImages);
  }, [initialImages]);

  const persistedImages = images.filter((img) => img.id != null);

  const refresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleUpload = async (fileList: FileList | null) => {
    if (!fileList?.length) return;

    setError(null);
    const formData = new FormData();
    Array.from(fileList).forEach((file) => formData.append("images", file));

    const result = await addApartmentGalleryImages(formData);
    if (!result.ok) {
      setError(result.message ?? "Error al subir imágenes");
      return;
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
    refresh();
  };

  const handleSeedDefaults = async () => {
    setError(null);
    const result = await seedDefaultApartmentGallery();
    if (!result.ok) {
      setError(result.message ?? "No se pudo inicializar");
      return;
    }
    refresh();
  };

  const handleAltSave = async (id: number, alt: string) => {
    const result = await updateApartmentGalleryImage(id, alt);
    if (!result.ok) {
      setError(result.message ?? "No se pudo guardar");
    }
  };

  const handleDelete = async (id: number, src: string) => {
    if (!confirm("¿Eliminar esta imagen de la galería?")) return;

    setError(null);
    const result = await deleteApartmentGalleryImage(id, src);
    if (!result.ok) {
      setError(result.message ?? "No se pudo eliminar");
      return;
    }
    setImages((prev) => prev.filter((img) => img.id !== id));
    refresh();
  };

  const moveImage = async (index: number, direction: -1 | 1) => {
    const ids = persistedImages.map((img) => img.id!);
    const target = index + direction;
    if (target < 0 || target >= ids.length) return;

    [ids[index], ids[target]] = [ids[target], ids[index]];

    const result = await reorderApartmentGalleryImages(ids);
    if (!result.ok) {
      setError(result.message ?? "No se pudo reordenar");
      return;
    }
    refresh();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 mb-2">
        <IoImagesOutline className="w-8 h-8 text-blue-700" />
        <h1 className="text-3xl font-bold">Galería del apartamento</h1>
      </div>
      <p className="text-gray-500 mb-8">
        Sube, ordena y edita las fotos que se muestran en la página del apartamento.
      </p>

      {!isPersisted && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
          <p className="mb-3 text-sm">
            La galería muestra imágenes de ejemplo. Inicialízala para poder editarlas y subir las tuyas.
          </p>
          <button
            type="button"
            onClick={handleSeedDefaults}
            disabled={isPending}
            className="rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800 disabled:opacity-50"
          >
            Usar imágenes actuales como base
          </button>
        </div>
      )}

      <div
        onClick={() => fileInputRef.current?.click()}
        className="mb-6 cursor-pointer rounded-xl border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-blue-400 hover:bg-gray-50"
      >
        <p className="font-medium text-gray-700">Haz clic para subir nuevas fotos</p>
        <p className="mt-1 text-sm text-gray-400">Puedes seleccionar varias a la vez</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      {isPersisted && persistedImages.length > 0 && (
        <ul className="space-y-4">
          {persistedImages.map((image, index) => (
            <li
              key={image.id}
              className="flex flex-col gap-3 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-24 w-36 flex-shrink-0 rounded-lg object-cover"
              />

              <div className="min-w-0 flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Descripción (alt)
                </label>
                <input
                  type="text"
                  defaultValue={image.alt}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  onBlur={(e) => {
                    if (e.target.value.trim() !== image.alt) {
                      handleAltSave(image.id!, e.target.value);
                    }
                  }}
                />
              </div>

              <div className="flex flex-shrink-0 items-center gap-2">
                <button
                  type="button"
                  disabled={index === 0 || isPending}
                  onClick={() => moveImage(index, -1)}
                  className="rounded-lg border p-2 hover:bg-gray-100 disabled:opacity-40"
                  aria-label="Subir"
                >
                  <IoArrowUpOutline size={20} />
                </button>
                <button
                  type="button"
                  disabled={index === persistedImages.length - 1 || isPending}
                  onClick={() => moveImage(index, 1)}
                  className="rounded-lg border p-2 hover:bg-gray-100 disabled:opacity-40"
                  aria-label="Bajar"
                >
                  <IoArrowDownOutline size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(image.id!, image.src)}
                  className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
                  aria-label="Eliminar"
                >
                  <IoTrashOutline size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isPersisted && persistedImages.length === 0 && (
        <p className="text-center text-gray-500">No hay imágenes. Sube la primera arriba.</p>
      )}

      <div className="mt-8">
        <a
          href="/"
          className="text-sm font-medium text-blue-700 hover:text-blue-900"
        >
          Ver galería en la página del apartamento →
        </a>
      </div>
    </div>
  );
};
