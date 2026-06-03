import { decryptPDF, isEncrypted } from "@pdfsmaller/pdf-decrypt";

export type PreparePdfUploadResult =
  | { status: "ready"; buffer: Buffer }
  | { status: "password_required" }
  | { status: "invalid_password" };

function isInvalidPasswordMessage(message: string): boolean {
  return /incorrect password/i.test(message);
}

function isNotEncryptedMessage(message: string): boolean {
  return /not encrypted/i.test(message);
}

async function tryDecryptPdf(
  bytes: Uint8Array,
  password: string,
  originalBuffer: Buffer,
): Promise<PreparePdfUploadResult> {
  try {
    const decrypted = await decryptPDF(bytes, password);
    return { status: "ready", buffer: Buffer.from(decrypted) };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    if (isInvalidPasswordMessage(message)) {
      return { status: "invalid_password" };
    }

    if (isNotEncryptedMessage(message)) {
      return { status: "ready", buffer: originalBuffer };
    }

    throw error;
  }
}

export async function preparePdfForUpload(
  buffer: Buffer,
  password?: string,
): Promise<PreparePdfUploadResult> {
  const bytes = new Uint8Array(buffer);
  const trimmedPassword = password?.trim();

  if (trimmedPassword) {
    return tryDecryptPdf(bytes, trimmedPassword, buffer);
  }

  const encryption = await isEncrypted(bytes);
  if (!encryption.encrypted) {
    return { status: "ready", buffer };
  }

  return { status: "password_required" };
}

export function isPdfFile(file: File): boolean {
  return (
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf")
  );
}

export function isPdfFileName(name: string): boolean {
  return name.toLowerCase().endsWith(".pdf");
}
