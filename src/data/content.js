/**
 * Contenido textual del sitio.
 * Centralizado para facilitar la edición sin tocar los componentes.
 * Todos los textos visibles están en español.
 */

export const NAV_ITEMS = [
  { id: "inicio", label: "Inicio", icon: "home" },
  { id: "somos", label: "Somos LISA", icon: "building" },
  { id: "soluciones", label: "Soluciones", icon: "nodes" },
  { id: "equipo", label: "Equipo", icon: "team" },
  { id: "hablemos", label: "Hablemos", icon: "chat" },
];

/**
 * Titular de la portada.
 *
 * Las dos líneas se componen por fragmentos: solo "IA" y "Seguros" se
 * destacan en color, el resto va en blanco.
 */
export const HERO = {
  eyebrow: "Insurance IA-Driven Future",
  titleLine1: [
    { text: "La " },
    { text: "IA", accent: true },
    { text: " está cambiando la" },
  ],
  titleLine2: [
    { text: "Industria de los " },
    { text: "Seguros", accent: true },
  ],
  subtitle: "Y tú estás a punto de ser parte",
  ctaPrimary: "Descubrir Soluciones",
};

export const INTRO = {
  title: "Un seguro que funcione, y que funcione para todos",
  paragraphs: [
    "En LISA tenemos una profunda convicción por que los seguros funcionen para todos: para las personas, con procesos más simples y transparentes, y para las aseguradoras, entendiendo todo el control y la precisión que necesitan en los pagos.",
    "Llevamos más de 6 años diseñando y trabajando con diferentes modelos de inteligencia artificial, evolucionando hacia modelos agénticos, para garantizar la calidad y precisión en cada proceso de liquidación.",
  ],
};

export const METRICS = [
  { value: "+5M", label: "Siniestros procesados", icon: "document" },
  { value: "10'", label: "Duración E2E promedio", icon: "clock" },
  { value: "70%", label: "Liquidación Automática (STP)", icon: "spark" },
];

/**
 * Módulos que componen la plataforma.
 *
 * El nombre se parte en dos para poder colorear sólo el prefijo "LIS":
 * turquesa en el agente y violeta en el motor de reglas.
 */
export const PILLARS = [
  {
    id: "lisai",
    icon: "chip",
    name: { prefix: "LIS", suffix: "ai", tone: "cyan" },
    title: "Seguros transparentes para las personas",
    text: "Nuestros modelos agénticos traducen procesos complejos en experiencias fluidas y comprensibles. LISai selecciona de forma dinámica y eficiente los modelos que mejor se ajustan a cada tarea, logrando la lectura y extracción de información de cada documento con una alta tasa de precisión.",
    badge: "Validación de identidad en tiempo real",
  },
  {
    id: "lisux",
    icon: "rules",
    name: { prefix: "LIS", suffix: "ux", tone: "purple" },
    title: "Reglas de negocio a la medida de cada póliza",
    text: "Transformamos las pólizas de nuestros clientes en un motor de reglas de negocio capaz de procesar toda la información necesaria para tomar decisiones de liquidación. Cada interacción se vuelve clara, justa y excepcionalmente rápida.",
    stats: [
      { value: "99.9%", label: "Precisión" },
      { value: "<1s", label: "Latencia" },
    ],
  },
  {
    id: "fwa",
    icon: "scan",
    name: { prefix: "LISA ", suffix: "FWA", tone: "danger" },
    title: "Prevención de fraude embebida en la liquidación",
    text: "Dentro de nuestros procesos de liquidación embebemos múltiples controles de prevención de fraude, basados en tres pilares fundamentales: análisis forense de los documentos, validación con fuentes confiables y análisis de patrones de comportamiento. Nuestros controles mejoran la rentabilidad de las cuentas y la competitividad de sus productos.",
    pilares: [
      "Análisis forense de los documentos",
      "Validación con fuentes confiables",
      "Análisis de patrones de comportamiento",
    ],
  },
];


export const SOLUTIONS = [
  {
    id: "claims",
    name: "LISA Claims",
    tagline: "Liquidación autónoma de siniestros",
    description:
      "Un potente agente de inteligencia artificial (LISai) capaz de recibir documentos, clasificarlos y validarlos, y extraer toda la información mandatoria y estandarizarla, para que pueda ser procesada a través del motor de reglas de negocio (LISux) diseñado para cada compañía, siendo capaz de tomar decisiones de liquidación en pocos minutos.",
    features: [
      "Recepción y clasificación automática de documentos",
      "Extracción cognitiva con nivel de confianza por campo",
      "Motor de reglas de negocio configurable por compañía",
      "Decisión de liquidación en minutos, no en días",
    ],
    accent: "cyan",
  },
  {
    id: "fwa",
    name: "LISA FWA",
    tagline: "Prevención de fraude antes del pago",
    description:
      "Diseñado sobre tres pilares fundamentales: un motor de análisis forense documental, validación con fuentes externas y modelos de machine learning que predicen el comportamiento de las carteras en términos de fraude. Controles de prevención de fraude embebidos en el proceso de liquidación que se ejecutan antes del pago.",
    features: [
      "Análisis forense documental (metadatos, EXIF, tipografía)",
      "Validación con fuentes externas y OSINT",
      "Modelos predictivos de comportamiento de cartera",
      "Controles embebidos que se ejecutan antes del pago",
    ],
    accent: "danger",
  },
];

/** Apertura de "Somos LISA": el doble título en el certamen de Zurich. */
export const CHAMPIONS = {
  title: "¡Somos campeones X2!",
  photoAlt:
    "Representante de LISA sosteniendo el galardón del Zurich Innovation Championship.",
  awards: [
    {
      year: "2022",
      name: "Mejor Idea",
      text: "Entre 2.600 proyectos de todo el mundo, LISA se convierte en el ganador del Zurich Innovation Championship.",
    },
    {
      year: "2025",
      name: "Mayor impacto en LATAM",
    },
  ],
};

/** Valores que guían el trabajo del equipo. */
export const VALUES = {
  title: ["Nuestros", "valores"],
  items: [
    {
      id: "accountability",
      name: "Accountability",
      text: "Cumplimos nuestro compromiso de manera confiable.",
      icon: "shield",
    },
    {
      id: "facilidad",
      name: "Facilidad de uso",
      text: "Intuitivo, accesible y fácil de adoptar: un concepto que hace un uso eficaz de la tecnología.",
      icon: "spark",
    },
    {
      id: "precision",
      name: "Precisión",
      text: "Ejecutamos con exactitud y calidad, para obtener resultados confiables.",
      icon: "check",
    },
    {
      id: "innovacion",
      name: "Innovación",
      text: "Aplicamos lo último en tecnología para mejorar nuestros productos.",
      icon: "chip",
    },
    {
      id: "rapidez",
      name: "Rapidez",
      text: "Resolvemos de manera ágil y eficiente.",
      icon: "clock",
    },
  ],
};

/** Misión y presencia, para la sección "Somos LISA". */
export const ABOUT = {
  mision: {
    title: "Transformamos la gestión de siniestros con inteligencia artificial",
    text: "LISA es una Insurtech creada con la misión de innovar y transformar la industria aseguradora.",
  },
  presencia: {
    eyebrow: "Regional Presence",
    title: "Dónde estamos",
    text: "En LISA seguimos trabajando para expandir nuestra presencia en la región. Somos expertos en el mercado asegurador latinoamericano.",
    cifras: [
      { valor: "+30", etiqueta: "FTE" },
      { valor: "6", etiqueta: "países" },
    ],
    nota: "Equipo multicultural LATAM",
    /** Países donde opera LISA. La bandera se dibuja en Flag.js. */
    paises: [
      { id: "cl", nombre: "Chile" },
      { id: "ar", nombre: "Argentina" },
      { id: "mx", nombre: "México" },
      { id: "pe", nombre: "Perú" },
      { id: "br", nombre: "Brasil" },
      { id: "co", nombre: "Colombia" },
    ],
  },
};

/** Equipo, por orden de presentación. */
export const TEAM = {
  intro:
    "Nuestro equipo combina años de experiencia en seguros con un profundo conocimiento en tecnología de última generación y ciberseguridad. Hablamos el idioma de la industria. Somos un equipo multicultural y multidisciplinario ubicado en varios países de la región, dando una mayor cobertura a nuestros clientes.",
  lead: {
    id: "esteban",
    nombre: "Esteban Izarra",
    cargo: "CEO & Cofounder",
    foto: "assets/equipo/esteban.jpg",
    linkedin: "https://www.linkedin.com/company/lisainsurtech",
    quote:
      "Empezamos con una visión clara: aplicar tecnología avanzada para impulsar el ecosistema asegurador. Hoy, nuestras soluciones de IA son utilizadas por los principales referentes del sector para optimizar procesos, mejorar la toma de decisiones y brindar una mejor experiencia a sus clientes.",
  },
  /** Cada grupo se presenta en su propia fila, por nivel de dirección. */
  groups: [
    [
      { id: "loreto", nombre: "Loreto Hernández", cargo: "COO", foto: "assets/equipo/loreto.jpg" },
      { id: "francisco", nombre: "Francisco Pino", cargo: "CCO", foto: "assets/equipo/francisco.jpg" },
      { id: "luis", nombre: "Luis Álvarez", cargo: "CTO", foto: "assets/equipo/luis.jpg" },
    ],
    [
      { id: "diego", nombre: "Diego Ferrochio", cargo: "Head of Operations", foto: "assets/equipo/diego.jpg" },
      { id: "juan", nombre: "Juan Guilá", cargo: "Head of Customer Success", foto: "assets/equipo/juan.jpg" },
      { id: "rodrigo", nombre: "Rodrigo Randaro", cargo: "Head of Finance", foto: "assets/equipo/rodrigo.jpg" },
    ],
    [
      { id: "marie", nombre: "Marie Merle", cargo: "PMO", foto: "assets/equipo/marie.jpg" },
      { id: "nicolas", nombre: "Nicolás Nash", cargo: "Senior Product Owner", foto: "assets/equipo/nicolas.jpg" },
    ],
  ],
};

/** Canales de contacto reales. */
export const CONTACT = {
  email: "hello@lisainsurtech.com",
  whatsapp: "+56998204035",
  whatsappLink: "https://wa.me/56998204035",
  linkedin: "https://www.linkedin.com/company/lisainsurtech",
};

export const AWARDS = [
  {
    org: "Zurich Innovation Championship",
    detail: "2022 mejor idea · 2025 mayor impacto en LATAM",
    highlight: "×2",
  },
  { org: "Eila Awards", detail: "Chile, 2025" },
  { org: "Insurtech Round", detail: "Argentina, 2025" },
  { org: "Innlab La2", detail: "Argentina, 2024" },
  { org: "Momentum GNP", detail: "México, 2024" },
];

export const CTA_FINAL = {
  title: "Listo para dar el siguiente paso",
  text: "Conversemos sobre cómo la automatización agéntica puede transformar su operación de siniestros.",
  button: "Redefine tus procesos con LISA",
};

export const FOOTER = {
  legal: "© 2024 LISA Insurtech. AI-Driven Future.",
  links: ["Privacidad", "Términos", "Contacto"],
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/lisainsurtech" },
  ],
};
