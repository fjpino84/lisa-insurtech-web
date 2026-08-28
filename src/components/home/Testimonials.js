import { h, useState, useRef, useEffect } from "../../vendor/preact.js";
import { Icon } from "../shared/Icon.js";
import { TESTIMONIALS } from "../../data/content.js";
import { useReveal } from "../../hooks/useReveal.js";

/**
 * Carrusel de testimonios.
 */
export function Testimonials() {
  const [ref, visible] = useReveal({ threshold: 0.15 });
  const [current, setCurrent] = useState(0);
  const autoplayRef = useRef(null);

  const t = TESTIMONIALS[current];

  // Autoplay cada 8 segundos.
  useEffect(() => {
    if (!visible) return undefined;

    autoplayRef.current = window.setInterval(() => {
      setCurrent((i) => (i + 1) % TESTIMONIALS.length);
    }, 8000);

    return () => window.clearInterval(autoplayRef.current);
  }, [visible]);

  const prev = () => {
    setCurrent((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    window.clearInterval(autoplayRef.current);
  };

  const next = () => {
    setCurrent((i) => (i + 1) % TESTIMONIALS.length);
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
        h("p", { class: "u-eyebrow" }, "Lo que dicen de nosotros"),
        h("h2", { class: "section-head__title" }, "Testimonios del sector")
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
        TESTIMONIALS.map((_, i) =>
          h(
            "button",
            {
              type: "button",
              key: i,
              class: `carousel__dot ${i === current ? "is-active" : ""}`,
              onClick: () => setCurrent(i),
              "aria-label": `Ir al testimonio ${i + 1}`,
              "aria-current": i === current ? "true" : undefined,
            }
          )
        )
      )
    )
  );
}
