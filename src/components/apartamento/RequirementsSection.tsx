import { titleFont } from "@/config/fonts";
import {
  IoDocumentTextOutline,
  IoTimeOutline,
  IoShieldCheckmarkOutline,
  IoCheckmarkOutline,
} from "react-icons/io5";

const documents = [
  "Certificados laborales de las personas que habitarán el apartamento",
  "Extractos bancarios de los últimos 2 meses",
];

export const RequirementsSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-blue-600 text-sm font-semibold tracking-wider uppercase mb-2">
            Proceso sencillo
          </span>
          <h2 className={`${titleFont.className} text-3xl sm:text-4xl font-bold text-gray-900`}>
            Requisitos de Arrendamiento
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Process card */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <IoShieldCheckmarkOutline className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Proceso</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <IoShieldCheckmarkOutline className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 text-sm leading-relaxed">
                  El arrendamiento se realiza mediante <strong>aseguradora</strong> para tu tranquilidad y seguridad.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <IoTimeOutline className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 text-sm leading-relaxed">
                  El proceso puede tardar entre <strong>2 y 3 días hábiles</strong> después de entregar la documentación completa.
                </p>
              </div>
            </div>
          </div>

          {/* Documents card */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <IoDocumentTextOutline className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Documentos Requeridos</h3>
            </div>
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <IoCheckmarkOutline className="w-3 h-3 text-green-600" />
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{doc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
