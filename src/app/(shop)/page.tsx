import type { Metadata } from "next";
import { ApartamentoHome } from "@/components/apartamento/ApartamentoHome";

export const metadata: Metadata = {
  title: "Apartamento en Arriendo - Candelaria La Nueva",
  description:
    "Hermoso apartamento de 54m² en arriendo en Candelaria La Nueva, Bogotá. 2 habitaciones, recién remodelado, segundo piso independiente.",
};

export default function HomePage() {
  return <ApartamentoHome />;
}
