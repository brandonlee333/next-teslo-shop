"use client";

import type { AdminPostulacionRow } from "@/actions/postulacion/get-postulaciones-admin";

interface Props {
  postulaciones: AdminPostulacionRow[];
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export const PostulacionesTable = ({ postulaciones }: Props) => {
  if (postulaciones.length === 0) {
    return (
      <p className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-6 text-sm text-gray-600">
        Aún no hay postulaciones con datos guardados (completos o parciales).
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="border-b bg-gray-200">
          <tr>
            <th
              scope="col"
              className="px-6 py-4 text-left text-sm font-medium text-gray-900"
            >
              #
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-sm font-medium text-gray-900"
            >
              Ingreso
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-sm font-medium text-gray-900"
            >
              Documento
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-sm font-medium text-gray-900"
            >
              Titular(es)
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-sm font-medium text-gray-900"
            >
              Correo
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-sm font-medium text-gray-900"
            >
              Estado
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-sm font-medium text-gray-900"
            >
              Preguntas
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-sm font-medium text-gray-900"
            >
              Documentos
            </th>
            <th
              scope="col"
              className="px-6 py-4 text-left text-sm font-medium text-gray-900"
            >
              Última actualización
            </th>
          </tr>
        </thead>
        <tbody>
          {postulaciones.map((row, index) => (
            <tr
              key={row.id}
              className="border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100"
            >
              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                {index + 1}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                {formatDate(row.createdAt)}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                {row.documentId}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {row.titularNames?.trim() || "—"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {row.titularEmails?.trim() || "—"}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm">
                {row.status === "complete" ? (
                  <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
                    Completa
                  </span>
                ) : (
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
                    Parcial
                  </span>
                )}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                {row.filledFields}/{row.totalFields}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                {row.documentCount}
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                {formatDate(row.updatedAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
