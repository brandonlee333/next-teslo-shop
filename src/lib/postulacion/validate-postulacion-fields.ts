export const POSTULACION_REQUIRED_FIELDS = [
  {
    name: "occupantCount",
    id: "occupantCount",
    label: "¿Cuántas personas habitarán el inmueble?",
  },
  {
    name: "occupantAges",
    id: "occupantAges",
    label: "Edades de las personas que habitarán el inmueble",
  },
  {
    name: "titularNames",
    id: "titularNames",
    label: "Nombre de quienes se harán responsables del arriendo",
  },
  {
    name: "titularEmails",
    id: "titularEmails",
    label: "Correo de la persona titular",
  },
  {
    name: "currentResidence",
    id: "currentResidence",
    label: "¿Dónde vives actualmente?",
  },
  {
    name: "previousRent",
    id: "previousRent",
    label: "¿Cuánto pagabas en tu anterior arriendo?",
  },
  {
    name: "moveReason",
    id: "moveReason",
    label: "¿Por qué te quieres mudar?",
  },
  { name: "pets", id: "pets", label: "¿Tiene mascotas?" },
  {
    name: "vehicleParking",
    id: "vehicleParking",
    label: "¿Tiene vehículo? ¿Necesita parqueadero?",
  },
] as const;

export type PostulacionRequiredFieldId =
  (typeof POSTULACION_REQUIRED_FIELDS)[number]["id"];

function isOccupantCountFilled(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  const count = Number(trimmed);
  return Number.isInteger(count) && count >= 1;
}

export function getMissingPostulacionFieldIds(
  formData: FormData,
): PostulacionRequiredFieldId[] {
  const missing: PostulacionRequiredFieldId[] = [];

  for (const field of POSTULACION_REQUIRED_FIELDS) {
    const raw = formData.get(field.name)?.toString() ?? "";

    if (field.name === "occupantCount") {
      if (!isOccupantCountFilled(raw)) {
        missing.push(field.id);
      }
      continue;
    }

    if (!raw.trim()) {
      missing.push(field.id);
    }
  }

  return missing;
}

export function getMissingPostulacionFieldLabels(
  formData: FormData,
): string[] {
  const missingIds = new Set(getMissingPostulacionFieldIds(formData));

  return POSTULACION_REQUIRED_FIELDS.filter((field) =>
    missingIds.has(field.id),
  ).map((field) => field.label);
}
