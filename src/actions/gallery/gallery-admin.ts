'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const GALLERY_PATHS = ['/apartamento', '/admin/apartamento/galeria'] as const;

function revalidateGallery() {
  for (const path of GALLERY_PATHS) {
    revalidatePath(path);
  }
}

function assertAdmin() {
  return auth().then((session) => {
    if (session?.user.role !== 'admin') {
      return { ok: false as const, message: 'Debe de estar autenticado como admin' };
    }
    return { ok: true as const };
  });
}

async function uploadImage(file: File): Promise<string | null> {
  try {
    const buffer = await file.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');
    const mimeType = file.type || 'image/jpeg';
    const result = await cloudinary.uploader.upload(
      `data:${mimeType};base64,${base64Image}`,
      { folder: 'apartamento-galeria' }
    );
    return result.secure_url;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const addApartmentGalleryImages = async (formData: FormData) => {
  const admin = await assertAdmin();
  if (!admin.ok) return admin;

  const files = formData.getAll('images') as File[];
  const validFiles = files.filter((file) => file.size > 0);

  if (validFiles.length === 0) {
    return { ok: false, message: 'No se seleccionaron imágenes' };
  }

  try {
    const last = await prisma.apartmentGalleryImage.findFirst({
      orderBy: { sortOrder: 'desc' },
      select: { sortOrder: true },
    });
    let nextOrder = (last?.sortOrder ?? -1) + 1;

    const uploadedUrls = await Promise.all(validFiles.map(uploadImage));
    const toCreate = uploadedUrls
      .map((url, index) => ({ url, file: validFiles[index] }))
      .filter((item): item is { url: string; file: File } => !!item.url);

    if (toCreate.length === 0) {
      return { ok: false, message: 'No se pudieron subir las imágenes' };
    }

    await prisma.apartmentGalleryImage.createMany({
      data: toCreate.map(({ url, file }) => ({
        url,
        alt: file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
        sortOrder: nextOrder++,
      })),
    });

    revalidateGallery();
    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: 'Error al guardar las imágenes' };
  }
};

export const updateApartmentGalleryImage = async (
  imageId: number,
  alt: string
) => {
  const admin = await assertAdmin();
  if (!admin.ok) return admin;

  const trimmedAlt = alt.trim();
  if (!trimmedAlt) {
    return { ok: false, message: 'La descripción no puede estar vacía' };
  }

  try {
    await prisma.apartmentGalleryImage.update({
      where: { id: imageId },
      data: { alt: trimmedAlt },
    });
    revalidateGallery();
    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: 'No se pudo actualizar la imagen' };
  }
};

export const deleteApartmentGalleryImage = async (
  imageId: number,
  imageUrl: string
) => {
  const admin = await assertAdmin();
  if (!admin.ok) return admin;

  if (imageUrl.startsWith('http')) {
    const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? '';
    try {
      await cloudinary.uploader.destroy(imageName);
    } catch (error) {
      console.log(error);
    }
  }

  try {
    await prisma.apartmentGalleryImage.delete({
      where: { id: imageId },
    });
    revalidateGallery();
    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: 'No se pudo eliminar la imagen' };
  }
};

export const reorderApartmentGalleryImages = async (orderedIds: number[]) => {
  const admin = await assertAdmin();
  if (!admin.ok) return admin;

  try {
    await prisma.$transaction(
      orderedIds.map((id, index) =>
        prisma.apartmentGalleryImage.update({
          where: { id },
          data: { sortOrder: index },
        })
      )
    );
    revalidateGallery();
    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: 'No se pudo reordenar la galería' };
  }
};

export const seedDefaultApartmentGallery = async () => {
  const admin = await assertAdmin();
  if (!admin.ok) return admin;

  try {
    const count = await prisma.apartmentGalleryImage.count();
    if (count > 0) {
      return { ok: false, message: 'La galería ya tiene imágenes guardadas' };
    }

    const { DEFAULT_APARTMENT_GALLERY_IMAGES } = await import(
      '@/lib/apartment-gallery-defaults'
    );

    await prisma.apartmentGalleryImage.createMany({
      data: DEFAULT_APARTMENT_GALLERY_IMAGES.map((image, index) => ({
        url: image.src,
        alt: image.alt,
        sortOrder: index,
      })),
    });

    revalidateGallery();
    return { ok: true };
  } catch (error) {
    console.log(error);
    return { ok: false, message: 'No se pudo inicializar la galería' };
  }
};
