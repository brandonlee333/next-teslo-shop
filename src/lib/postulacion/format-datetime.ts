const BOGOTA_TZ = "America/Bogota";

const MONTH_NAMES_LONG = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
] as const;

type BogotaDateTimeParts = {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  isPm: boolean;
};

function getBogotaDateTimeParts(value: Date | string): BogotaDateTimeParts {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BOGOTA_TZ,
    year: "numeric",
    month: "numeric",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(new Date(value));

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const dayPeriod = get("dayPeriod").toLowerCase();

  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour"),
    minute: get("minute").padStart(2, "0"),
    isPm: dayPeriod.includes("pm"),
  };
}

function formatTime({ hour, minute, isPm }: BogotaDateTimeParts): string {
  return `${hour}:${minute} ${isPm ? "p. m." : "a. m."}`;
}

/** Stable es-CO datetime string for SSR and client (avoids hydration mismatches). */
export function formatPostulacionDateTime(
  value: Date | string,
  options?: { dateStyle?: "medium" | "long" },
): string {
  const parts = getBogotaDateTimeParts(value);
  const time = formatTime(parts);

  if (options?.dateStyle === "long") {
    const monthIndex = Number(parts.month) - 1;
    const monthName = MONTH_NAMES_LONG[monthIndex] ?? parts.month;
    return `${Number(parts.day)} de ${monthName} de ${parts.year}, ${time}`;
  }

  const day = parts.day.padStart(2, "0");
  const month = parts.month.padStart(2, "0");
  return `${day}/${month}/${parts.year}, ${time}`;
}
