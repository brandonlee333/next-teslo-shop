import { titleFont } from "@/config/fonts";
import {
  IoFlameOutline,
  IoLeafOutline,
  IoCarSportOutline,
  IoSunnyOutline,
} from "react-icons/io5";
import { MdOutlineLocalLaundryService, MdOutdoorGrill } from "react-icons/md";

const services = [
  {
    icon: IoFlameOutline,
    name: "Calentador a Gas",
    description: "Agua caliente las 24 horas del día para tu comodidad.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: MdOutlineLocalLaundryService,
    name: "Zona de Lavandería Privada",
    description: "Espacio exclusivo para lavar y secar tu ropa.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: IoLeafOutline,
    name: "Terraza",
    description: "Espacio al aire libre para descansar y disfrutar.",
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    icon: MdOutdoorGrill,
    name: "Zona para Asados",
    description: "Área compartida para reuniones y parrilladas.",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: IoCarSportOutline,
    name: "Espacio para Moto",
    description: "Área segura en el primer piso para guardar tu moto.",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    icon: IoSunnyOutline,
    name: "Iluminación Natural",
    description: "Durante el día prácticamente no necesitas prender luces.",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
];

export const ServicesSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-blue-600 text-sm font-semibold tracking-wider uppercase mb-2">
            Comodidad y bienestar
          </span>
          <h2 className={`${titleFont.className} text-3xl sm:text-4xl font-bold text-gray-900`}>
            Servicios Incluidos
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.name}
              className="group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`${svc.bg} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <svc.icon className={`w-7 h-7 ${svc.color}`} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{svc.name}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{svc.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
