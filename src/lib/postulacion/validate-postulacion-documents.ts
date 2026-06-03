import { POSTULACION_DOCUMENT_KEYS } from "@/lib/postulacion/document-keys";

export function countUploadedPostulacionDocuments(formData: FormData): number {
  let total = 0;

  for (const key of POSTULACION_DOCUMENT_KEYS) {
    const raw = formData.get(`documents_${key}`);
    if (typeof raw !== "string" || !raw.trim()) {
      continue;
    }

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        total += parsed.length;
      }
    } catch {
      // ignore invalid JSON for this category
    }
  }

  return total;
}

export function hasMinimumPostulacionDocuments(formData: FormData): boolean {
  return countUploadedPostulacionDocuments(formData) >= 1;
}
