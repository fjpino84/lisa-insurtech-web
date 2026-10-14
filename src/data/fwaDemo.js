/**
 * Datos del mockup interactivo de LISA vigIA (FWA).
 *
 * Reproducen el caso Ramiro Lucas Fiochi del prototipo LISA vigIA:
 * boleta de honorarios adulterada, validación con el SII, patrones de
 * comportamiento en la cartera y casos relacionados por prestador.
 * Toda la información es ficticia y existe únicamente como demostración.
 *
 * Los datos de muestra (nombres, RUTs, boletas, montos, fechas) son los
 * mismos en ambos idiomas por tratarse de un caso chileno ficticio; solo
 * el texto de interfaz (títulos, labels, descripciones) se traduce.
 */

export const CASE = {
  id: "77940303",
  subject: "Ramiro Lucas Fiochi",
  rut: "24.543.309-9",
  prestacion: "Psicología",
  documento: "Boleta de Honorarios N° 4761",
  monto: 905000,
  fechaIngreso: "30/05/2024",
  prestador: "Fabián Rodríguez Díaz",
  rutPrestador: "11.005.560-2",
  finalRisk: 98,
};

/**
 * Zonas marcadas sobre la imagen de la boleta.
 * Coordenadas en porcentaje sobre la imagen original.
 */
export const DOC_MARKS_BASE = [
  { id: "numero", x: 72.5, y: 10.5, ancho: 25, alto: 6.5, tipo: "visual" },
  { id: "fecha-declarada", x: 71.5, y: 37.5, ancho: 27, alto: 5.5, tipo: "visual" },
  { id: "monto", x: 71, y: 56, ancho: 27, alto: 9.5, tipo: "visual" },
  { id: "fecha-emision", x: 18, y: 65, ancho: 36, alto: 5, tipo: "visual" },
  { id: "timbre", x: 7.5, y: 68.5, ancho: 58, alto: 9, tipo: "metadato" },
];

/** Metadatos del archivo presentado (valores, no se traducen). */
export const METADATA_BASE = {
  creacion: "15/08/2021 · 14:32",
  modificacion: "29/05/2024 · 10:15",
  software: "Canva (Web Application)",
};

/** Validación contra fuentes externas (montos, no se traducen). */
export const VALIDATIONS_BASE = [
  { id: "sii", fuente: "Agente SII", montoDeclarado: 905000, montoReal: 108000, severity: "alert" },
  { id: "watchlist", fuente: "Watchlist", severity: "alert" },
];

/** Patrones de comportamiento detectados en la cartera (valores, no se traducen). */
export const PATTERNS_BASE = {
  desviacion: { promedio: 50000, monto: 905000, relacionados: 3 },
  coalicion: { visitas: 15, dias: 7, pacientes: 4 },
};

/**
 * Casos relacionados: comparten el prestador Fabián Rodríguez Díaz.
 * Se muestran cuando el análisis alcanza la fase de patrones.
 */
export const RELATED_CASES = [
  { id: "77940311", beneficiario: "Valeria S. Montero", monto: 870000, prestacion: "Kinesiología", puntaje: 92 },
  { id: "77940318", beneficiario: "Carlos G. Altamirano", monto: 812000, prestacion: "Psicología", puntaje: 87 },
  { id: "77940324", beneficiario: "Elena M. Rojas", monto: 795000, prestacion: "Fonoaudiología", puntaje: 85 },
  { id: "77940342", beneficiario: "Sebastián A. Núñez", monto: 845000, prestacion: "Kinesiología", puntaje: 79 },
];

/** Prestador que concentra los casos críticos. */
export const PROVIDER = {
  nombre: "Fabián Rodríguez Díaz",
  rut: "11.005.560-2",
  tipo: "Profesional independiente",
  especialidad: "Psicología y psicopedagogía",
  comuna: "Vitacura",
  antiguedad: "Desde 2019",
};

/**
 * Población de referencia: siniestros de la misma prestación dentro del
 * rango esperado. Sirve de nube de fondo en el gráfico de dispersión.
 */
export const POPULATION = [
  { id: "p01", nombre: "M. Herrera", rut: "17.220.441-3", monto: 38000, documento: "Boleta N° 1120", prestacion: "Psicología", fecha: "03/05/2024" },
  { id: "p02", nombre: "J. Paredes", rut: "16.883.204-1", monto: 45000, documento: "Boleta N° 1145", prestacion: "Psicología", fecha: "06/05/2024" },
  { id: "p03", nombre: "A. Cortés", rut: "18.402.117-9", monto: 52000, documento: "Boleta N° 1160", prestacion: "Psicología", fecha: "07/05/2024" },
  { id: "p04", nombre: "L. Fuentes", rut: "15.339.028-4", monto: 47000, documento: "Boleta N° 1178", prestacion: "Psicología", fecha: "08/05/2024" },
  { id: "p05", nombre: "R. Muñoz", rut: "19.110.552-7", monto: 55000, documento: "Boleta N° 1190", prestacion: "Psicología", fecha: "09/05/2024" },
  { id: "p06", nombre: "C. Tapia", rut: "14.775.663-2", monto: 41000, documento: "Boleta N° 1204", prestacion: "Psicología", fecha: "10/05/2024" },
  { id: "p07", nombre: "S. Bravo", rut: "17.998.310-5", monto: 58000, documento: "Boleta N° 1219", prestacion: "Psicología", fecha: "11/05/2024" },
  { id: "p08", nombre: "P. Vidal", rut: "16.201.774-8", monto: 49000, documento: "Boleta N° 1232", prestacion: "Psicología", fecha: "13/05/2024" },
  { id: "p09", nombre: "N. Salas", rut: "18.664.905-K", monto: 62000, documento: "Boleta N° 1247", prestacion: "Psicología", fecha: "14/05/2024" },
  { id: "p10", nombre: "D. Riquelme", rut: "15.882.043-6", monto: 36000, documento: "Boleta N° 1258", prestacion: "Psicología", fecha: "15/05/2024" },
  { id: "p11", nombre: "F. Contreras", rut: "17.443.219-0", monto: 51000, documento: "Boleta N° 1266", prestacion: "Psicología", fecha: "16/05/2024" },
  { id: "p12", nombre: "G. Espinoza", rut: "19.337.880-2", monto: 44000, documento: "Boleta N° 1279", prestacion: "Psicología", fecha: "17/05/2024" },
  { id: "p13", nombre: "V. Lagos", rut: "14.556.911-7", monto: 60000, documento: "Boleta N° 1288", prestacion: "Psicología", fecha: "18/05/2024" },
  { id: "p14", nombre: "T. Orellana", rut: "18.120.365-4", monto: 39000, documento: "Boleta N° 1301", prestacion: "Psicología", fecha: "20/05/2024" },
  { id: "p15", nombre: "B. Navarro", rut: "16.709.542-9", monto: 56000, documento: "Boleta N° 1315", prestacion: "Psicología", fecha: "21/05/2024" },
  { id: "p16", nombre: "H. Cáceres", rut: "17.855.130-1", monto: 43000, documento: "Boleta N° 1327", prestacion: "Psicología", fecha: "22/05/2024" },
  { id: "p17", nombre: "I. Poblete", rut: "15.044.778-3", monto: 64000, documento: "Boleta N° 1339", prestacion: "Psicología", fecha: "23/05/2024" },
  { id: "p18", nombre: "K. Sepúlveda", rut: "19.522.601-8", monto: 48000, documento: "Boleta N° 1350", prestacion: "Psicología", fecha: "24/05/2024" },
  { id: "p19", nombre: "O. Bustos", rut: "16.318.997-5", monto: 53000, documento: "Boleta N° 1362", prestacion: "Psicología", fecha: "27/05/2024" },
  { id: "p20", nombre: "E. Miranda", rut: "18.977.224-0", monto: 46000, documento: "Boleta N° 1374", prestacion: "Psicología", fecha: "28/05/2024" },
];

/** Casos que se salen de la banda esperada. El primero es el investigado. */
export const OUTLIERS = [
  { id: "77940303", nombre: "R. L. Fiochi", rut: "24.543.309-9", monto: 905000, documento: "Boleta N° 4761", prestacion: "Psicología", fecha: "10/05/2024", esCasoActual: true },
  { id: "77940311", nombre: "V. S. Montero", rut: "18.234.901-K", monto: 870000, documento: "Boleta N° 3120", prestacion: "Kinesiología", fecha: "12/05/2024" },
  { id: "77940318", nombre: "C. G. Altamirano", rut: "12.981.442-3", monto: 812000, documento: "Boleta N° 4772", prestacion: "Psicología", fecha: "09/05/2024" },
  { id: "77940324", nombre: "E. M. Rojas", rut: "15.772.109-8", monto: 795000, documento: "Boleta N° 2288", prestacion: "Fonoaudiología", fecha: "14/05/2024" },
];

/**
 * Red de coalición en torno al prestador.
 * El número de visitas determina el grosor del vínculo en el grafo.
 */
export const COALITION = {
  prestador: { nombre: "Fabián Rodríguez Díaz", rut: "11.005.560-2" },
  pacientes: [
    { id: "77940303", nombre: "R. L. Fiochi", rut: "24.543.309-9", visitas: 15, dias: 7, monto: 905000, esCasoActual: true },
    { id: "77940311", nombre: "V. S. Montero", rut: "18.234.901-K", visitas: 12, dias: 9, monto: 870000 },
    { id: "77940318", nombre: "C. G. Altamirano", rut: "12.981.442-3", visitas: 11, dias: 8, monto: 812000 },
    { id: "77940324", nombre: "E. M. Rojas", rut: "15.772.109-8", visitas: 9, dias: 10, monto: 795000 },
    { id: "77940342", nombre: "S. A. Núñez", rut: "17.552.640-2", visitas: 8, dias: 12, monto: 845000 },
  ],
};

const UI = {
  es: {
    PHASES: [
      {
        id: "forense",
        label: "Forense documental",
        icon: "scan",
        title: "Motor de análisis forense documental",
        description:
          "vigIA inspecciona el documento presentado: numeración, tipografía, coherencia interna de fechas y metadatos del archivo.",
      },
      {
        id: "validacion",
        label: "Fuentes externas",
        icon: "globe",
        title: "Validación con fuentes externas",
        description:
          "Contraste con el registro del SII y con la lista de vigilancia interna de identidades con antecedentes.",
      },
      {
        id: "patrones",
        label: "Patrones",
        icon: "brain",
        title: "Modelos de comportamiento de cartera",
        description:
          "Modelos que comparan el siniestro con el histórico de la cartera y detectan coaliciones entre beneficiarios y prestador.",
      },
      {
        id: "resolucion",
        label: "Resolución",
        icon: "gavel",
        title: "Recomendación del sistema",
        description:
          "vigIA consolida las señales en un puntaje de riesgo y emite una recomendación antes del pago.",
      },
    ],
    docMarkLabels: {
      numero: {
        etiqueta: "N° 4761",
        detalle:
          "Salto secuencial anómalo respecto de la serie emitida por el prestador, con un artefacto de edición sobre el último dígito.",
      },
      "fecha-declarada": {
        etiqueta: "Fecha declarada",
        detalle:
          "La fecha declarada (10 de mayo de 2024) no coincide con la fecha de emisión registrada al pie del documento.",
      },
      monto: {
        etiqueta: "Monto alterado",
        detalle:
          "El monto de $905.000 aparece en una tipografía distinta a la del resto del documento y sin el alineado del emisor original.",
      },
      "fecha-emision": {
        etiqueta: "Fecha de emisión",
        detalle:
          "La emisión consigna el año 2021, tres años antes de la fecha declarada en el cuerpo de la boleta.",
      },
      timbre: {
        etiqueta: "Timbre SII",
        detalle:
          "El código de barras codifica un monto de $108.000, muy inferior a los $905.000 declarados en el documento.",
      },
    },
    forensicSignals: [
      {
        id: "numero",
        label: "Número de boleta",
        detail: "Se detecta un salto secuencial anómalo respecto de la serie emitida por el prestador.",
        severity: "alert",
      },
      {
        id: "tipografia",
        label: "Tipografía del monto",
        detail: "Fuente distinta en el monto y en la fecha de emisión respecto del resto del documento.",
        severity: "alert",
      },
      {
        id: "fecha",
        label: "Fecha de emisión",
        detail: "El cuerpo declara el 10 de mayo de 2024, mientras que la emisión al pie corresponde al 10/05/2021.",
        severity: "alert",
      },
    ],
    metaLabels: {
      creacion: "Creación",
      modificacion: "Última modificación",
      software: "Software",
    },
    metaConclusion:
      "El rastro digital no miente: el archivo fue creado originalmente en 2021, pero registra ediciones realizadas en Canva durante 2024 para alterar su validez.",
    validationLabels: {
      sii: {
        titulo: "Inconsistencia fiscal detectada",
        texto:
          "El monto real registrado en el código bidimensional es de $108.000, mientras que el documento declara $905.000. La boleta no existe en los registros del SII.",
      },
      watchlist: {
        titulo: "Alerta roja de identidad",
        texto: "El RUT del beneficiario cuenta con antecedentes previos de fraude en nuestra base de datos global.",
      },
    },
    PATTERNS: {
      desviacion: {
        titulo: "Desviación respecto del promedio",
        texto:
          "Alta desviación respecto del promedio histórico de $50.000 para este tipo de siniestro. Se identificaron 3 beneficiarios adicionales con una desviación similar.",
      },
      coalicion: {
        titulo: "Patrón de coalición",
        texto:
          "El beneficiario visitó al mismo prestador 15 veces en solo 7 días. Se encontraron 4 pacientes con el mismo comportamiento sobre el mismo prestador.",
      },
    },
    providerLabels: {
      nota: "Concentra la mayoría de los siniestros críticos de la cartera. Sus boletas presentan saltos de numeración y montos alterados de forma sistemática.",
    },
    RESOLUTION: {
      title: "Pago bloqueado · Derivar a investigación",
      score: 98,
      savings: 905000,
      summary:
        "vigIA consolidó evidencia forense, fiscal y de comportamiento antes del pago. La combinación de un documento adulterado, la inexistencia de la boleta en el SII y la coalición con el prestador sitúa el caso en el nivel crítico de la cartera.",
      actions: [
        "Retención preventiva del pago",
        "Derivación automática a la unidad de investigación",
        "Revisión de los 4 casos relacionados del mismo prestador",
      ],
    },
    REPORT: {
      action: "Enviar reporte al equipo de fraude",
      title: "Enviar reporte al equipo de fraude",
      file: { name: "INV-2024-8832_Fiochi_Reporte.pdf", size: "1.8 MB", pages: 12 },
      destino: "unidad.fraude@lisa.la",
      resumen: [
        { label: "Caso", value: "77940303" },
        { label: "Beneficiario", value: "Ramiro Lucas Fiochi" },
        { label: "Puntaje de riesgo", value: "98%", alert: true },
        { label: "Monto retenido", value: "$905.000" },
        { label: "Hallazgos", value: "7 señales de alto riesgo" },
        { label: "Casos vinculados", value: "4 del mismo prestador" },
      ],
      adjuntos: [
        "Boleta de honorarios N° 4761 con marcas forenses",
        "Informe de metadatos del archivo",
        "Contraste con registro del SII",
        "Red de coalición y casos relacionados",
      ],
      send: "Enviar reporte",
      sending: "Enviando…",
      sentTitle: "Reporte enviado",
      sentText:
        "El expediente completo se remitió a la unidad de investigación. El pago queda retenido hasta que concluya el análisis.",
      note: "Envío simulado: ningún dato sale de este navegador.",
    },
    ui: {
      hallazgos: (n) => `${n} hallazgos`,
      prestador: (nombre) => `Prestador: ${nombre}`,
      pulseZona: "Pulse sobre una zona marcada para ver el detalle.",
      metadatosArchivo: "Metadatos del archivo",
      puntajeRiesgo: "Puntaje de riesgo",
      siniestro: (id) => `Siniestro ${id}`,
      beneficiario: "Beneficiario",
      rut: "RUT",
      prestacion: "Prestación",
      monto: "Monto",
      hallazgosForenses: "Hallazgos forenses",
      inicieAnalisis: "Inicie el análisis para inspeccionar el documento.",
      validacionExterna: "Validación externa",
      pendienteFuentes: "Pendiente de la fase de fuentes externas.",
      declarado: "Declarado",
      realSii: "Real (SII)",
      patronesComportamiento: "Patrones de comportamiento",
      pendientePatrones: "Pendiente de la fase de patrones.",
      casosRelacionados: "Casos relacionados",
      fasesAnalisis: "Fases del análisis",
      fase: (i, total) => `Fase ${i} de ${total}`,
      listoComenzar: "Listo para comenzar",
      riesgo: "Riesgo",
      iniciarAnalisis: "Iniciar análisis",
      siguienteFase: "Siguiente fase",
      analizando: "Analizando…",
      reiniciar: "Reiniciar",
      hallazgoAria: (etiqueta) => `Hallazgo: ${etiqueta}`,
      perdidaEvitada: "Pérdida evitada",
      adjunto: "Adjunto",
      paginas: (n, size) => `PDF · ${n} páginas · ${size}`,
      reporteIncluye: "El reporte incluye",
      destinatario: "Destinatario: ",
    },
  },
  en: {
    PHASES: [
      {
        id: "forense",
        label: "Document forensics",
        icon: "scan",
        title: "Document forensic analysis engine",
        description:
          "vigIA inspects the submitted document: numbering, typography, internal date consistency and file metadata.",
      },
      {
        id: "validacion",
        label: "External sources",
        icon: "globe",
        title: "Validation against external sources",
        description:
          "Cross-check against the tax authority registry and the internal watchlist of flagged identities.",
      },
      {
        id: "patrones",
        label: "Patterns",
        icon: "brain",
        title: "Portfolio behavior models",
        description:
          "Models that compare the claim against portfolio history and detect coalitions between beneficiaries and the provider.",
      },
      {
        id: "resolucion",
        label: "Resolution",
        icon: "gavel",
        title: "System recommendation",
        description:
          "vigIA consolidates the signals into a risk score and issues a recommendation before payment.",
      },
    ],
    docMarkLabels: {
      numero: {
        etiqueta: "No. 4761",
        detalle:
          "Anomalous sequence jump relative to the provider's issued series, with an edit artifact on the last digit.",
      },
      "fecha-declarada": {
        etiqueta: "Declared date",
        detalle: "The declared date (May 10, 2024) doesn't match the issue date recorded at the bottom of the document.",
      },
      monto: {
        etiqueta: "Altered amount",
        detalle: "The amount of $905,000 appears in a different typeface than the rest of the document and without the original issuer's alignment.",
      },
      "fecha-emision": {
        etiqueta: "Issue date",
        detalle: "The issue date shows year 2021, three years before the date declared in the body of the receipt.",
      },
      timbre: {
        etiqueta: "Tax stamp",
        detalle: "The barcode encodes an amount of $108,000, far below the $905,000 declared in the document.",
      },
    },
    forensicSignals: [
      {
        id: "numero",
        label: "Receipt number",
        detail: "An anomalous sequence jump is detected relative to the provider's issued series.",
        severity: "alert",
      },
      {
        id: "tipografia",
        label: "Amount typography",
        detail: "Different typeface in the amount and issue date compared to the rest of the document.",
        severity: "alert",
      },
      {
        id: "fecha",
        label: "Issue date",
        detail: "The body declares May 10, 2024, while the issue date at the bottom corresponds to 05/10/2021.",
        severity: "alert",
      },
    ],
    metaLabels: {
      creacion: "Created",
      modificacion: "Last modified",
      software: "Software",
    },
    metaConclusion:
      "The digital trail doesn't lie: the file was originally created in 2021, but shows edits made in Canva during 2024 to alter its validity.",
    validationLabels: {
      sii: {
        titulo: "Tax inconsistency detected",
        texto:
          "The real amount recorded in the 2D barcode is $108,000, while the document declares $905,000. The receipt doesn't exist in the tax authority's records.",
      },
      watchlist: {
        titulo: "Identity red flag",
        texto: "The beneficiary's national ID has prior fraud records in our global database.",
      },
    },
    PATTERNS: {
      desviacion: {
        titulo: "Deviation from average",
        texto:
          "High deviation from the historical average of $50,000 for this type of claim. 3 additional beneficiaries with a similar deviation were identified.",
      },
      coalicion: {
        titulo: "Coalition pattern",
        texto: "The beneficiary visited the same provider 15 times in just 7 days. 4 patients with the same behavior toward the same provider were found.",
      },
    },
    providerLabels: {
      nota: "Concentrates most of the portfolio's critical claims. Their receipts systematically show numbering jumps and altered amounts.",
    },
    RESOLUTION: {
      title: "Payment blocked · Refer to investigation",
      score: 98,
      savings: 905000,
      summary:
        "vigIA consolidated forensic, fiscal and behavioral evidence before payment. The combination of an altered document, the receipt's nonexistence in tax records, and the coalition with the provider places the case at the portfolio's critical level.",
      actions: [
        "Preventive payment hold",
        "Automatic referral to the investigation unit",
        "Review of the 4 related cases from the same provider",
      ],
    },
    REPORT: {
      action: "Send report to fraud team",
      title: "Send report to fraud team",
      file: { name: "INV-2024-8832_Fiochi_Report.pdf", size: "1.8 MB", pages: 12 },
      destino: "fraud.unit@lisa.la",
      resumen: [
        { label: "Case", value: "77940303" },
        { label: "Beneficiary", value: "Ramiro Lucas Fiochi" },
        { label: "Risk score", value: "98%", alert: true },
        { label: "Amount held", value: "$905,000" },
        { label: "Findings", value: "7 high-risk signals" },
        { label: "Linked cases", value: "4 from the same provider" },
      ],
      adjuntos: [
        "Fee receipt No. 4761 with forensic marks",
        "File metadata report",
        "Cross-check against tax authority records",
        "Coalition network and related cases",
      ],
      send: "Send report",
      sending: "Sending…",
      sentTitle: "Report sent",
      sentText: "The complete file was sent to the investigation unit. Payment remains on hold until the analysis concludes.",
      note: "Simulated submission: no data leaves this browser.",
    },
    ui: {
      hallazgos: (n) => `${n} findings`,
      prestador: (nombre) => `Provider: ${nombre}`,
      pulseZona: "Click on a marked area to see the detail.",
      metadatosArchivo: "File metadata",
      puntajeRiesgo: "Risk score",
      siniestro: (id) => `Claim ${id}`,
      beneficiario: "Beneficiary",
      rut: "National ID",
      prestacion: "Service",
      monto: "Amount",
      hallazgosForenses: "Forensic findings",
      inicieAnalisis: "Start the analysis to inspect the document.",
      validacionExterna: "External validation",
      pendienteFuentes: "Pending the external sources phase.",
      declarado: "Declared",
      realSii: "Actual (tax registry)",
      patronesComportamiento: "Behavior patterns",
      pendientePatrones: "Pending the patterns phase.",
      casosRelacionados: "Related cases",
      fasesAnalisis: "Analysis phases",
      fase: (i, total) => `Phase ${i} of ${total}`,
      listoComenzar: "Ready to start",
      riesgo: "Risk",
      iniciarAnalisis: "Start analysis",
      siguienteFase: "Next phase",
      analizando: "Analyzing…",
      reiniciar: "Restart",
      hallazgoAria: (etiqueta) => `Finding: ${etiqueta}`,
      perdidaEvitada: "Loss avoided",
      adjunto: "Attached",
      paginas: (n, size) => `PDF · ${n} pages · ${size}`,
      reporteIncluye: "The report includes",
      destinatario: "Recipient: ",
    },
  },
};

export function getFwaDemoData(language) {
  const lang = language === "en" ? "en" : "es";
  const t = UI[lang];

  const DOC_MARKS = DOC_MARKS_BASE.map((mark) => ({
    ...mark,
    ...t.docMarkLabels[mark.id],
  }));

  const METADATA = {
    ...METADATA_BASE,
    creacionLabel: t.metaLabels.creacion,
    modificacionLabel: t.metaLabels.modificacion,
    softwareLabel: t.metaLabels.software,
    conclusion: t.metaConclusion,
  };

  const FORENSIC_SIGNALS = t.forensicSignals;

  const VALIDATIONS = VALIDATIONS_BASE.map((v) => ({
    ...v,
    ...t.validationLabels[v.id],
  }));

  const PATTERNS = {
    desviacion: { ...PATTERNS_BASE.desviacion, ...t.PATTERNS.desviacion },
    coalicion: { ...PATTERNS_BASE.coalicion, ...t.PATTERNS.coalicion },
  };

  const PROVIDER_FULL = { ...PROVIDER, nota: t.providerLabels.nota };

  return {
    CASE,
    PHASES: t.PHASES,
    DOC_MARKS,
    FORENSIC_SIGNALS,
    METADATA,
    VALIDATIONS,
    PATTERNS,
    RELATED_CASES,
    PROVIDER: PROVIDER_FULL,
    RESOLUTION: t.RESOLUTION,
    REPORT: t.REPORT,
    ui: t.ui,
  };
}
