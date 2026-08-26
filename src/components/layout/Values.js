import { h } from "../../vendor/preact.js";
import { Icon } from "../shared/Icon.js";
import { VALUES } from "../../data/content.js";
import { useReveal } from "../../hooks/useReveal.js";

/**
 * Valores del equipo.
 *
 * El titular se mantiene a la izquierda mientras la lista ocupa el resto del
 * ancho, de modo que los cinco valores se lean de un vistazo.
 */
export function Values() {
  const [ref, visible] = useReveal({ threshold: 0.15 });

  return h(
    "section",
    { class: `values ${visible ? "is-visible" : ""}`, ref },

    h(
      "header",
      { class: "values__head" },
      h(
        "h2",
        { class: "values__title" },
        VALUES.title.map((line, i) =>
          h("span", { key: i, class: "values__title-line" }, line)
        )
      )
    ),

    h(
      "ul",
      { class: "values__list" },
      VALUES.items.map((item, i) =>
        h(
          "li",
          {
            key: item.id,
            class: "value",
            style: { transitionDelay: `${i * 90}ms` },
          },
          h("span", { class: "value__icon" }, h(Icon, { name: item.icon, size: 20 })),
          h(
            "div",
            { class: "value__body" },
            h("p", { class: "value__name" }, item.name),
            h("p", { class: "value__text" }, item.text)
          )
        )
      )
    )
  );
}
