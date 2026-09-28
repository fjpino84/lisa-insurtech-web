import { h, useState, useRef, useEffect } from "../../vendor/preact.js";
import { Icon } from "../shared/Icon.js";
import { useReveal } from "../../hooks/useReveal.js";
import { useTranslations } from "../../data/i18n.js";

/**
 * Carrusel de testimonios.
 */
export function Testimonials({ language }) {
  const translations = useTranslations(language);
  const [ref, visible] = useReveal({ threshold: 0.15 });
  const [current, setCurrent] = useState(0);
  const autoplayRef = useRef(null);

  const testimonials = translations.testimonials || [];
  const t = testimonials[current];

  // Autoplay cada 8 segundos.
  useEffect(() => {
    if (!visible) return undefined;

    autoplayRef.current = window.setInterval(() => {
      setCurrent((i) => (i + 1) % TESTIMONIALS.length);
    }, 8000);

    return () => window.clearInterval(autoplayRef.current);
  }, [visible]);

  const prev = () => {
    setCurrent((i) => (i - 1 + testimonials.length) % testimonials.length);
    window.clearInterval(autoplayRef.current);
  };

  const next = () => {
    setCurrent((i) => (i + 1) % testimonials.length);
    window.clearInterval(autoplayRef.current);
  };

  return h(
    "section",
    { class: `testimonials ${visible ? "is-visible" : ""}`, ref },
    h(
      "div",
      { class: "u-container" },

      h(
        "header",
        { class: "section-head" },
        h("p", { class: "u-eyebrow" }, language === "es" ? "Lo que dicen de nosotros" : "What they say about us"),
        h("h2", { class: "section-head__title" }, language === "es" ? "Testimonios del sector" : "Industry Testimonials")
      ),

      h(
        "div",
        { class: "testimonial-carousel" },

        // Botón anterior.
        h(
          "button",
          {
            type: "button",
            class: "carousel__nav carousel__nav--prev",
            onClick: prev,
            "aria-label": "Testimonio anterior",
          },
          h(Icon, { name: "arrow", size: 20 })
        ),

        // Testimonio actual.
        h(
          "div",
          { class: "carousel__slide" },
          h("p", { class: "testimonial__text" }, `"${t.text}"`),
          h(
            "div",
            { class: "testimonial__author" },
            h("p", { class: "testimonial__name" }, t.author),
            h("p", { class: "testimonial__title" }, t.title)
          )
        ),

        // Botón siguiente.
        h(
          "button",
          {
            type: "button",
            class: "carousel__nav carousel__nav--next",
            onClick: next,
            "aria-label": "Siguiente testimonio",
          },
          h(Icon, { name: "arrow", size: 20 })
        )
      ),

      // Indicadores.
      h(
        "div",
        { class: "carousel__dots" },
        testimonials.map((_, i) =>
          h(
            "button",
            {
              type: "button",
              key: i,
              class: `carousel__dot ${i === current ? "is-active" : ""}`,
              onClick: () => setCurrent(i),
              "aria-label": `${language === "es" ? "Ir al testimonio" : "Go to testimonial"} ${i + 1}`,
              "aria-current": i === current ? "true" : undefined,
            }
          )
        )
      )
    )
  );
}
