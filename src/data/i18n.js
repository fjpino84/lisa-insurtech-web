/**
 * Internacionalización completa - Español / English
 */

export const TRANSLATIONS = {
  es: {
    nav: {
      inicio: "Inicio",
      somos: "Somos LISA",
      soluciones: "Soluciones",
      equipo: "Equipo",
      hablemos: "Hablemos",
    },
    hero: {
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
    },
    intro: {
      title: "Un seguro que funcione, y que funcione para todos",
      paragraphs: [
        "En LISA tenemos una profunda convicción por que los seguros funcionen para todos: para las personas, con procesos más simples y transparentes, y para las aseguradoras, entendiendo todo el control y la precisión que necesitan en los pagos.",
        "Llevamos más de 6 años diseñando y trabajando con diferentes modelos de inteligencia artificial, evolucionando hacia modelos agénticos, para garantizar la calidad y precisión en cada proceso de liquidación.",
      ],
    },
    metrics: [
      { value: "+5M", label: "Siniestros procesados", icon: "document" },
      { value: "10'", label: "Duración E2E promedio", icon: "clock" },
      { value: "70%", label: "Liquidación Automática (STP)", icon: "spark" },
    ],
    modules_head: {
      eyebrow: "Soluciones modulares",
      title: "Nuestras soluciones se adaptan a sus necesidades",
    },
    pillars: [
      {
        id: "lisai",
        name: { prefix: "LIS", suffix: "ai", tone: "cyan" },
        title: "Seguros transparentes para las personas",
        text: "Nuestros modelos agénticos traducen procesos complejos en experiencias fluidas y comprensibles. LISai selecciona de forma dinámica y eficiente los modelos que mejor se ajustan a cada tarea, logrando la lectura y extracción de información de cada documento con una alta tasa de precisión.",
        badge: "Validación de identidad en tiempo real",
      },
      {
        id: "lisux",
        name: { prefix: "LIS", suffix: "ux", tone: "purple" },
        title: "Reglas de negocio a la medida de cada póliza",
        text: "Transformamos las pólizas de nuestros clientes en un motor de reglas de negocio capaz de procesar toda la información necesaria para tomar decisiones de liquidación. Cada interacción se vuelve clara, justa y excepcionalmente rápida.",
        metrics: [
          { value: "99.9%", label: "Precisión" },
          { value: "<1s", label: "Latencia" },
        ],
      },
      {
        id: "fwa",
        name: { prefix: "LISA ", suffix: "FWA", tone: "danger" },
        title: "Prevención de fraude embebida en la liquidación",
        text: "Dentro de nuestros procesos de liquidación embebemos múltiples controles de prevención de fraude, basados en tres pilares fundamentales: análisis forense de los documentos, validación con fuentes confiables y análisis de patrones de comportamiento. Nuestros controles mejoran la rentabilidad de las cuentas y la competitividad de sus productos.",
        pilares: [
          "Análisis forense de los documentos",
          "Validación con fuentes confiables",
          "Análisis de patrones de comportamiento",
        ],
        metrics: [
          { label: "Accuracy", value: "60%" },
          { label: "Tasa de Detección", value: "2%" },
        ],
      },
    ],
    solutions: [
      {
        id: "claims",
        name: "LISA Claims",
        tagline: "Liquidación autónoma de siniestros",
        description: "Un potente agente de inteligencia artificial (LISai) capaz de recibir documentos, clasificarlos y validarlos, y extraer toda la información mandatoria y estandarizarla, para que pueda ser procesada a través del motor de reglas de negocio (LISux) diseñado para cada compañía, siendo capaz de tomar decisiones de liquidación en pocos minutos.",
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
        description: "Diseñado sobre tres pilares fundamentales: un motor de análisis forense documental, validación con fuentes externas y modelos de machine learning que predicen el comportamiento de las carteras en términos de fraude. Controles de prevención de fraude embebidos en el proceso de liquidación que se ejecutan antes del pago.",
        features: [
          "Análisis forense documental (metadatos, LLM, duplicados, entre otros)",
          "Validación con fuentes externas y OSINT",
          "Modelos predictivos de comportamiento de cartera",
          "Controles embebidos que se ejecutan antes del pago",
        ],
        accent: "danger",
      },
    ],
    awards: {
      title: "¡Somos campeones X2!",
      photoAlt: "Representante de LISA sosteniendo el galardón del Zurich Innovation Championship.",
      year2022: "2022",
      award2022: "Mejor Idea",
      text2022: "Entre 2.600 proyectos de todo el mundo, LISA se convierte en el ganador del Zurich Innovation Championship.",
      year2025: "2025",
      award2025: "Mayor impacto en LATAM",
    },
    about: {
      resena: {
        title: "Transformamos la gestión de siniestros con inteligencia artificial",
        paragraphs: [
          "LISA es una Insurtech con más de 5 años en el mercado, desarrollando tecnologías que optimizan la industria aseguradora mediante la combinación de inteligencia artificial e inteligencia humana.",
          "Entrenamos constantemente nuevos modelos de IA generativa, respaldados por expertos en tecnología, ciberseguridad y seguros con más de 15 años de experiencia, lo que nos permite hablar el idioma de la industria y garantizar el éxito en la implementación de nuestros proyectos.",
        ],
      },
      proposito: [
        {
          id: "vision",
          label: "Visión",
          icon: "eye",
          text: "Ser la empresa líder del ecosistema asegurador aplicando tecnología de vanguardia.",
        },
        {
          id: "mision",
          label: "Misión",
          icon: "spark",
          text: "Generar eficiencias en el ecosistema asegurador, aplicando inteligencia artificial para lograr la automatización de procesos que impacten en la satisfacción de los asegurados.",
        },
      ],
      presencia: {
        eyebrow: "Presencia Regional",
        title: "Dónde estamos",
        text: "En LISA seguimos trabajando para expandir nuestra presencia en la región. Somos expertos en el mercado asegurador latinoamericano.",
        cifras: [
          { valor: "+30", etiqueta: "FTE" },
          { valor: "6", etiqueta: "países" },
        ],
        nota: "Equipo multicultural LATAM",
        paises: [
          { id: "cl", nombre: "Chile" },
          { id: "ar", nombre: "Argentina" },
          { id: "mx", nombre: "México" },
          { id: "pe", nombre: "Perú" },
          { id: "br", nombre: "Brasil" },
          { id: "co", nombre: "Colombia" },
        ],
      },
      certification: "Tu información, respaldada por estándares internacionales",
      certification_subtitle: "Certificación ISO/IEC 27001:2022",
    },
    team: {
      eyebrow: "Equipo",
      title: "El equipo detrás de LISA",
      intro: "Nuestro equipo combina años de experiencia en seguros con un profundo conocimiento en tecnología de última generación y ciberseguridad. Hablamos el idioma de la industria. Somos un equipo multicultural y multidisciplinario ubicado en varios países de la región, dando una mayor cobertura a nuestros clientes.",
    },
    testimonials: [
      {
        author: "Laurence Maurice",
        title: "CEO Zurich Insurance Latam",
        text: "América Latina está representada por la iniciativa de Zurich Chile, en colaboración con la empresa LISA Insurtech. Ésta tecnología ya está entregando resultados notables, con más de 1 millón de siniestros automatizados en 2025 y un enorme potencial",
      },
      {
        author: "Sebastián Dabini",
        title: "CEO Zurich Argentina (ex CEO Chile)",
        text: "Innovar en salud no es solo eficiencia y el costo de la manualidad, es también sobre crear empatía, confianza y entregar valor para los clientes. LISA Insurtech incorpora esto en sus valores, y por eso, los elegimos dos veces como ganadores en Zurich Innovation Championship 2022 y 2025",
      },
      {
        author: "Martín Moser",
        title: "Gerente Programa INNLAB (La Segunda Seguros)",
        text: "Con LISA Insurtech hicimos el segundo caso de éxito liquidando siniestros en menos de 5 minutos totalmente automatizados... ¡Imaginen lo que es para la experiencia del cliente! ¡Es espectacular!",
      },
    ],
    cta_final: {
      title: "Listo para dar el siguiente paso",
      text: "Conversemos sobre cómo la automatización agéntica puede transformar su operación de siniestros.",
      button: "Redefine tus procesos con LISA",
    },
    contact: {
      form_label: "Hablemos",
      name: "Nombre",
      company: "Empresa",
      email: "Email",
      phone: "Teléfono",
      interest: "¿Qué solución te interesa?",
      message: "Mensaje",
      submit: "Enviar",
      close: "Cerrar",
      interests: [
        { value: "claims", label: "LISA Claims · Liquidación de siniestros" },
        { value: "fwa", label: "LISA vigIA · Prevención de fraude" },
        { value: "ambos", label: "Ambas soluciones" },
        { value: "otro", label: "Otra consulta" },
      ],
      email_addr: "hello@lisainsurtech.com",
      whatsapp: "+56998204035",
      whatsappLink: "https://wa.me/56998204035",
      linkedin: "https://www.linkedin.com/company/lisainsurtech",
      contact_channels: "Hablemos",
      write_us: "¿Prefiere escribirnos?",
      email_label: "Correo",
      whatsapp_label: "WhatsApp",
      presence: "Presencia",
      presence_text: "México · Perú · Chile · Argentina",
      linkedin_label: "LinkedIn",
      linkedin_text: "LISA Insurtech",
      disclaimer: "Este formulario es una demostración: los datos no se envían a ningún servidor.",
      success_title: "Mensaje recibido",
      error_banner: "Revise los campos marcados antes de enviar.",
      sending: "Enviando…",
      send_message: "Enviar mensaje",
      send_another: "Enviar otra consulta",
    },
  },
  en: {
    nav: {
      inicio: "Home",
      somos: "About LISA",
      soluciones: "Solutions",
      equipo: "Team",
      hablemos: "Contact",
    },
    hero: {
      eyebrow: "Insurance IA-Driven Future",
      titleLine1: [
        { text: "AI is changing the " },
        { text: "Insurance", accent: true },
      ],
      titleLine2: [
        { text: "Industry" },
      ],
      subtitle: "And you're about to be part of it",
      ctaPrimary: "Discover Solutions",
    },
    intro: {
      title: "Insurance that works for everyone",
      paragraphs: [
        "At LISA we are deeply convinced that insurance should work for everyone: for people, with simpler and more transparent processes, and for insurance companies, understanding all the control and precision they need in payments.",
        "We have spent over 6 years designing and working with different artificial intelligence models, evolving towards agentic models, to guarantee quality and precision in every settlement process.",
      ],
    },
    metrics: [
      { value: "+5M", label: "Claims processed", icon: "document" },
      { value: "10'", label: "Average E2E duration", icon: "clock" },
      { value: "70%", label: "Automatic Settlement (STP)", icon: "spark" },
    ],
    modules_head: {
      eyebrow: "Modular solutions",
      title: "Our solutions adapt to your needs",
    },
    pillars: [
      {
        id: "lisai",
        name: { prefix: "LIS", suffix: "ai", tone: "cyan" },
        title: "Transparent insurance for people",
        text: "Our agentic models translate complex processes into fluid and comprehensible experiences. LISai dynamically and efficiently selects the models that best fit each task, achieving reading and extraction of information from each document with high accuracy.",
        badge: "Real-time identity validation",
      },
      {
        id: "lisux",
        name: { prefix: "LIS", suffix: "ux", tone: "purple" },
        title: "Business rules tailored to each policy",
        text: "We transform our clients' policies into a business rules engine capable of processing all the information necessary to make settlement decisions. Every interaction becomes clear, fair and exceptionally fast.",
        metrics: [
          { value: "99.9%", label: "Accuracy" },
          { value: "<1s", label: "Latency" },
        ],
      },
      {
        id: "fwa",
        name: { prefix: "LISA ", suffix: "FWA", tone: "danger" },
        title: "Fraud prevention embedded in settlement",
        text: "Within our settlement processes we embed multiple fraud prevention controls, based on three fundamental pillars: document forensic analysis, validation with reliable sources and behavioral pattern analysis. Our controls improve account profitability and product competitiveness.",
        pilares: [
          "Document forensic analysis",
          "Validation with external sources",
          "Behavioral pattern analysis",
        ],
        metrics: [
          { label: "Accuracy", value: "60%" },
          { label: "Detection Rate", value: "2%" },
        ],
      },
    ],
    solutions: [
      {
        id: "claims",
        name: "LISA Claims",
        tagline: "Autonomous claims settlement",
        description: "A powerful artificial intelligence agent (LISai) capable of receiving documents, classifying and validating them, and extracting all mandatory information and standardizing it, so it can be processed through the business rules engine (LISux) designed for each company, being able to make settlement decisions in minutes.",
        features: [
          "Automatic document reception and classification",
          "Cognitive extraction with confidence level per field",
          "Business rules engine configurable by company",
          "Settlement decision in minutes, not days",
        ],
        accent: "cyan",
      },
      {
        id: "fwa",
        name: "LISA FWA",
        tagline: "Fraud prevention before payment",
        description: "Designed on three fundamental pillars: a document forensic analysis engine, validation with external sources and machine learning models that predict portfolio behavior in terms of fraud. Fraud prevention controls embedded in the settlement process that execute before payment.",
        features: [
          "Document forensic analysis (metadata, LLM, duplicates, among others)",
          "Validation with external sources and OSINT",
          "Predictive models of portfolio behavior",
          "Controls embedded that execute before payment",
        ],
        accent: "danger",
      },
    ],
    awards: {
      title: "We are champions X2!",
      photoAlt: "LISA representative holding the Zurich Innovation Championship award.",
      year2022: "2022",
      award2022: "Best Idea",
      text2022: "Among 2,600 projects worldwide, LISA becomes the winner of the Zurich Innovation Championship.",
      year2025: "2025",
      award2025: "Greatest impact in LATAM",
    },
    about: {
      resena: {
        title: "We transform claims management with artificial intelligence",
        paragraphs: [
          "LISA is an Insurtech with over 5 years in the market, developing technologies that optimize the insurance industry through the combination of artificial intelligence and human intelligence.",
          "We constantly train new generative AI models, backed by experts in technology, cybersecurity and insurance with over 15 years of experience, which allows us to speak the language of the industry and guarantee success in the implementation of our projects.",
        ],
      },
      proposito: [
        {
          id: "vision",
          label: "Vision",
          icon: "eye",
          text: "To be the leading company in the insurance ecosystem applying cutting-edge technology.",
        },
        {
          id: "mision",
          label: "Mission",
          icon: "spark",
          text: "Generate efficiencies in the insurance ecosystem, applying artificial intelligence to achieve process automation that impacts the satisfaction of the insured.",
        },
      ],
      presencia: {
        eyebrow: "Regional Presence",
        title: "Where we are",
        text: "At LISA we continue working to expand our presence in the region. We are experts in the Latin American insurance market.",
        cifras: [
          { valor: "+30", etiqueta: "FTE" },
          { valor: "6", etiqueta: "países" },
        ],
        nota: "Multicultural LATAM team",
        paises: [
          { id: "cl", nombre: "Chile" },
          { id: "ar", nombre: "Argentina" },
          { id: "mx", nombre: "México" },
          { id: "pe", nombre: "Perú" },
          { id: "br", nombre: "Brasil" },
          { id: "co", nombre: "Colombia" },
        ],
      },
      certification: "Your information, backed by international standards",
      certification_subtitle: "ISO/IEC 27001:2022 Certification",
    },
    team: {
      eyebrow: "Team",
      title: "The team behind LISA",
      intro: "Our team combines years of insurance experience with deep knowledge of cutting-edge technology and cybersecurity. We speak the language of the industry. We are a multicultural and multidisciplinary team located in several countries in the region, providing greater coverage to our clients.",
    },
    testimonials: [
      {
        author: "Laurence Maurice",
        title: "CEO Zurich Insurance Latam",
        text: "Latin America is represented by the Zurich Chile initiative, in collaboration with LISA Insurtech. This technology is already delivering remarkable results, with over 1 million automated claims in 2025 and enormous potential",
      },
      {
        author: "Sebastián Dabini",
        title: "CEO Zurich Argentina (former CEO Chile)",
        text: "Innovation in health is not just efficiency and the cost of manual work, it's also about creating empathy, trust and delivering value to customers. LISA Insurtech incorporates this in its values, which is why we chose them twice as winners in the Zurich Innovation Championship 2022 and 2025",
      },
      {
        author: "Martín Moser",
        title: "INNLAB Program Manager (La Segunda Seguros)",
        text: "With LISA Insurtech we achieved the second success story by settling claims in less than 5 minutes completely automated... Imagine what that means for the customer experience! It's spectacular!",
      },
    ],
    cta_final: {
      title: "Ready for the next step",
      text: "Let's talk about how agentic automation can transform your claims operation.",
      button: "Redefine your processes with LISA",
    },
    contact: {
      form_label: "Contact us",
      name: "Name",
      company: "Company",
      email: "Email",
      phone: "Phone",
      interest: "What solution are you interested in?",
      message: "Message",
      submit: "Send",
      close: "Close",
      interests: [
        { value: "claims", label: "LISA Claims · Claims settlement" },
        { value: "fwa", label: "LISA vigIA · Fraud prevention" },
        { value: "ambos", label: "Both solutions" },
        { value: "otro", label: "Other inquiry" },
      ],
      email_addr: "hello@lisainsurtech.com",
      whatsapp: "+56998204035",
      whatsappLink: "https://wa.me/56998204035",
      linkedin: "https://www.linkedin.com/company/lisainsurtech",
      contact_channels: "Contact us",
      write_us: "Prefer to write us?",
      email_label: "Email",
      whatsapp_label: "WhatsApp",
      presence: "Presence",
      presence_text: "Mexico · Peru · Chile · Argentina",
      linkedin_label: "LinkedIn",
      linkedin_text: "LISA Insurtech",
      disclaimer: "This form is a demonstration: data is not sent to any server.",
      success_title: "Message received",
      error_banner: "Review the marked fields before sending.",
      sending: "Sending…",
      send_message: "Send message",
      send_another: "Send another inquiry",
    },
  },
};

export function useTranslations(lang = "es") {
  return TRANSLATIONS[lang] || TRANSLATIONS.es;
}
