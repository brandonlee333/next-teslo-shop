export const POSTULACION_DOCUMENT_KEYS = [
  "asalariado_identidad",
  "asalariado_laborales",
  "asalariado_extractos",
  "independiente_identidad",
  "independiente_camara_comercio",
  "independiente_extractos",
  "pensionado_identidad",
  "pensionado_pension",
  "pensionado_extractos",
  "fiador_identidad",
  "fiador_libertad_tradicion",
  "fiador_extractos",
  "fiador_laborales",
] as const;

export type PostulacionDocumentKey = (typeof POSTULACION_DOCUMENT_KEYS)[number];
