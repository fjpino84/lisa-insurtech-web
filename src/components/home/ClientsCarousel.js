import { h } from "../../vendor/preact.js";
import { CLIENTS } from "../../data/content.js";
import { useReveal } from "../../hooks/useReveal.js";
import { useTranslations } from "../../data/i18n.js";

/**
 * Cinta de logos de clientes, en desplazamiento continuo.
 * La lista se duplica para que el bucle sea imperceptible.
 */
export function ClientsCarousel({ language }) {
  const t = useTranslations(language);
  const [ref, visible] = useReveal({ threshold: 0.15 });
  const track = [...CLIENTS, ...CLIENTS];

  return h(
    "section",
    { class: `clients ${visible ? "is-visible" : ""}`, ref },
    h(
      "div",
      { class: "u-container" },
      h("p", { class: "clients__title" }, t.clients.title)
    ),
    h(
      "div",
      { class: "clients__track" },
      h(
        "ul",
        { class: "clients__list" },
        track.map((client, i) =>
          h(
            "li",
            { key: `${client.id}-${i}`, class: "clients__item" },
            h("img", {
              src: client.logo,
              alt: client.name,
              loading: "lazy",
              decoding: "async",
            })
          )
        )
      )
    )
  );
}
