/**
 * Datos simulados para el mockup interactivo de LISA Claims.
 * Caso de Gastos Médicos, según especificación.
 * Todos los datos son ficticios y sirven únicamente como demostración.
 */

const CONTENT = {
  es: {
    CLAIM: {
      id: "HM-8942",
      ramo: "Gastos Médicos",
      numeroCaso: "HH234",
    },
    CASE_STATUS: {
      pendiente: "Caso Pendiente",
      creado: "N° de Caso",
    },
    STAGES: [
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
    ],
    DOCUMENTS: [
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
    ],
    MISSING_DOC: {
      title: "Falta un documento obligatorio",
      text: "No hemos encontrado la receta médica dentro de los documentos validados. Para poder continuar con el proceso, por favor suba la receta aquí.",
      action: "Subir receta médica",
      note: "Formatos admitidos: JPG, PNG o PDF. Máximo 10 MB.",
    },
    EXTRACTED_FIELDS: [
      { id: "beneficiario", label: "Beneficiario", value: "Lucas Fiorci", confidence: 99.2 },
      { id: "rfc", label: "ID Fiscal Proveedor", value: "HAC-990101-XYZ", confidence: 99.8 },
      { id: "admision", label: "Fecha Admisión", value: "2023-10-21", confidence: 97.5 },
      { id: "monto", label: "Monto Total Facturado", value: "$12,450.00 USD", confidence: 100 },
    ],
    RULES: [
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
    ],
    RULES_READY: "Siniestro listo para pago",
    DECISION: {
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
      handoff: {
        text: "Ya conociste cómo LISA Claims es capaz de liquidar siniestros de forma 100% automatizada. Ahora prepárate para conocer cómo con LISA vigIA.",
        actionStrong: "Hacemos visible",
        actionSoft: "el fraude invisible",
      },
    },
  },
  en: {
    CLAIM: {
      id: "HM-8942",
      ramo: "Medical Expenses",
      numeroCaso: "HH234",
    },
    CASE_STATUS: {
      pendiente: "Pending Case",
      creado: "Case No.",
    },
    STAGES: [
      {
        id: "recepcion",
        label: "Intake",
        icon: "upload",
        title: "Document intake",
        description:
          "LISA receives the file by email, API or portal. Each document is automatically classified by type.",
      },
      {
        id: "lisai",
        label: "LISai (Agent)",
        icon: "chip",
        title: "Cognitive extraction",
        description:
          "The LISai agent reads each document, extracts the mandatory fields and assigns a confidence level to each value.",
      },
      {
        id: "lisux",
        label: "LISux (Rules)",
        icon: "rules",
        title: "Business rules engine",
        description:
          "LISux runs the rules configured for the company: coverage, deductible, pre-existing conditions and limits.",
      },
      {
        id: "decision",
        label: "Decision",
        icon: "gavel",
        title: "Settlement decision",
        description:
          "The system issues a traceable resolution detailing each rule applied and its result.",
      },
    ],
    DOCUMENTS: [
      {
        id: "doc-1",
        name: "Hospital_Invoice_Angeles.pdf",
        label: "Hospital invoice",
        type: "PDF",
        size: "1.2 MB",
        provided: true,
      },
      {
        id: "doc-2",
        name: "Lab_Results_Oct.pdf",
        label: "Lab results",
        type: "PDF",
        size: "850 KB",
        provided: true,
      },
      {
        id: "doc-3",
        name: "Medical_Prescription_Signed.jpg",
        label: "Medical prescription",
        type: "JPG",
        size: "2.4 MB",
        provided: false,
      },
    ],
    MISSING_DOC: {
      title: "A required document is missing",
      text: "We couldn't find the medical prescription among the validated documents. To continue the process, please upload it here.",
      action: "Upload medical prescription",
      note: "Accepted formats: JPG, PNG or PDF. Maximum 10 MB.",
    },
    EXTRACTED_FIELDS: [
      { id: "beneficiario", label: "Beneficiary", value: "Lucas Fiorci", confidence: 99.2 },
      { id: "rfc", label: "Provider Tax ID", value: "HAC-990101-XYZ", confidence: 99.8 },
      { id: "admision", label: "Admission Date", value: "2023-10-21", confidence: 97.5 },
      { id: "monto", label: "Total Billed Amount", value: "$12,450.00 USD", confidence: 100 },
    ],
    RULES: [
      {
        id: "cobertura",
        label: "Active Coverage Validation",
        detail: "Policy active at the time of the claim",
        resultLabel: "Coverage active",
      },
      {
        id: "deducible",
        label: "Remaining Deductible Calculation",
        detail: "Annual deductible applied: $2,200.00 USD",
        resultLabel: "Deductible applied",
      },
      {
        id: "preexistencia",
        label: "Pre-existing Conditions Check",
        detail: "No pre-existing conditions linked to the diagnosis",
        resultLabel: "No findings",
      },
      {
        id: "tope",
        label: "Insured Amount Validation",
        detail: "Amount within the contracted limit",
        resultLabel: "Within limit",
      },
    ],
    RULES_READY: "Claim ready for payment",
    DECISION: {
      title: "Settlement approved, reserves adjusted",
      moneda: "USD",
      tiempo: "4 min 12 s",
      summary:
        "LISux approved the settlement after validating all the business rules configured for the company. Technical reserves were automatically adjusted.",
      breakdown: [
        { label: "Billed amount", value: "$12,450.00" },
        { label: "Deductible applied", value: "− $2,200.00" },
        { label: "Amount to settle", value: "$10,250.00", total: true },
      ],
      handoff: {
        text: "You've just seen how LISA Claims can settle claims 100% automatically. Now get ready to see how, with LISA vigIA.",
        actionStrong: "We make visible",
        actionSoft: "the invisible fraud",
      },
    },
  },
};

export function getClaimsDemoData(language) {
  return CONTENT[language === "en" ? "en" : "es"];
}
