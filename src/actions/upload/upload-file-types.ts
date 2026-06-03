export type UploadFileErrorCode =
  | "PDF_PASSWORD_REQUIRED"
  | "INVALID_PDF_PASSWORD";

export type UploadFileResult =
  | {
      ok: true;
      url: string;
      originalName: string;
      format: string;
      size: number;
    }
  | {
      ok: false;
      message: string;
      code?: UploadFileErrorCode;
    };
