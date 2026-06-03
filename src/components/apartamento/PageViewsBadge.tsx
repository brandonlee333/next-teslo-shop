import { IoEyeOutline } from "react-icons/io5";

interface Props {
  count: number;
}

export function PageViewsBadge({ count }: Props) {
  const formatted = new Intl.NumberFormat("es-CO").format(count);

  return (
    <p className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
      <IoEyeOutline className="h-4 w-4 shrink-0" aria-hidden />
      <span>
        {formatted} {count === 1 ? "visita" : "visitas"}
      </span>
    </p>
  );
}
