import { h } from "../../vendor/preact.js";
import { ABOUT } from "../../data/content.js";
import { useReveal } from "../../hooks/useReveal.js";

/**
 * Misión y presencia regional.
 *
 * El mapa es una silueta esquemática de Latinoamérica: sitúa los cuatro
 * países donde opera LISA sin pretender exactitud cartográfica.
 */

/** Silueta simplificada de Latinoamérica. */
function LatamMap({ paises }) {
  return h(
    "div",
    { class: "latam" },
    h(
      "svg",
      { viewBox: "0 0 100 100", class: "latam__svg", role: "img", "aria-label": "Presencia de LISA en México, Perú, Chile y Argentina." },

      // Contorno esquemático del continente
      h("path", {
        class: "latam__shape",
        d: "M12 18 L30 14 L38 22 L34 30 L40 34 L44 44 L52 42 L60 32 L66 34 L64 44 L56 54 L54 66 L48 78 L44 92 L38 96 L34 88 L38 76 L34 62 L28 52 L22 44 L16 34 Z",
      }),

      // Países donde opera
      paises.map((p) =>
        h(
          "g",
          { key: p.id, class: "latam__place" },
          h("circle", { class: "latam__pulse", cx: p.x, cy: p.y, r: 4 }),
          h("circle", { class: "latam__dot", cx: p.x, cy: p.y, r: 1.8 })
        )
      )
    ),

    h(
      "ul",
      { class: "latam__list" },
      paises.map((p) =>
        h(
          "li",
          { key: p.id },
          h("span", { class: "latam__marker" }),
          h("span", null, p.nombre)
        )
      )
    )
  );
}

export function About() {
  const [ref, visible] = useReveal({ threshold: 0.15 });

  return h(
    "section",
    { class: `about-blocks ${visible ? "is-visible" : ""}`, id: "somos", ref },

    h(
      "article",
      { class: "about-block" },
      h("p", { class: "u-eyebrow" }, "Nuestra misión"),
      h("h2", { class: "about-block__title" }, ABOUT.mision.title),
      h("p", { class: "about-block__text" }, ABOUT.mision.text)
    ),

    h(
      "article",
      { class: "about-block about-block--map" },
      h(
        "div",
        null,
        h("p", { class: "u-eyebrow" }, "Presencia en LATAM"),
        h("h2", { class: "about-block__title" }, ABOUT.presencia.title),
        h("p", { class: "about-block__text" }, ABOUT.presencia.text)
      ),
      h(LatamMap, { paises: ABOUT.presencia.paises })
    )
  );
}
