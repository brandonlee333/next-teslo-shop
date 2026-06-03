import Link from "next/link";
import { getApartmentGalleryImages, getPageViewCount } from "@/actions";
import { ApartamentoResumen } from "@/components/apartamento/ApartamentoResumen";
import { GallerySection } from "@/components/apartamento/GallerySection";
import { PageViewTracker } from "@/components/apartamento/PageViewTracker";
import { PostularseCTA } from "@/components/apartamento/PostularseCTA";
import { WhatsAppButton } from "@/components/apartamento/WhatsAppButton";

export async function ApartamentoHome() {
  const [galleryImages, pageViews] = await Promise.all([
    getApartmentGalleryImages(),
    getPageViewCount(),
  ]);

  return (
    <>
      <PageViewTracker />
      <ApartamentoResumen pageViews={pageViews} />
      <GallerySection images={galleryImages} />
      <PostularseCTA />
      <WhatsAppButton />
      <section className="mx-auto mb-14 mt-8 max-w-6xl px-5 sm:px-10">
        <Link
          href="/apartamento/preguntas-frecuentes"
          className="inline-flex w-full items-center justify-center rounded-xl bg-gray-900 px-6 py-3 text-base font-semibold text-white transition hover:bg-gray-700 sm:w-auto"
        >
          PREGUNTAS FRECUENTES
        </Link>
      </section>
    </>
  );
}
