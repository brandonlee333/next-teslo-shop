'use server';

import prisma from '@/lib/prisma';
import {
  DEFAULT_APARTMENT_GALLERY_IMAGES,
  type ApartmentGalleryImageItem,
} from '@/lib/apartment-gallery-defaults';

export const getApartmentGalleryImages = async (): Promise<ApartmentGalleryImageItem[]> => {
  try {
    const images = await prisma.apartmentGalleryImage.findMany({
      orderBy: { sortOrder: 'asc' },
    });

    if (images.length === 0) {
      return DEFAULT_APARTMENT_GALLERY_IMAGES;
    }

    return images.map((image) => ({
      id: image.id,
      src: image.url,
      alt: image.alt,
    }));
  } catch {
    return DEFAULT_APARTMENT_GALLERY_IMAGES;
  }
};
