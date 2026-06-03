const NBSP_CHARS = /[\u00a0\u202f\u2007\u2060]/g;

/** Stable es-CO datetime string for SSR and client (avoids hydration mismatches). */
export function formatPostulacionDateTime(
  value: Date | string,
  options?: { dateStyle?: "medium" | "long" },
): string {
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: options?.dateStyle ?? "medium",
    timeStyle: "short",
    timeZone: "America/Bogota",
  })
    .format(new Date(value))
    .replace(NBSP_CHARS, " ");
}
