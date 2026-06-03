"use client";

import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "573214722567";
const WHATSAPP_MESSAGE = encodeURIComponent("Hola, estoy interesado en el apartamento en Candelaria La Nueva.");

export const WhatsAppButton = () => {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 transition-all hover:scale-110 animate-bounce"
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp className="w-8 h-8" />
    </a>
  );
};
