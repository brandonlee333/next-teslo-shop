import type { Metadata } from "next";
import { getApartmentGalleryImages } from "@/actions";
import { ApartamentoResumen } from "@/components/apartamento/ApartamentoResumen";
import { GallerySection } from "@/components/apartamento/GallerySection";
import { PostularseCTA } from "@/components/apartamento/PostularseCTA";
import { WhatsAppButton } from "@/components/apartamento/WhatsAppButton";

export const metadata: Metadata = {
  title: "Apartamento en Arriendo - Candelaria La Nueva",
  description:
    "Hermoso apartamento de 54m² en arriendo en Candelaria La Nueva, Bogotá. 2 habitaciones, recién remodelado, segundo piso independiente.",
};

export default async function ApartamentoPage() {
  const galleryImages = await getApartmentGalleryImages();

  return (
    <>
      <ApartamentoResumen />
      <GallerySection images={galleryImages} />
      <PostularseCTA />
      <WhatsAppButton />
    </>
  );
}
