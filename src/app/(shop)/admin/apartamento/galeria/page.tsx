import { getApartmentGalleryImages } from "@/actions";
import prisma from "@/lib/prisma";
import { GalleryAdminForm } from "./ui/GalleryAdminForm";

export default async function AdminApartamentoGaleriaPage() {
  const [images, count] = await Promise.all([
    getApartmentGalleryImages(),
    prisma.apartmentGalleryImage.count(),
  ]);

  return (
    <GalleryAdminForm images={images} isPersisted={count > 0} />
  );
}
