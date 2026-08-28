import { h } from "../../vendor/preact.js";
import { Flag } from "../shared/Flag.js";
import { Icon } from "../shared/Icon.js";
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

    // Reseña de la compañía.
    h(
      "article",
      { class: "about-block" },
      h("p", { class: "u-eyebrow" }, "Quiénes somos"),
      h("h2", { class: "about-block__title" }, ABOUT.resena.title),
      ABOUT.resena.paragraphs.map((texto, i) =>
        h("p", { key: i, class: "about-block__text" }, texto)
      )
    ),

    // Visión y misión, una junto a la otra.
    h(
      "div",
      { class: "purpose" },
      ABOUT.proposito.map((p) =>
        h(
          "article",
          { key: p.id, class: `purpose__card purpose__card--${p.id}` },
          h("span", { class: "purpose__icon" }, h(Icon, { name: p.icon, size: 22 })),
          h("h3", { class: "purpose__label" }, p.label),
          h("p", { class: "purpose__text" }, p.text)
        )
      )
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
        ),

        // Certificaciones
        h(
          "div",
          { class: "presence__certifications" },
          h("img", {
            src: "assets/marcas/iso.jpg",
            alt: "ISO Certified",
            class: "iso-logo",
            loading: "lazy",
            decoding: "async",
          })
        )
      )
    )
  );
}
