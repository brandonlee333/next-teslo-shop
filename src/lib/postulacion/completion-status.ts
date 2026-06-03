import { POSTULACION_REQUIRED_FIELDS } from "@/lib/postulacion/validate-postulacion-fields";

export type PostulacionCompletionStatus = "complete" | "partial";

export type PostulacionApplicationRecord = {
  occupantCount: number | null;
  occupantAges: string | null;
  titularNames: string | null;
  titularEmails: string | null;
  currentResidence: string | null;
  previousRent: string | null;
  moveReason: string | null;
  pets: string | null;
  vehicleParking: string | null;
};

function isOccupantCountFilled(value: number | null): boolean {
  return value !== null && Number.isInteger(value) && value >= 1;
}

function isStringFieldFilled(value: string | null | undefined): boolean {
  return Boolean(value?.trim());
}

export function countFilledPostulacionFields(
  application: PostulacionApplicationRecord,
): number {
  let filled = 0;

  for (const field of POSTULACION_REQUIRED_FIELDS) {
    if (field.name === "occupantCount") {
      if (isOccupantCountFilled(application.occupantCount)) {
        filled += 1;
      }
      continue;
    }

    const value = application[field.name as keyof PostulacionApplicationRecord];
    if (typeof value === "string" && isStringFieldFilled(value)) {
      filled += 1;
    }
  }

  return filled;
}

export function hasAnyPostulacionProgress(
  application: PostulacionApplicationRecord,
  documentCount: number,
): boolean {
  return countFilledPostulacionFields(application) > 0 || documentCount > 0;
}

export function isPostulacionFullyComplete(
  application: PostulacionApplicationRecord,
  documentCount: number,
): boolean {
  return (
    countFilledPostulacionFields(application) ===
      POSTULACION_REQUIRED_FIELDS.length && documentCount > 0
  );
}

export function getPostulacionCompletionStatus(
  application: PostulacionApplicationRecord,
  documentCount: number,
): PostulacionCompletionStatus | null {
  if (!hasAnyPostulacionProgress(application, documentCount)) {
    return null;
  }

  if (isPostulacionFullyComplete(application, documentCount)) {
    return "complete";
  }

  return "partial";
}
