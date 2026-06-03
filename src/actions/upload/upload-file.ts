'use server';

import { v2 as cloudinary } from 'cloudinary';

import {
  isPdfFile,
  isPdfFileName,
  preparePdfForUpload,
} from '@/lib/pdf/prepare-pdf-upload';

import type { UploadFileResult } from './upload-file-types';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

function isCloudinaryPasswordProtectedError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const message = 'message' in error ? String(error.message) : '';
  return message.includes('Password-protected PDFs are not supported');
}

function getUploadFile(formData: FormData): File | null {
  const file = formData.get('file');
  if (file instanceof File && file.size > 0) return file;
  return null;
}

export const uploadFileToCloudinary = async (
  formData: FormData,
): Promise<UploadFileResult> => {
  try {
    const file = getUploadFile(formData);

    if (!file) {
      return { ok: false, message: 'No se seleccionó ningún archivo' };
    }

    const pdfPassword = formData.get('pdfPassword')?.toString();
    const fileName = file.name || 'documento.pdf';
    const isPdf =
      isPdfFile(file) || isPdfFileName(fileName);

    let buffer = Buffer.from(await file.arrayBuffer());

    if (isPdf) {
      const prepared = await preparePdfForUpload(buffer, pdfPassword);

      if (prepared.status === 'password_required') {
        return {
          ok: false,
          code: 'PDF_PASSWORD_REQUIRED',
          message:
            'Este PDF está protegido con contraseña. Ingresa la contraseña para subirlo.',
        };
      }

      if (prepared.status === 'invalid_password') {
        return {
          ok: false,
          code: 'INVALID_PDF_PASSWORD',
          message: 'La contraseña del PDF no es correcta. Intenta de nuevo.',
        };
      }

      buffer = prepared.buffer;
    }

    const mimeType = file.type || 'application/octet-stream';
    const dataUri = `data:${mimeType};base64,${buffer.toString('base64')}`;

    try {
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: 'uploads',
        resource_type: 'auto',
      });

      return {
        ok: true,
        url: result.secure_url,
        originalName: fileName,
        format: result.format,
        size: result.bytes,
      };
    } catch (uploadError) {
      if (isCloudinaryPasswordProtectedError(uploadError)) {
        if (pdfPassword?.trim()) {
          return {
            ok: false,
            code: 'INVALID_PDF_PASSWORD',
            message: 'La contraseña del PDF no es correcta. Intenta de nuevo.',
          };
        }

        return {
          ok: false,
          code: 'PDF_PASSWORD_REQUIRED',
          message:
            'Este PDF está protegido con contraseña. Ingresa la contraseña para subirlo.',
        };
      }

      throw uploadError;
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error al subir el archivo a la nube',
    };
  }
};
