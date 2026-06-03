import { titleFont } from "@/config/fonts";
import { IoLocationOutline, IoResizeOutline, IoBedOutline, IoLayersOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "573214722567";
const WHATSAPP_MESSAGE = encodeURIComponent("Hola, estoy interesado en el apartamento en Candelaria La Nueva. Me gustaría agendar una visita.");

export const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden -mx-0 sm:-mx-10">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920&q=80')] bg-cover bg-center opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        {/* Location badge */}
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-6">
          <IoLocationOutline className="w-4 h-4 text-blue-300" />
          <span className="text-sm font-medium tracking-wide">Candelaria La Nueva &middot; Estrato 2</span>
        </div>

        <h1 className={`${titleFont.className} text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4`}>
          Hermoso Apartamento
          <br />
          <span className="text-blue-300">en Arriendo</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Amplio, iluminado y recién remodelado. Tu nuevo hogar en una ubicación privilegiada de Bogotá.
        </p>

        {/* Quick stats */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-10">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3">
            <IoResizeOutline className="w-5 h-5 text-blue-300" />
            <span className="font-semibold">54 m²</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3">
            <IoBedOutline className="w-5 h-5 text-blue-300" />
            <span className="font-semibold">2 Habitaciones</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3">
            <IoLayersOutline className="w-5 h-5 text-blue-300" />
            <span className="font-semibold">2do Piso</span>
          </div>
        </div>

        {/* CTA */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all hover:scale-105 shadow-lg shadow-green-500/30"
        >
          <FaWhatsapp className="w-6 h-6" />
          Agendar Visita
        </a>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};
