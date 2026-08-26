import { h } from "../../vendor/preact.js";
import { Flag } from "../shared/Flag.js";
import { ABOUT } from "../../data/content.js";
import { useReveal } from "../../hooks/useReveal.js";

/**
 * Misión y presencia regional.
 *
 * La presencia se comunica con las banderas de los países donde opera LISA
 * y un par de cifras del equipo, en lugar de un mapa: se lee igual de rápido
 * y se ve nítido a cualquier tamaño.
 */
export function About() {
  const [ref, visible] = useReveal({ threshold: 0.15 });
  const { presencia } = ABOUT;

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
      { class: "about-block about-block--presence" },

      h(
        "div",
        { class: "presence__intro" },
        h("p", { class: "u-eyebrow" }, presencia.eyebrow),
        h("h2", { class: "about-block__title" }, presencia.title),
        h("p", { class: "about-block__text" }, presencia.text)
      ),

      h(
        "div",
        { class: "presence__panel" },

        // Cifras del equipo
        h(
          "div",
          { class: "presence__figures" },
          presencia.cifras.map((c) =>
            h(
              "div",
              { key: c.etiqueta, class: "figure" },
              h("span", { class: "figure__value" }, c.valor),
              h("span", { class: "figure__label" }, c.etiqueta)
            )
          ),
          h("p", { class: "presence__note" }, presencia.nota)
        ),

        // Países donde opera
        h(
          "ul",
          { class: "presence__flags" },
          presencia.paises.map((p, i) =>
            h(
              "li",
              {
                key: p.id,
                class: "flag",
                style: { animationDelay: `${i * 90}ms` },
                title: p.nombre,
              },
              h(Flag, { id: p.id, nombre: p.nombre }),
              h("span", { class: "flag__name" }, p.nombre)
            )
          )
        )
      )
    )
  );
}
