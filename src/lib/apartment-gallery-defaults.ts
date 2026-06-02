export interface ApartmentGalleryImageItem {
  id?: number;
  src: string;
  alt: string;
}

export const DEFAULT_APARTMENT_GALLERY_IMAGES: ApartmentGalleryImageItem[] = [
  { src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", alt: "Sala del apartamento" },
  { src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", alt: "Habitación principal" },
  { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80", alt: "Cocina integral" },
  { src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80", alt: "Baño" },
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", alt: "Vista exterior" },
  { src: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80", alt: "Segunda habitación" },
];
