/**
 * Datos simulados para el mockup interactivo de LISA Claims.
 * Caso de Gastos Médicos, según especificación.
 * Todos los datos son ficticios y sirven únicamente como demostración.
 */

export const CLAIM = {
  id: "HM-8942",
  ramo: "Gastos Médicos",
  /** Número que LISai asigna al caso una vez creado. */
  numeroCaso: "HH234",
};

/** Estado del caso mostrado junto al agente LISai. */
export const CASE_STATUS = {
  pendiente: "Caso Pendiente",
  creado: "N° de Caso",
};

/** Etapas del proceso de liquidación E2E. */
export const STAGES = [
  {
    id: "recepcion",
    label: "Recepción",
    icon: "upload",
    title: "Recepción de documentos",
    description:
      "LISA recibe el expediente por correo, API o portal. Cada archivo se clasifica automáticamente por tipo documental.",
  },
  {
    id: "lisai",
    label: "LISai (Agente)",
    icon: "chip",
    title: "Extracción cognitiva",
    description:
      "El agente LISai lee cada documento, extrae los campos mandatorios y asigna un nivel de confianza a cada dato.",
  },
  {
    id: "lisux",
    label: "LISux (Reglas)",
    icon: "rules",
    title: "Motor de reglas de negocio",
    description:
      "LISux ejecuta las reglas configuradas para la compañía: cobertura, deducible, preexistencias y topes.",
  },
  {
    id: "decision",
    label: "Decisión",
    icon: "gavel",
    title: "Decisión de liquidación",
    description:
      "El sistema emite una resolución trazable con el detalle de cada regla aplicada y su resultado.",
  },
];

/**
 * Documentos obligatorios del expediente.
 *
 * Los dos primeros llegan con el expediente; la receta falta y debe aportarla
 * el usuario durante la simulación.
 */
export const DOCUMENTS = [
  {
    id: "doc-1",
    name: "Factura_Hospital_Angeles.pdf",
    label: "Factura del hospital",
    type: "PDF",
    size: "1.2 MB",
    provided: true,
  },
  {
    id: "doc-2",
    name: "Resultados_Lab_Oct.pdf",
    label: "Resultados de laboratorio",
    type: "PDF",
    size: "850 KB",
    provided: true,
  },
  {
    id: "doc-3",
    name: "Receta_Medica_Firma.jpg",
    label: "Receta médica",
    type: "JPG",
    size: "2.4 MB",
    provided: false,
  },
];

/** Aviso que solicita el documento que falta. */
export const MISSING_DOC = {
  title: "Falta un documento obligatorio",
  text: "No hemos encontrado la receta médica dentro de los documentos validados. Para poder continuar con el proceso, por favor suba la receta aquí.",
  action: "Subir receta médica",
  note: "Formatos admitidos: JPG, PNG o PDF. Máximo 10 MB.",
};

/** Campos que LISai extrae progresivamente. */
export const EXTRACTED_FIELDS = [
  { id: "beneficiario", label: "Beneficiario", value: "Lucas Fiorci", confidence: 99.2 },
  { id: "rfc", label: "ID Fiscal Proveedor", value: "HAC-990101-XYZ", confidence: 99.8 },
  { id: "admision", label: "Fecha Admisión", value: "2023-10-21", confidence: 97.5 },
  { id: "monto", label: "Monto Total Facturado", value: "$12,450.00 USD", confidence: 100 },
];

/** Reglas que ejecuta LISux. Todas se resuelven correctamente. */
export const RULES = [
  {
    id: "cobertura",
    label: "Validación de Cobertura Activa",
    detail: "Póliza vigente al momento del siniestro",
    resultLabel: "Cobertura vigente",
  },
  {
    id: "deducible",
    label: "Cálculo de Deducible Remanente",
    detail: "Deducible anual aplicado: $2,200.00 USD",
    resultLabel: "Deducible aplicado",
  },
  {
    id: "preexistencia",
    label: "Verificación de Preexistencias",
    detail: "Sin preexistencias asociadas al diagnóstico",
    resultLabel: "Sin hallazgos",
  },
  {
    id: "tope",
    label: "Validación de Suma Asegurada",
    detail: "Monto dentro del límite contratado",
    resultLabel: "Dentro de límite",
  },
];

/** Aviso que cierra el motor de reglas cuando todas se validan. */
export const RULES_READY = "Siniestro listo para pago";

/** Resolución final del caso. */
export const DECISION = {
  title: "Liquidación aprobada, reservas ajustadas",
  moneda: "USD",
  tiempo: "4 min 12 s",
  summary:
    "LISux aprobó la liquidación tras validar la totalidad de las reglas de negocio configuradas para la compañía. Las reservas técnicas quedaron ajustadas de forma automática.",
  breakdown: [
    { label: "Monto facturado", value: "$12,450.00" },
    { label: "Deducible aplicado", value: "− $2,200.00" },
    { label: "Monto a liquidar", value: "$10,250.00", total: true },
  ],
  /**
   * Cierre que invita a conocer la segunda solución. La llamada a la acción
   * se compone de dos mitades para poder destacar sólo la primera.
   */
  handoff: {
    text: "Ya conociste cómo LISA Claims es capaz de liquidar siniestros de forma 100% automatizada. Ahora prepárate para conocer cómo LISA vigIA.",
    actionStrong: "Hacemos visible",
    actionSoft: "el fraude invisible",
  },
};
