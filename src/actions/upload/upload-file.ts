'use server';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const uploadFileToCloudinary = async (formData: FormData) => {
  try {
    const file = formData.get('file') as File;

    if (!file || file.size === 0) {
      return { ok: false, message: 'No se seleccionó ningún archivo' };
    }

    const buffer = await file.arrayBuffer();
    const base64File = Buffer.from(buffer).toString('base64');

    const mimeType = file.type || 'application/octet-stream';
    const dataUri = `data:${mimeType};base64,${base64File}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'uploads',
      resource_type: 'auto',
    });

    return {
      ok: true,
      url: result.secure_url,
      originalName: file.name,
      format: result.format,
      size: result.bytes,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error al subir el archivo a la nube',
    };
  }
};
