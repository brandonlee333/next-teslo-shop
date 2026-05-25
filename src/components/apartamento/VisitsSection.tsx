import { titleFont } from "@/config/fonts";
import { IoCalendarOutline, IoTimeOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "573000000000";
const WHATSAPP_MESSAGE = encodeURIComponent("Hola, me gustaría agendar una visita al apartamento en Candelaria La Nueva.");

const schedules = [
  {
    day: "Miércoles",
    time: "6:00 pm - 8:00 pm",
    note: "Sin cita previa",
    available: true,
  },
  {
    day: "Sábados",
    time: "Con cita previa",
    note: "Contactar por WhatsApp",
    available: true,
  },
  {
    day: "Domingos",
    time: "Con cita previa",
    note: "Contactar por WhatsApp",
    available: true,
  },
];

export const VisitsSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-blue-600 text-sm font-semibold tracking-wider uppercase mb-2">
            Te esperamos
          </span>
          <h2 className={`${titleFont.className} text-3xl sm:text-4xl font-bold text-gray-900`}>
            Horarios de Visita
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {schedules.map((sch) => (
            <div
              key={sch.day}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <IoCalendarOutline className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{sch.day}</h3>
              <div className="flex items-center justify-center gap-2 text-gray-600 mb-1">
                <IoTimeOutline className="w-4 h-4" />
                <span className="text-sm font-medium">{sch.time}</span>
              </div>
              <p className="text-xs text-gray-400">{sch.note}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all hover:scale-105 shadow-lg shadow-green-500/30"
          >
            <FaWhatsapp className="w-6 h-6" />
            Agendar tu Visita por WhatsApp
          </a>
          <p className="text-sm text-gray-400 mt-4">Respuesta rápida garantizada</p>
        </div>
      </div>
    </section>
  );
};
