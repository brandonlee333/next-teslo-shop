import { titleFont } from "@/config/fonts";

const caracteristicas = [
  "54 m² – apartamento amplio y muy iluminado",
  "Segundo piso totalmente independiente (entrada independiente)",
  "Recién remodelado y pintado",
  "2 habitaciones grandes",
  "1 habitación con clóset",
  "Sala amplia",
  "Cocina grande totalmente integral",
  "Estufa nueva lista para estrenar",
  "1 baño grande",
  "Calentador a gas",
  "Zona de lavandería privada",
  "Terraza",
  "Zona para asados compartida",
  "Espacio en primer piso para guardar moto",
  "Apto para familias con niños",
];

export const ApartamentoResumen = () => {
  return (
    <section className="max-w-2xl mx-auto px-5 py-10 sm:py-14">
      <h1
        className={`${titleFont.className} text-2xl sm:text-3xl font-bold text-gray-900 leading-snug text-center mb-6`}
      >
        🏡 HERMOSO APARTAMENTO EN ARRIENDO – CANDELARIA LA NUEVA 🏡
      </h1>

      <p className="text-gray-600 text-base sm:text-lg leading-relaxed text-center mb-10">
        📍 Ubicado en el barrio Candelaria La Nueva (Estrato 2), a solo 2
        cuadras del Colegio Rodrigo Lara Bonilla Sede B y cerca de Avenida
        Villavicencio, rutas SITP y alimentador.
      </p>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          ✨ Características del apartamento:
        </h2>

        <ul className="space-y-2.5">
          {caracteristicas.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-gray-700">
              <span className="text-green-600 font-medium shrink-0 mt-0.5">✔</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-gray-600 italic">
          💡 Excelente iluminación natural
        </p>
      </div>
    </section>
  );
};
