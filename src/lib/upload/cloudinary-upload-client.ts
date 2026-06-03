import { uploadFileToCloudinary } from "@/actions";
import type { UploadFileResult } from "@/actions/upload/upload-file-types";

export async function uploadFileWithPdfPassword(
  file: File,
  pdfPassword?: string,
): Promise<UploadFileResult> {
  const formData = new FormData();
  formData.append("file", file, file.name);

  if (pdfPassword?.trim()) {
    formData.append("pdfPassword", pdfPassword.trim());
  }

  return uploadFileToCloudinary(formData);
}
