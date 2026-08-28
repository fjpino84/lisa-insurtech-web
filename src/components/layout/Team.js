import { h } from "../../vendor/preact.js";
import { Icon } from "../shared/Icon.js";
import { TEAM } from "../../data/content.js";
import { useReveal } from "../../hooks/useReveal.js";

/**
 * Sección "Equipo".
 *
 * Encabeza el fundador con su cita y, debajo, el resto del equipo en una
 * retícula uniforme, ordenado de dirección a especialistas.
 */

/** Iniciales, para quien todavía no tiene retrato. */
function iniciales(nombre) {
  return nombre
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
}

function Member({ person, index }) {
  return h(
    "li",
    { class: "member", style: { transitionDelay: `${index * 70}ms` } },
    h(
      "div",
      { class: "member__card" },
      // Frente: foto
      h(
        "div",
        { class: "member__face member__face--front" },
        h(
          "span",
          { class: "member__photo" },
          person.foto
            ? h("img", {
                src: person.foto,
                alt: `Retrato de ${person.nombre}`,
                width: 320,
                height: 320,
                loading: "lazy",
                decoding: "async",
              })
            : h("span", { class: "member__initials" }, iniciales(person.nombre))
        ),
        h("p", { class: "member__name" }, person.nombre),
        h("p", { class: "member__role" }, person.cargo)
      ),
      // Atrás: frase + LinkedIn
      person.quote &&
        h(
          "div",
          { class: "member__face member__face--back" },
          h("p", { class: "member__quote" }, person.quote),
          person.linkedin &&
            h(
              "a",
              {
                class: "member__linkedin",
                href: person.linkedin,
                target: "_blank",
                rel: "noopener noreferrer",
                title: "LinkedIn",
              },
              "in"
            )
        )
    )
  );
}

export function Team() {
  const [ref, visible] = useReveal({ threshold: 0.1 });
  const { lead } = TEAM;

  return h(
    "section",
    { class: `team ${visible ? "is-visible" : ""}`, id: "equipo", ref },

    h(
      "header",
      { class: "team__head" },
      h("p", { class: "u-eyebrow" }, "Equipo"),
      h("h1", { class: "team__title" }, "El equipo detrás de LISA"),
      h("p", { class: "team__intro" }, TEAM.intro)
    ),

    // Fundador, con su testimonio.
    h(
      "article",
      { class: "lead-card" },
      h(
        "span",
        { class: "lead-card__photo" },
        h("img", {
          src: lead.foto,
          alt: `Retrato de ${lead.nombre}`,
          width: 320,
          height: 320,
          decoding: "async",
        })
      ),
      h(
        "div",
        { class: "lead-card__body" },
        h("p", { class: "lead-card__name" }, lead.nombre),
        h("p", { class: "lead-card__role" }, lead.cargo),
        h("blockquote", { class: "lead-card__quote" }, lead.quote),
        h(
          "a",
          {
            class: "lead-card__link",
            href: lead.linkedin,
            target: "_blank",
            rel: "noopener noreferrer",
          },
          h(Icon, { name: "link", size: 15 }),
          h("span", null, "LinkedIn")
        )
      )
    ),

    // Resto del equipo, una fila por nivel.
    TEAM.groups.map((grupo, g) =>
      h(
        "ul",
        { key: g, class: "team__row" },
        grupo.map((person, i) => h(Member, { key: person.id, person, index: g * 3 + i }))
      )
    )
  );
}
