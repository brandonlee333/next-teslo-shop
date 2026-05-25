import { titleFont } from "@/config/fonts";
import {
  IoLocationOutline,
  IoBusOutline,
  IoSchoolOutline,
  IoMapOutline,
} from "react-icons/io5";

const landmarks = [
  {
    icon: IoSchoolOutline,
    name: "Colegio Rodrigo Lara Bonilla Sede B",
    detail: "A solo 2 cuadras",
  },
  {
    icon: IoMapOutline,
    name: "Avenida Villavicencio",
    detail: "Acceso cercano",
  },
  {
    icon: IoBusOutline,
    name: "Rutas SITP",
    detail: "Transporte público cercano",
  },
  {
    icon: IoBusOutline,
    name: "Alimentador TransMilenio",
    detail: "Conexión rápida al sistema",
  },
];

export const LocationSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-blue-600 text-sm font-semibold tracking-wider uppercase mb-2">
            Excelente ubicación
          </span>
          <h2 className={`${titleFont.className} text-3xl sm:text-4xl font-bold text-gray-900`}>
            Ubicación y Transporte
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 min-h-[350px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.1!2d-74.14!3d4.58!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMzQnNDguMCJOIDc0wrAwOCcyNC4wIlc!5e0!3m2!1ses!2sco!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 350 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación del apartamento en Candelaria La Nueva"
            />
          </div>

          {/* Landmarks */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <IoLocationOutline className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Candelaria La Nueva</h3>
                <p className="text-sm text-gray-500">Bogotá D.C. &middot; Estrato 2</p>
              </div>
            </div>

            <div className="space-y-4">
              {landmarks.map((lm) => (
                <div
                  key={lm.name}
                  className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <lm.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{lm.name}</h4>
                    <p className="text-xs text-gray-500">{lm.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
