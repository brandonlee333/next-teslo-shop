import type { Metadata } from "next";
import { HeroSection } from "@/components/apartamento/HeroSection";
import { InfoSection } from "@/components/apartamento/InfoSection";
import { FeaturesSection } from "@/components/apartamento/FeaturesSection";
import { GallerySection } from "@/components/apartamento/GallerySection";
import { LocationSection } from "@/components/apartamento/LocationSection";
import { ServicesSection } from "@/components/apartamento/ServicesSection";
import { RequirementsSection } from "@/components/apartamento/RequirementsSection";
import { VisitsSection } from "@/components/apartamento/VisitsSection";
import { WhatsAppButton } from "@/components/apartamento/WhatsAppButton";

export const metadata: Metadata = {
  title: "Apartamento en Arriendo - Candelaria La Nueva",
  description:
    "Hermoso apartamento de 54m² en arriendo en Candelaria La Nueva, Bogotá. 2 habitaciones, recién remodelado, segundo piso independiente. $1.050.000/mes.",
};

export default function ApartamentoPage() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <InfoSection />
      <FeaturesSection />
      <GallerySection />
      <LocationSection />
      <ServicesSection />
      <RequirementsSection />
      <VisitsSection />
      <WhatsAppButton />
    </div>
  );
}
