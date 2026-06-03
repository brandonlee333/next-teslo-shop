export const POSTULACION_TERMINOS_PATH =
  "/apartamento/postularse/terminos-y-condiciones";

export type TerminosSection = {
  title: string;
  paragraphs: string[];
  list?: string[];
};

export const POSTULACION_TERMINOS_SECTIONS: TerminosSection[] = [
  {
    title: "1. Identificación del responsable",
    paragraphs: [
      "El responsable del tratamiento de los datos personales que usted suministra a través de este sitio es el propietario o administrador del inmueble en arriendo (en adelante, «nosotros» o «el Arrendador»), quien actúa como responsable o encargado del tratamiento según corresponda, para los fines descritos en el presente documento.",
      "Para ejercer sus derechos o realizar consultas sobre el tratamiento de datos, podrá contactarnos por los canales indicados al finalizar su postulación o en las comunicaciones que reciba durante el proceso.",
    ],
  },
  {
    title: "2. Objeto y alcance",
    paragraphs: [
      "Al utilizar el formulario de postulación y enviar su documentación, usted declara haber leído, entendido y aceptado estos Términos y Condiciones y la Política de Tratamiento de Datos Personales aquí descrita.",
      "Este proceso tiene por finalidad evaluar su perfil como posible arrendatario del inmueble ofrecido, incluyendo —de ser necesario— la gestión ante aseguradoras o entidades de estudio de riesgo vinculadas al arrendamiento.",
    ],
  },
  {
    title: "3. Datos que usted autoriza a suministrar",
    paragraphs: [
      "Usted podrá proporcionar, entre otros, los siguientes datos e información:",
    ],
    list: [
      "Datos de identificación (documento de identidad, nombres).",
      "Datos de contacto (correo electrónico, información de titulares).",
      "Información sobre composición del hogar, vivienda actual, motivos de mudanza y condiciones del arriendo solicitado.",
      "Documentos soporte en formato digital (identidad, certificados laborales, extractos bancarios, documentos de fiador o codeudor, y demás que el formulario solicite).",
    ],
  },
  {
    title: "4. Finalidad del tratamiento",
    paragraphs: [
      "Sus datos personales y documentos serán utilizados de manera exclusiva para fines relacionados con la postulación y evaluación del arrendamiento, en particular:",
    ],
    list: [
      "Verificar la información declarada en el formulario.",
      "Analizar su perfil de riesgo y capacidad de pago en el marco del estudio de arrendamiento.",
      "Compartir información con aseguradoras o terceros estrictamente necesarios para el estudio, aprobación o formalización del arriendo, cuando ello sea requerido.",
      "Gestionar la comunicación sobre el estado de su postulación (en proceso, aprobada o descartada).",
      "Cumplir obligaciones legales aplicables al arrendamiento de inmuebles en Colombia.",
    ],
  },
  {
    title: "5. Principios y compromiso de uso (Ley 1581 de 2012)",
    paragraphs: [
      "Tratamos sus datos conforme a los principios de legalidad, finalidad, libertad, veracidad, transparencia, acceso y circulación restringida, seguridad y confidencialidad previstos en la Ley 1581 de 2012 y normas complementarias sobre protección de datos personales (habeas data).",
      "Nos comprometemos a no hacer un uso indebido, comercial no autorizado ni divulgación pública de su información. No venderemos sus datos ni los utilizaremos para finalidades distintas a las descritas, salvo autorización expresa suya o mandato legal.",
      "Implementamos medidas razonables de seguridad digital y organizativas para proteger la información frente a accesos no autorizados, pérdida o alteración.",
    ],
  },
  {
    title: "6. Veracidad de la información",
    paragraphs: [
      "Usted declara que la información y los documentos cargados son veraces, completos y corresponden a su situación real. La entrega de información falsa o adulterada puede ser causal de rechazo de la postulación y de las acciones legales a que haya lugar.",
    ],
  },
  {
    title: "7. Derecho de admisión y decisión sobre la postulación",
    paragraphs: [
      "La aceptación de estos términos no implica obligación de arrendar el inmueble ni de aprobar su solicitud. Nos reservamos el derecho de admisión y la facultad de aprobar, rechazar o descartar postulaciones, así como de solicitar información adicional, de acuerdo con criterios objetivos de estudio de riesgo, disponibilidad del inmueble y políticas internas del arrendamiento.",
      "Las decisiones podrán basarse en resultados de estudio de perfil, validación documental, referencias o respuesta de aseguradoras, sin que ello constituya discriminación prohibida por la ley.",
    ],
  },
  {
    title: "8. Autorización y consentimiento",
    paragraphs: [
      "Al marcar la casilla de aceptación y enviar su documentación, usted otorga de manera libre, previa, expresa e informada su autorización para el tratamiento de sus datos personales conforme a este documento.",
      "Puede revocar su autorización o ejercer sus derechos de acceso, actualización, rectificación y supresión (cuando proceda), enviando una solicitud al contacto del responsable. La revocación podrá implicar la imposibilidad de continuar el proceso de postulación.",
    ],
  },
  {
    title: "9. Conservación y eliminación",
    paragraphs: [
      "Conservaremos su información durante el tiempo necesario para cumplir las finalidades del estudio, la eventual relación contractual de arrendamiento, los plazos legales de retención y la atención de reclamaciones. Transcurridos dichos plazos, procederemos a la eliminación o anonimización conforme a la normativa aplicable.",
    ],
  },
  {
    title: "10. Limitación de responsabilidad y renuncia a reclamaciones infundadas",
    paragraphs: [
      "Usted reconoce que el estudio de postulación es un proceso de evaluación y que los resultados dependen de terceros (por ejemplo, aseguradoras) y de la documentación aportada.",
      "En la medida permitida por la ley colombiana, usted se obliga a no iniciar acciones judiciales o extrajudiciales contra nosotros por el solo hecho de una decisión de no aprobación, siempre que dicha decisión se haya adoptado de buena fe y con fundamento en la información analizada. Esto no limita sus derechos irrenunciables como titular de datos ni las acciones que procedan por tratamiento ilícito de información.",
    ],
  },
  {
    title: "11. Menores de edad",
    paragraphs: [
      "Este trámite está dirigido a personas mayores de edad con capacidad legal para contratar. Si en el formulario se incluyen datos de menores (por ejemplo, edades de ocupantes), declara contar con la legitimación necesaria para suministrar dicha información con fines exclusivos del estudio de arrendamiento del hogar.",
    ],
  },
  {
    title: "12. Modificaciones",
    paragraphs: [
      "Podemos actualizar estos términos para reflejar cambios normativos o del proceso. La versión vigente estará publicada en esta página. El uso continuado del formulario después de una actualización implicará la aceptación de la versión publicada, salvo que la ley exija un nuevo consentimiento.",
    ],
  },
  {
    title: "13. Legislación aplicable",
    paragraphs: [
      "Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia se someterá a las autoridades competentes del domicilio del arrendador o del lugar de cumplimiento del arrendamiento, según corresponda.",
    ],
  },
];

export const POSTULACION_TERMINOS_LAST_UPDATED = "2 de junio de 2026";
