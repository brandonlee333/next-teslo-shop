"use client";

import { useState } from "react";
import { Swiper as SwiperObject } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { titleFont } from "@/config/fonts";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const placeholderImages = [
  { src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", alt: "Sala del apartamento" },
  { src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", alt: "Habitación principal" },
  { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80", alt: "Cocina integral" },
  { src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80", alt: "Baño" },
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", alt: "Vista exterior" },
  { src: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80", alt: "Segunda habitación" },
];

export const GallerySection = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <section className="pb-14 px-5">
      <div className="max-w-2xl mx-auto">
        <h2 className={`${titleFont.className} text-lg font-semibold text-gray-900 mb-5`}>
          📷 Galería del apartamento
        </h2>

        {/* Main carousel */}
        <div className="rounded-xl overflow-hidden border border-gray-200 mb-3">
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            } as React.CSSProperties}
            spaceBetween={0}
            navigation
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            className="aspect-[16/9]"
          >
            {placeholderImages.map((img) => (
              <SwiperSlide key={img.src}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Thumbnails */}
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
          className="mt-2"
        >
          {placeholderImages.map((img) => (
            <SwiperSlide key={img.src} className="cursor-pointer">
              <div className="rounded-lg overflow-hidden aspect-square border-2 border-transparent hover:border-blue-400 transition-colors">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
