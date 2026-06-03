import { POSTULACION_REQUIRED_FIELDS } from "@/lib/postulacion/validate-postulacion-fields";

export type PostulacionCompletionStatus = "complete" | "partial";

export type PostulacionApplicationRecord = {
  occupantCount: number | null;
  occupantAges: string | null;
  titularNames: string | null;
  titularEmails: string | null;
  currentOccupation: string | null;
  employmentType: string | null;
  worksFromHome: string | null;
  moveDateNeeded: string | null;
  creditBureauReported: string | null;
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

export function areAllPostulacionQuestionsFilled(
  application: PostulacionApplicationRecord,
): boolean {
  return (
    countFilledPostulacionFields(application) ===
    POSTULACION_REQUIRED_FIELDS.length
  );
}

export function isEligibleForPostulacionQueue(
  application: PostulacionApplicationRecord & { submittedAt: Date | null },
): boolean {
  return (
    areAllPostulacionQuestionsFilled(application) &&
    application.submittedAt != null
  );
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

export type PostulacionDisplayStatus =
  | "incomplete_questions"
  | "missing_documents"
  | "complete";

export function getPostulacionDisplayStatus(
  application: PostulacionApplicationRecord,
  documentCount: number,
): PostulacionDisplayStatus | null {
  if (!hasAnyPostulacionProgress(application, documentCount)) {
    return null;
  }

  if (!areAllPostulacionQuestionsFilled(application)) {
    return "incomplete_questions";
  }

  if (documentCount === 0) {
    return "missing_documents";
  }

  return "complete";
}
