import { h } from "../../vendor/preact.js";
import { Icon } from "../shared/Icon.js";
import { Champions } from "./Champions.js";
import { Values } from "./Values.js";
import { About } from "./About.js";
import { Team } from "./Team.js";

/**
 * Sección pendiente de contenido definitivo.
 *
 * "Somos LISA" y "Equipo" quedaron marcados como pendientes en la
 * especificación: se entrega la estructura y el diseño, a la espera de los
 * textos y las fotografías reales.
 */
export function Placeholder({ id, eyebrow, title, lead, blocks, note }) {
  return h(
    "section",
    { class: "page page--placeholder", id },
    h(
      "header",
      { class: "page__head" },
      h("p", { class: "u-eyebrow" }, eyebrow),
      h("h1", { class: "page__title" }, title),
      lead && h("p", { class: "page__lead" }, lead)
    ),

    h(
      "div",
      { class: "placeholder__grid" },
      blocks.map((block) =>
        h(
          "article",
          { key: block.label, class: `ph-card ${block.wide ? "ph-card--wide" : ""}` },
          block.avatar
            ? h("span", { class: "ph-card__avatar" }, h(Icon, { name: "person", size: 30 }))
            : h("span", { class: "ph-card__icon" }, h(Icon, { name: block.icon ?? "file", size: 20 })),
          h("p", { class: "ph-card__label" }, block.label),
          h(
            "div",
            { class: "ph-card__lines", "aria-hidden": "true" },
            Array.from({ length: block.lines ?? 3 }, (unused, i) =>
              h("span", { key: i, style: { width: `${92 - i * 18}%` } })
            )
          )
        )
      )
    ),

    h(
      "p",
      { class: "placeholder__note" },
      h(Icon, { name: "alert", size: 15 }),
      h("span", null, note)
    )
  );
}

/** Sección "Somos LISA". */
export function AboutPage() {
  return h(
    "div",
    { class: "about" },
    h(Champions, null),
    h(About, null),
    h(Values, null)
  );
}

/** Sección "Equipo". */
export function TeamPage() {
  return h("div", { class: "about" }, h(Team, null));
}
