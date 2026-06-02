import type { Metadata } from "next";
import Link from "next/link";

type FAQItem = {
  question: string;
  answer: string | string[];
};

type FAQSection = {
  title: string;
  icon: string;
  items: FAQItem[];
};

const faqSections: FAQSection[] = [
  {
    title: "Precio y pagos",
    icon: "💰",
    items: [
      { question: "¿Cuánto vale el arriendo?", answer: "$1.050.000 mensuales." },
      {
        question: "¿La administración está incluida?",
        answer: "No aplica. El inmueble no tiene cobro de administración.",
      },
      {
        question: "¿Cuánto cuestan los servicios aproximadamente?",
        answer: ["Agua: $50.000", "Aseo: $80.000", "Luz: $35.000", "Gas: $15.000"],
      },
      { question: "¿Piden depósito?", answer: "Sí. Se solicita un depósito de $300.000." },
      { question: "¿Cuánto vale el contrato?", answer: "No tiene costo para el arrendatario." },
      { question: "¿Piden estudio?", answer: "Sí. La aprobación se realiza mediante aseguradora." },
      { question: "¿Hay que pagar póliza?", answer: "No. El propietario asume el costo de la póliza." },
      {
        question: "¿Con qué aseguradoras trabajan?",
        answer:
          "Inicialmente se realiza la validación con SURA. Si la solicitud no es aprobada, puede realizarse una segunda validación con SBS.",
      },
      { question: "¿Reciben subsidio de arriendo?", answer: "No." },
      {
        question: "¿El canon es negociable?",
        answer: "No. El valor publicado corresponde al precio final del arriendo.",
      },
      {
        question: "¿Cuánto sube el arriendo cada año?",
        answer: "De acuerdo con la normatividad vigente para vivienda urbana.",
      },
      {
        question: "¿Qué incluye exactamente el precio?",
        answer:
          "Apartamento completo, entrada independiente, zona de lavandería privada, acceso a terraza y espacio para guardar una moto.",
      },
      { question: "¿Se paga por adelantado?", answer: "Sí, según las condiciones establecidas en el contrato." },
      {
        question: "¿Cómo se paga?",
        answer: "Transferencia bancaria, Nequi o Daviplata. No se reciben pagos en efectivo.",
      },
      {
        question: "¿Piden fiador o codeudor?",
        answer:
          "No siempre. La aprobación depende de la evaluación realizada por la aseguradora. En algunos casos puede solicitarse uno o más codeudores.",
      },
      {
        question: "¿Aceptan ingresos informales?",
        answer: "Sí, siempre que puedan presentar la documentación requerida por la aseguradora.",
      },
      {
        question: "¿Aceptan independientes?",
        answer: "Sí, siempre que cumplan con los requisitos documentales exigidos por la aseguradora.",
      },
      {
        question: "¿Qué requisitos piden?",
        answer: [
          "EMPLEADOS:",
          "• Formulario de solicitud.",
          "• Documento de identidad.",
          "• Extractos bancarios de los últimos 3 meses.",
          "• Certificado laboral reciente y/o desprendibles de nómina.",
          "• Declaración de renta si aplica.",
          "",
          "INDEPENDIENTES:",
          "• Formulario de solicitud.",
          "• Documento de identidad.",
          "• Extractos bancarios de los últimos 3 meses.",
          "• Cámara de Comercio (si aplica).",
          "• Estados financieros (si aplica).",
          "• Declaración de renta si aplica.",
        ],
      },
      { question: "¿Piden extractos bancarios?", answer: "Sí, de los últimos 3 meses." },
      { question: "¿Piden carta laboral?", answer: "Sí, para empleados." },
      { question: "¿Cuánto tiempo mínimo es el contrato?", answer: "1 año." },
    ],
  },
  {
    title: "Ubicación",
    icon: "📍",
    items: [
      { question: "¿En qué barrio queda?", answer: "Candelaria La Nueva (Estrato 2)." },
      { question: "¿Qué tan seguro es el sector?", answer: "Es un sector residencial tradicional." },
      {
        question: "¿Qué transporte hay cerca?",
        answer: "SITP, alimentadores y acceso cercano a la Avenida Villavicencio.",
      },
      { question: "¿Queda cerca de TransMilenio/SITP?", answer: "Sí, cuenta con fácil acceso a SITP y alimentadores." },
      { question: "¿Hay supermercados cerca?", answer: "Sí." },
      { question: "¿Hay colegios cerca?", answer: "Sí. A dos cuadras del Colegio Rodrigo Lara Bonilla Sede B." },
      { question: "¿Cómo es la zona de noche?", answer: "Es una zona principalmente residencial." },
      { question: "¿La calle es tranquila?", answer: "Sí." },
      { question: "¿Se escucha mucho ruido?", answer: "No." },
      { question: "¿Hay parques cerca?", answer: "Sí." },
      {
        question: "¿Qué tan lejos queda del comercio?",
        answer: "Cuenta con comercio de barrio, tiendas y servicios cercanos.",
      },
      { question: "¿Cómo es el tráfico en la zona?", answer: "Normal para el sector." },
      { question: "¿Se inunda cuando llueve?", answer: "No se han presentado problemas de inundación." },
      { question: "¿Hay tiendas o droguerías cerca?", answer: "Sí." },
    ],
  },
  {
    title: "Sobre el apartamento",
    icon: "🏠",
    items: [
      { question: "¿Cuántos metros tiene?", answer: "54 m²." },
      { question: "¿Cuántas habitaciones tiene?", answer: "2 habitaciones amplias." },
      { question: "¿Cuántos baños tiene?", answer: "1 baño amplio." },
      { question: "¿Tiene sala comedor?", answer: "Sí." },
      { question: "¿Tiene patio?", answer: "No." },
      { question: "¿Tiene balcón?", answer: "No." },
      { question: "¿Tiene terraza?", answer: "Sí." },
      { question: "¿Tiene estudio?", answer: "No." },
      { question: "¿Tiene calentador?", answer: "Sí, calentador a gas." },
      {
        question: "¿La cocina es integral?",
        answer: "Sí. Cocina integral amplia con estufa nueva lista para estrenar.",
      },
      { question: "¿Tiene gas natural?", answer: "Sí." },
      { question: "¿Tiene zona de lavandería?", answer: "Sí, privada." },
      { question: "¿Tiene buena iluminación?", answer: "Sí. Durante el día normalmente no es necesario encender luces." },
      { question: "¿Le entra mucho sol?", answer: "Sí." },
      { question: "¿Es fresco o caliente?", answer: "Cuenta con buena ventilación e iluminación natural." },
      { question: "¿Qué piso es?", answer: "Segundo piso." },
      { question: "¿Tiene ascensor?", answer: "No." },
      { question: "¿Está remodelado?", answer: "Sí." },
      { question: "¿Hace cuánto lo remodelaron?", answer: "Recientemente." },
      { question: "¿Está recién pintado?", answer: "Sí." },
      { question: "¿Las habitaciones tienen clóset?", answer: "Una habitación cuenta con clóset." },
      {
        question: "¿El baño tiene división?",
        answer: "Actualmente tiene cortina. Próximamente se instalará división en vidrio.",
      },
      { question: "¿La presión del agua es buena?", answer: "Sí." },
      { question: "¿Tiene tanque de agua?", answer: "Sí." },
      { question: "¿Cómo está el internet en la zona?", answer: "La zona cuenta con cobertura de los principales operadores." },
      { question: "¿Tiene citófono?", answer: "No." },
      { question: "¿Tiene cortinas?", answer: "No." },
      { question: "¿Se entrega amoblado?", answer: "No." },
      { question: "¿Tiene muebles incluidos?", answer: "No." },
      { question: "¿Tiene instalación para lavadora?", answer: "Sí." },
      { question: "¿Tiene buena señal de celular?", answer: "Sí." },
      {
        question: "¿Aceptan mascotas?",
        answer:
          "Sí, siempre que estén bien educadas y no afecten la convivencia del inmueble. Los propietarios serán responsables de evitar ruidos excesivos, daños o cualquier comportamiento que altere la tranquilidad y el descanso de los demás residentes.",
      },
      {
        question: "¿Se puede fumar?",
        answer: "No dentro del apartamento. Eventualmente podría hacerse uso de la terraza respetando la convivencia.",
      },
      { question: "¿Se pueden hacer modificaciones?", answer: "No sin autorización previa del propietario." },
    ],
  },
  {
    title: "Parqueadero y movilidad",
    icon: "🚗",
    items: [
      { question: "¿Tiene parqueadero?", answer: "No cuenta con parqueadero para carro." },
      {
        question: "¿Dónde puedo dejar el carro?",
        answer:
          "Es posible dejar el vehículo frente al inmueble bajo la exclusiva responsabilidad del propietario del vehículo. Para mayor seguridad se recomienda utilizar un parqueadero del sector.",
      },
      { question: "¿El parqueadero es privado o comunal?", answer: "No aplica." },
      { question: "¿Cabe camioneta?", answer: "No cuenta con espacio privado para vehículos." },
      { question: "¿Tiene parqueadero para moto?", answer: "Sí. Cuenta con espacio para guardar una moto." },
      { question: "¿Se puede guardar bicicleta?", answer: "Sí." },
      { question: "¿El parqueadero para moto tiene costo adicional?", answer: "No." },
      { question: "¿Hay parqueaderos cerca?", answer: "Sí, existen opciones en el sector." },
      { question: "¿Es fácil conseguir transporte?", answer: "Sí." },
    ],
  },
  {
    title: "Seguridad",
    icon: "🔐",
    items: [
      { question: "¿Tiene portería?", answer: "No." },
      { question: "¿Hay vigilancia?", answer: "No." },
      { question: "¿Tiene cámaras?", answer: "No." },
      { question: "¿La zona es segura?", answer: "Sí, es una zona residencial tradicional." },
      { question: "¿Han robado por ahí?", answer: "No se tiene conocimiento de situaciones relevantes recientes." },
      { question: "¿Tiene rejas?", answer: "Sí, el acceso principal cuenta con medidas de seguridad." },
      { question: "¿Cómo son los vecinos?", answer: "Familias y residentes de larga permanencia." },
      { question: "¿Quién vive en la casa?", answer: "En el primer piso viven otros inquilinos." },
      { question: "¿Hay problemas de ruido?", answer: "No." },
      { question: "¿Es familiar el ambiente?", answer: "Sí." },
    ],
  },
  {
    title: "Servicios y administración",
    icon: "🧾",
    items: [
      { question: "¿Los servicios son independientes?", answer: "No. Son compartidos." },
      {
        question: "¿Cuánto llega de agua, luz y gas?",
        answer: ["Agua: $50.000", "Aseo: $80.000", "Luz: $35.000", "Gas: $15.000"],
      },
      { question: "¿Tiene contador independiente?", answer: "No." },
      { question: "¿Incluye internet?", answer: "No." },
      { question: "¿La administración qué cubre?", answer: "No aplica." },
      { question: "¿Hay cortes frecuentes de agua o luz?", answer: "No." },
      { question: "¿El agua es constante?", answer: "Sí." },
      { question: "¿Hay buen servicio de basura?", answer: "Sí." },
      { question: "¿Qué días pasa la basura?", answer: "Según programación de la empresa de aseo del sector." },
    ],
  },
  {
    title: "Disponibilidad",
    icon: "📅",
    items: [
      { question: "¿Está disponible ya?", answer: "Sí." },
      { question: "¿Desde cuándo se puede ocupar?", answer: "Una vez aprobado el proceso con la aseguradora." },
      { question: "¿Cuándo se puede ver?", answer: "Miércoles, sábados y domingos." },
      {
        question: "¿A qué horas lo muestran?",
        answer: ["Miércoles de 6:00 p.m. a 8:00 p.m.", "Sábados y domingos con cita previa."],
      },
      { question: "¿Hay más personas interesadas?", answer: "Sí, hay consultas activas." },
      { question: "¿Cuánto tiempo llevan publicándolo?", answer: "Recientemente publicado." },
      { question: "¿Lo entregan inmediatamente?", answer: "Sí, una vez finalice el proceso." },
      {
        question: "¿Cuál es el proceso para tomarlo?",
        answer: [
          "1. Visita al inmueble.",
          "2. Entrega de documentos.",
          "3. Validación con SURA.",
          "4. Si es necesario, validación con SBS.",
          "5. Firma del contrato.",
          "6. Entrega del apartamento.",
        ],
      },
    ],
  },
  {
    title: "Convivencia",
    icon: "👨‍👩‍👧",
    items: [
      { question: "¿Aceptan niños?", answer: "Sí." },
      { question: "¿Aceptan mascotas?", answer: "Sí, bajo las condiciones de convivencia descritas anteriormente." },
      {
        question: "¿Cuántas personas pueden vivir?",
        answer:
          "Aunque el apartamento puede alojar varias personas, el perfil ideal es una familia pequeña (por ejemplo: padre, madre e hijo(s)), que busque estabilidad, tranquilidad y buena convivencia.",
      },
      { question: "¿Se permiten reuniones?", answer: "Sí, respetando la convivencia y el descanso de los vecinos." },
      { question: "¿Hay restricciones de ruido?", answer: "Sí. Debe respetarse la tranquilidad de los demás residentes." },
      { question: "¿Cómo son los vecinos?", answer: "Familias y residentes tranquilos." },
      { question: "¿Viven los dueños en la misma casa?", answer: "No." },
      { question: "¿Hay reglas especiales?", answer: "Mantener el buen estado del inmueble y respetar las normas básicas de convivencia." },
    ],
  },
  {
    title: "Preguntas frecuentes adicionales",
    icon: "⚠️",
    items: [
      { question: "¿Por qué lo están arrendando?", answer: "Porque es un apartamento nuevo y listo para estrenar." },
      { question: "¿Por qué se fue el anterior inquilino?", answer: "No ha tenido inquilinos anteriormente." },
      { question: "¿Tiene humedades?", answer: "No." },
      { question: "¿Ha tenido problemas de inseguridad?", answer: "No." },
      { question: "¿Hay problemas con vecinos?", answer: "No." },
      { question: "¿Hay problemas de agua?", answer: "No." },
      { question: "¿Hay deudas pendientes?", answer: "No." },
      { question: "¿El sector es peligroso?", answer: "No. Es un sector residencial tradicional." },
      { question: "¿Se escuchan fiestas o bares?", answer: "No." },
      { question: "¿Ha tenido problemas eléctricos?", answer: "No." },
      { question: "¿Le da mucho sol o mucha humedad?", answer: "Tiene excelente iluminación natural y no presenta humedad." },
      { question: "¿Qué tan fría es la zona?", answer: "Clima típico de Bogotá." },
      {
        question: "¿Hay problemas de parqueo?",
        answer:
          "Para carro puede ser necesario utilizar parqueaderos cercanos o estacionar frente al inmueble bajo responsabilidad del propietario del vehículo. Para moto sí existe espacio dentro del inmueble.",
      },
    ],
  },
];

export const metadata: Metadata = {
  title: "Preguntas Frecuentes - Apartamento en Arriendo",
  description:
    "Respuestas detalladas sobre pagos, requisitos, ubicación, servicios, convivencia y disponibilidad del apartamento en arriendo.",
};

export default function PreguntasFrecuentesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-8 sm:py-14">
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-xl sm:p-10">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Apartamento en arriendo</p>
        <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
          PREGUNTAS FRECUENTES
        </h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-200 sm:text-base">
          Toda la informacion clave en un solo lugar: precio, requisitos, condiciones, ubicacion, disponibilidad y convivencia.
        </p>

        <div className="mt-6">
          <Link
            href="/apartamento"
            className="inline-flex items-center rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            Volver al anuncio
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-6">
        {faqSections.map((section) => (
          <section
            key={section.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
          >
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              <span className="mr-2" aria-hidden>
                {section.icon}
              </span>
              {section.title.toUpperCase()}
            </h2>

            <div className="mt-5 grid gap-4">
              {section.items.map((item) => (
                <article key={item.question} className="rounded-xl bg-slate-50 p-4">
                  <h3 className="text-base font-semibold text-slate-900">{item.question}</h3>
                  {Array.isArray(item.answer) ? (
                    <ul className="mt-2 space-y-1 text-sm leading-relaxed text-slate-700 sm:text-base">
                      {item.answer.map((line, index) => (
                        <li key={`${item.question}-${index}`}>{line || "\u00A0"}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                      {item.answer}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
