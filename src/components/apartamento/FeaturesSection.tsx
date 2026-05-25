import { titleFont } from "@/config/fonts";
import {
  IoBedOutline,
  IoShirtOutline,
  IoTvOutline,
  IoRestaurantOutline,
  IoFlameOutline,
  IoWaterOutline,
  IoSunnyOutline,
  IoPawOutline,
  IoCarSportOutline,
  IoBarbellOutline,
  IoLeafOutline,
  IoHappyOutline,
} from "react-icons/io5";
import { MdOutlineKitchen, MdOutlineLocalLaundryService } from "react-icons/md";

const features = [
  { icon: IoBedOutline, name: "2 Habitaciones Grandes", description: "Espacios amplios y cómodos" },
  { icon: IoShirtOutline, name: "Habitación con Clóset", description: "Almacenamiento integrado" },
  { icon: IoTvOutline, name: "Sala Amplia", description: "Espacio ideal para compartir" },
  { icon: MdOutlineKitchen, name: "Cocina Integral", description: "Grande y totalmente equipada" },
  { icon: IoRestaurantOutline, name: "Estufa Nueva", description: "Lista para estrenar" },
  { icon: IoWaterOutline, name: "Baño Grande", description: "Espacioso y funcional" },
  { icon: IoFlameOutline, name: "Calentador a Gas", description: "Agua caliente siempre disponible" },
  { icon: MdOutlineLocalLaundryService, name: "Zona de Lavandería", description: "Privada y exclusiva" },
  { icon: IoLeafOutline, name: "Terraza", description: "Espacio al aire libre" },
  { icon: IoBarbellOutline, name: "Zona para Asados", description: "Compartida con la casa" },
  { icon: IoCarSportOutline, name: "Espacio para Moto", description: "En el primer piso" },
  { icon: IoPawOutline, name: "Se Aceptan Mascotas", description: "Tu mascota es bienvenida" },
  { icon: IoHappyOutline, name: "Apto para Niños", description: "Seguro y familiar" },
  { icon: IoSunnyOutline, name: "Iluminación Natural", description: "Casi no necesitas luces de día" },
];

export const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-blue-600 text-sm font-semibold tracking-wider uppercase mb-2">
            Todo lo que necesitas
          </span>
          <h2 className={`${titleFont.className} text-3xl sm:text-4xl font-bold text-gray-900`}>
            Características del Apartamento
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map((feat) => (
            <div
              key={feat.name}
              className="group flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300"
            >
              <div className="flex-shrink-0 w-11 h-11 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <feat.icon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{feat.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{feat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
