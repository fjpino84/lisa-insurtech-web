/**
 * Internacionalización - Traducciones ES/EN
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
      title1: "La IA está cambiando la",
      title2: "Industria de los Seguros",
      subtitle: "Y tú estás a punto de ser parte",
      cta: "Descubrir Soluciones",
    },
    intro: {
      title: "Un seguro que funcione, y que funcione para todos",
      p1: "En LISA tenemos una profunda convicción por que los seguros funcionen para todos: para las personas, con procesos más simples y transparentes, y para las aseguradoras, entendiendo todo el control y la precisión que necesitan en los pagos.",
      p2: "Llevamos más de 6 años diseñando y trabajando con diferentes modelos de inteligencia artificial, evolucionando hacia modelos agénticos, para garantizar la calidad y precisión en cada proceso de liquidación.",
    },
    metrics: {
      m1: "+5M",
      m1_label: "Siniestros procesados",
      m2: "10'",
      m2_label: "Duración E2E promedio",
      m3: "70%",
      m3_label: "Liquidación Automática (STP)",
    },
    solutions: {
      head_eyebrow: "Soluciones modulares",
      head_title: "Nuestras soluciones se adaptan a sus necesidades",
      claims_name: "LISA Claims",
      claims_tagline: "Liquidación autónoma de siniestros",
      fwa_name: "LISA FWA",
      fwa_tagline: "Prevención de fraude antes del pago",
    },
    contact: {
      form_label: "Hablemos",
      submit: "Enviar",
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
      title1: "AI is changing the",
      title2: "Insurance Industry",
      subtitle: "And you're about to be part of it",
      cta: "Discover Solutions",
    },
    intro: {
      title: "Insurance that works for everyone",
      p1: "At LISA we are deeply convinced that insurance should work for everyone: for people, with simpler and more transparent processes, and for insurance companies, understanding all the control and precision they need in payments.",
      p2: "We have spent over 6 years designing and working with different artificial intelligence models, evolving towards agentic models, to guarantee quality and precision in every settlement process.",
    },
    metrics: {
      m1: "+5M",
      m1_label: "Claims processed",
      m2: "10'",
      m2_label: "Average E2E duration",
      m3: "70%",
      m3_label: "Automatic Settlement (STP)",
    },
    solutions: {
      head_eyebrow: "Modular solutions",
      head_title: "Our solutions adapt to your needs",
      claims_name: "LISA Claims",
      claims_tagline: "Autonomous claims settlement",
      fwa_name: "LISA FWA",
      fwa_tagline: "Fraud prevention before payment",
    },
    contact: {
      form_label: "Contact us",
      submit: "Send",
    },
  },
};

/** Hook para obtener traducciones según idioma */
export function useTranslations(lang = "es") {
  return TRANSLATIONS[lang] || TRANSLATIONS.es;
}
