"use client";

import { useState } from "react";
import { Swiper as SwiperObject } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { titleFont } from "@/config/fonts";
import type { ApartmentGalleryImageItem } from "@/lib/apartment-gallery-defaults";
import { GalleryInfoCards } from "./GalleryInfoCards";
import { GalleryLightbox } from "./GalleryLightbox";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./gallery.css";

interface Props {
  images: ApartmentGalleryImageItem[];
}

function imageKey(img: ApartmentGalleryImageItem) {
  return img.id != null ? `id-${img.id}` : img.src;
}

export const GallerySection = ({ images }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();
  const [mainSwiper, setMainSwiper] = useState<SwiperObject>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
    mainSwiper?.autoplay?.stop();
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    mainSwiper?.autoplay?.start();
  };

  const handleLightboxIndexChange = (index: number) => {
    setActiveIndex(index);
    mainSwiper?.slideTo(index);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="pb-14 px-5">
      <div className="max-w-2xl mx-auto">
        <h2 className={`${titleFont.className} text-lg font-semibold text-gray-900 mb-5`}>
          📷 Galería del apartamento
        </h2>

        <div className="rounded-xl overflow-hidden border border-gray-200 mb-3">
          <Swiper
            onSwiper={setMainSwiper}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            } as React.CSSProperties}
            spaceBetween={0}
            navigation
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            className="gallery-main aspect-[16/9] w-full"
          >
            {images.map((img, index) => (
              <SwiperSlide key={imageKey(img)}>
                <button
                  type="button"
                  onClick={() => openLightbox(index)}
                  className="group relative block h-full w-full cursor-zoom-in"
                  aria-label={`Ver imagen ${index + 1} en pantalla completa`}
                >
                  <img
                    src={img.src}
                    alt={`Foto ${index + 1} del apartamento`}
                    className="h-full w-full object-cover"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={12}
          slidesPerView={4}
          breakpoints={{
            640: { slidesPerView: 5 },
            1024: { slidesPerView: 6 },
          }}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Thumbs]}
          className="gallery-thumbs mt-2 !h-auto"
        >
          {images.map((img, index) => (
            <SwiperSlide key={imageKey(img)} className="cursor-pointer !h-auto">
              <div className="rounded-lg overflow-hidden aspect-square border-2 border-transparent hover:border-blue-400 transition-colors">
                <img
                  src={img.src}
                  alt={`Miniatura ${index + 1} del apartamento`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <GalleryInfoCards />
      </div>

      {lightboxOpen && (
        <GalleryLightbox
          images={images}
          activeIndex={activeIndex}
          onClose={closeLightbox}
          onIndexChange={handleLightboxIndexChange}
        />
      )}
    </section>
  );
};
