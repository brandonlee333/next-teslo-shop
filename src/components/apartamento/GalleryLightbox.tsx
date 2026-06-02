"use client";

import { useCallback, useEffect } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline, IoCloseOutline } from "react-icons/io5";

interface GalleryImage {
  src: string;
  alt: string;
}

interface Props {
  images: GalleryImage[];
  activeIndex: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export const GalleryLightbox = ({ images, activeIndex, onClose, onIndexChange }: Props) => {
  const goPrev = useCallback(() => {
    onIndexChange((activeIndex - 1 + images.length) % images.length);
  }, [activeIndex, images.length, onIndexChange]);

  const goNext = useCallback(() => {
    onIndexChange((activeIndex + 1) % images.length);
  }, [activeIndex, images.length, onIndexChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, goPrev, goNext]);

  const current = images[activeIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      role="dialog"
      aria-modal="true"
      aria-label="Vista ampliada de la galería"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        aria-label="Cerrar"
      >
        <IoCloseOutline size={28} />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:left-6"
            aria-label="Imagen anterior"
          >
            <IoChevronBackOutline size={28} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:right-6"
            aria-label="Imagen siguiente"
          >
            <IoChevronForwardOutline size={28} />
          </button>
        </>
      )}

      <div
        className="flex h-full w-full max-w-6xl flex-col items-center justify-center px-14 py-16 sm:px-20"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={current.src.includes("w=800") ? current.src.replace("w=800", "w=1600") : current.src}
          alt={current.alt}
          className="max-h-full max-w-full object-contain"
        />
        <p className="mt-4 text-center text-sm text-white/70">
          {current.alt} · {activeIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  );
};
