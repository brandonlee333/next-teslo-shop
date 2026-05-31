import Link from "next/link";
import { titleFont } from "@/config/fonts";
import {
  IoCashOutline,
  IoDocumentTextOutline,
  IoShieldCheckmarkOutline,
  IoCalendarOutline,
  IoTimeOutline,
  IoCheckmarkOutline,
} from "react-icons/io5";

const WHATSAPP_NUMBER = "573000000000";
const WHATSAPP_VISIT_MESSAGE = encodeURIComponent(
  "Hola, me gustaría agendar una visita al apartamento en Candelaria La Nueva."
);
const agendarUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_VISIT_MESSAGE}`;
const ubicacionUrl =
  "https://www.google.com/maps/@4.5677556,-74.1497466,3a,75y,132.73h,90t/data=!3m7!1e1!3m5!1sMjyQHCPjkgmfv3d2J7Tgqg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3DMjyQHCPjkgmfv3d2J7Tgqg%26yaw%3D132.73!7i13312!8i6656?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D";

const documents = [
  "Certificados laborales de las personas que habitarán el apartamento",
  "Extractos bancarios de los últimos 2 meses",
];

export const GalleryInfoCards = () => {
  return (
    <div className="mt-2 space-y-4">
      <h3
        className={`${titleFont.className} text-base font-semibold text-gray-800 mb-1`}
      >
        Información importante
      </h3>

      {/* Canon */}
      <article className="rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50 to-white p-5 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-100">
            <IoCashOutline className="h-6 w-6 text-rose-600" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Canon</h4>
            <p className="mt-1 text-2xl font-bold text-rose-700">$1.050.000</p>
            <p className="mt-1 text-sm text-gray-500">sin servicios</p>
          </div>
        </div>
      </article>

      {/* Servicios compartidos */}
      <article className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-5 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100">
            <IoCashOutline className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Servicios compartidos</h4>
            <p className="mt-1 text-2xl font-bold text-amber-700">~ $180.000</p>
            <p className="mt-1 text-sm text-gray-500">Aproximado mensual (no incluidos en el canon)</p>
          </div>
        </div>
      </article>

      {/* Proceso de arrendamiento */}
      <article className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100">
            <IoShieldCheckmarkOutline className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">📄 Proceso de arrendamiento</h4>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              Se realiza mediante{" "}
              <strong className="text-blue-800">aseguradora</strong>{" "}
              <span className="text-gray-500">(no inmobiliaria)</span> y puede
              tardar entre{" "}
              <strong>2 y 3 días hábiles</strong> después de entregar la
              documentación.
            </p>
            <div className="mt-3 flex items-center gap-2 text-sm text-blue-700">
              <IoTimeOutline className="h-4 w-4 shrink-0" />
              <span>Trámite ágil una vez esté completa la documentación</span>
            </div>
          </div>
        </div>
      </article>

      {/* Documentos requeridos */}
      <article className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
            <IoDocumentTextOutline className="h-6 w-6 text-emerald-600" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-gray-900">📑 Documentos requeridos</h4>
            <ul className="mt-3 space-y-2.5">
              {documents.map((doc) => (
                <li key={doc} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                    <IoCheckmarkOutline className="h-3 w-3 text-emerald-600" />
                  </span>
                  <span className="leading-relaxed">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      {/* Visitas */}
      <article className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-5 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100">
            <IoCalendarOutline className="h-6 w-6 text-violet-600" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">📅 Visitas</h4>
            <ul className="mt-3 space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="font-semibold text-violet-800 shrink-0">Miércoles:</span>
                <span>6:00 pm a 8:00 pm</span>
              </li>
              <li className="flex flex-wrap items-baseline gap-x-1 gap-y-1">
                <span className="font-semibold text-violet-800">Sábados y domingos:</span>
                <span>con cita previa</span>
                <Link
                  href={agendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-violet-600 underline decoration-violet-300 underline-offset-2 hover:text-violet-800 transition-colors"
                >
                  (Agendar aquí)
                </Link>
              </li>
              <li className="flex flex-wrap items-baseline gap-x-1 gap-y-1">
                <span className="font-semibold text-violet-800">Dirección:</span>
                <span>KR 27 65 42 SUR</span>
                <Link
                  href={ubicacionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-violet-600 underline decoration-violet-300 underline-offset-2 hover:text-violet-800 transition-colors"
                >
                  (ver ubicación)
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </article>
    </div>
  );
};
