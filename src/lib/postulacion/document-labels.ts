import {
  POSTULACION_DOCUMENT_KEYS,
  type PostulacionDocumentKey,
} from "@/lib/postulacion/document-keys";

export const POSTULACION_DOCUMENT_LABELS: Record<
  PostulacionDocumentKey,
  string
> = {
  asalariado_identidad: "Asalariado — Documentos de identidad",
  asalariado_laborales: "Asalariado — Certificados laborales",
  asalariado_extractos: "Asalariado — Extractos bancarios",
  independiente_identidad: "Independiente — Documentos de identidad",
  independiente_camara_comercio:
    "Independiente — Certificado Cámara de Comercio",
  independiente_extractos: "Independiente — Extractos bancarios",
  pensionado_identidad: "Pensionado — Documentos de identidad",
  pensionado_pension: "Pensionado — Certificado o colilla de pensión",
  pensionado_extractos: "Pensionado — Extractos bancarios",
  fiador_identidad: "Fiador — Documentos de identidad",
  fiador_libertad_tradicion: "Fiador — Libertad y tradición",
  fiador_extractos: "Fiador — Extractos bancarios",
  fiador_laborales: "Fiador — Certificados laborales",
};

export function getDocumentLabel(key: string): string {
  if (key in POSTULACION_DOCUMENT_LABELS) {
    return POSTULACION_DOCUMENT_LABELS[key as PostulacionDocumentKey];
  }
  return key;
}

export function orderedDocumentKeysWithFiles(
  documentsByCategory: Record<string, { url: string }[]>,
): PostulacionDocumentKey[] {
  return POSTULACION_DOCUMENT_KEYS.filter(
    (key) => (documentsByCategory[key]?.length ?? 0) > 0,
  );
}
