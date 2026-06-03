import type { PostulacionDisplayStatus } from "@/lib/postulacion/completion-status";

const DISPLAY_STATUS_CONFIG: Record<
  PostulacionDisplayStatus,
  { label: string; detailLabel: string; className: string; title: string }
> = {
  incomplete_questions: {
    label: "Parcial",
    detailLabel: "Datos parciales",
    className: "bg-amber-100 text-amber-800",
    title: "Faltan preguntas del formulario por responder",
  },
  missing_documents: {
    label: "Faltan documentos",
    detailLabel: "Faltan documentos",
    className: "bg-orange-100 text-orange-800",
    title: "Respondió todas las preguntas, pero aún no ha subido documentos",
  },
  complete: {
    label: "Completa",
    detailLabel: "Datos completos",
    className: "bg-green-100 text-green-800",
    title: "Formulario y documentos completos",
  },
};

export function PostulacionDisplayStatusBadge({
  displayStatus,
  size = "sm",
}: {
  displayStatus: PostulacionDisplayStatus;
  size?: "sm" | "md";
}) {
  const config = DISPLAY_STATUS_CONFIG[displayStatus];
  const text = size === "md" ? config.detailLabel : config.label;

  return (
    <span
      className={`rounded-full font-medium ${config.className} ${
        size === "md" ? "px-3 py-1 text-sm" : "px-2.5 py-1 text-xs"
      }`}
      title={config.title}
    >
      {text}
    </span>
  );
}
