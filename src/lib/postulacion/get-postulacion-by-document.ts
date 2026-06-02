import prisma from "@/lib/prisma";

export async function getPostulacionByDocument(documentId: string) {
  const user = await prisma.user.findUnique({
    where: { documentId },
    include: {
      postulacionApplication: {
        include: { documents: true },
      },
    },
  });

  if (!user?.postulacionApplication) {
    return null;
  }

  const { postulacionApplication: application } = user;

  const documentsByCategory = application.documents.reduce<
    Record<
      string,
      {
        url: string;
        originalName: string;
        format: string;
        size: number;
      }[]
    >
  >((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push({
      url: doc.url,
      originalName: doc.originalName,
      format: doc.format,
      size: doc.size,
    });
    return acc;
  }, {});

  return {
    occupantCount: application.occupantCount,
    occupantAges: application.occupantAges ?? "",
    titularNames: application.titularNames ?? "",
    titularEmails: application.titularEmails ?? "",
    currentResidence: application.currentResidence ?? "",
    previousRent: application.previousRent ?? "",
    moveReason: application.moveReason ?? "",
    pets: application.pets ?? "",
    vehicleParking: application.vehicleParking ?? "",
    documentsByCategory,
  };
}
