import { h } from "../../vendor/preact.js";
import { CHAMPIONS } from "../../data/content.js";

/**
 * Apertura de "Somos LISA": el doble reconocimiento en el Zurich Innovation
 * Championship, con el emblema a la izquierda y la fotografía a la derecha.
 *
 * El emblema se dibuja en SVG para que respete el fondo del sitio, en lugar
 * de arrastrar el recuadro negro del original.
 */

/** Emblema del certamen: cohete sobre bombilla. */
function ChampionshipMark() {
  return h(
    "svg",
    { viewBox: "0 0 96 104", class: "zic__mark", "aria-hidden": "true" },
    // Bombilla
    h("path", {
      class: "zic__line",
      d: "M48 14c16 0 27 11.5 27 26 0 9-4.5 15-9 20-3 3.4-4.5 6.4-4.5 10.5H32.5c0-4.1-1.5-7.1-4.5-10.5-4.5-5-9-11-9-20 0-14.5 11-26 27-26Z",
    }),
    // Rosca
    h("path", { class: "zic__line", d: "M34 78h28M36 86h24M40 94h16" }),
    // Cohete
    h("path", {
      class: "zic__line",
      d: "M48 26c6 4.5 9.5 11 9.5 18 0 4.6-1.6 8.4-4 11h-11c-2.4-2.6-4-6.4-4-11 0-7 3.5-13.5 9.5-18Z",
    }),
    h("circle", { class: "zic__line", cx: 48, cy: 41, r: 4 }),
    // Aletas
    h("path", { class: "zic__line", d: "M42.5 48c-4 1.5-6 4.5-6.5 8l6.5-3.5M53.5 48c4 1.5 6 4.5 6.5 8l-6.5-3.5" })
  );
}

export function Champions() {
  return h(
    "section",
    { class: "zic" },

    h(
      "div",
      { class: "zic__main" },

      // Emblema del certamen
      h(
        "div",
        { class: "zic__brand" },
        h(ChampionshipMark, null),
        h(
          "div",
          { class: "zic__brand-text" },
          h("p", { class: "zic__brand-name" }, "Innovation"),
          h("p", { class: "zic__brand-name" }, "Championship"),
          h(
            "p",
            { class: "zic__brand-by" },
            "by ",
            h("img", {
              class: "zic__zurich",
              src: "assets/marcas/zurich.png",
              alt: "Zurich",
              width: 300,
              height: 181,
              loading: "lazy",
              decoding: "async",
            })
          )
        )
      ),

      // Reconocimientos
      h(
        "div",
        { class: "zic__body" },
        h("h2", { class: "zic__title" }, CHAMPIONS.title),
        h(
          "ul",
          { class: "zic__list" },
          CHAMPIONS.awards.map((award) =>
            h(
              "li",
              { key: award.year, class: "zic__award" },
              h("span", { class: "zic__year" }, award.year),
              h(
                "div",
                null,
                h("p", { class: "zic__award-name" }, award.name),
                award.text && h("p", { class: "zic__award-text" }, award.text)
              )
            )
          )
        )
      )
    ),

    // Fotografía de la premiación
    h(
      "figure",
      { class: "zic__photo" },
      h("img", {
        src: "assets/premios/zic-esteban.jpg",
        alt: CHAMPIONS.photoAlt,
        width: 990,
        height: 660,
        loading: "lazy",
        decoding: "async",
      })
    )
  );
}
