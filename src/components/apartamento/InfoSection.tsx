import { titleFont } from "@/config/fonts";
import {
  IoCashOutline,
  IoResizeOutline,
  IoLayersOutline,
  IoPeopleOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

const infoCards = [
  {
    icon: IoCashOutline,
    label: "Canon mensual",
    value: "$1.050.000",
    detail: "Sin servicios incluidos",
    accent: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: IoResizeOutline,
    label: "Área",
    value: "54 m²",
    detail: "Amplio e iluminado",
    accent: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: IoLayersOutline,
    label: "Piso",
    value: "2do Piso",
    detail: "Totalmente independiente",
    accent: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: IoPeopleOutline,
    label: "Capacidad",
    value: "5 - 6 personas",
    detail: "Ideal para familias",
    accent: "text-orange-600",
    bg: "bg-orange-50",
  },
];

export const InfoSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`${titleFont.className} text-3xl sm:text-4xl font-bold text-gray-900 mb-3`}>
            Información Principal
          </h2>
          <div className="flex items-center justify-center gap-2 text-green-600">
            <IoCheckmarkCircleOutline className="w-5 h-5" />
            <span className="text-sm font-medium">Recién remodelado y pintado</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {infoCards.map((card) => (
            <div
              key={card.label}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`${card.bg} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <card.icon className={`w-7 h-7 ${card.accent}`} />
              </div>
              <p className="text-sm text-gray-500 mb-1">{card.label}</p>
              <p className={`text-2xl font-bold ${card.accent}`}>{card.value}</p>
              <p className="text-sm text-gray-400 mt-1">{card.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
