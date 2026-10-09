import { h } from "../../vendor/preact.js";
import { Icon } from "../shared/Icon.js";
import { useReveal } from "../../hooks/useReveal.js";
import { useTranslations } from "../../data/i18n.js";

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

function Member({ person, index, t }) {
  const memberData = t.team.members[person.id];
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
        h("p", { class: "member__role" }, memberData?.cargo || person.cargo)
      ),
      // Atrás: frase + LinkedIn
      memberData?.quote &&
        h(
          "div",
          { class: "member__face member__face--back" },
          h("p", { class: "member__quote" }, memberData.quote),
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

export function Team({ language }) {
  const t = useTranslations(language);
  const [ref, visible] = useReveal({ threshold: 0.1 });
  // Importar TEAM de content.js para obtener la data del equipo
  const TEAM = {
    lead: {
      id: "esteban",
      nombre: "Esteban Izarra",
      cargo: "CEO & Cofounder",
      foto: "assets/equipo/esteban.jpg",
      linkedin: "https://www.linkedin.com/in/estebanizarra",
      quote: "Empezamos con una visión clara: aplicar tecnología avanzada para impulsar el ecosistema asegurador. Hoy, nuestras soluciones de IA son utilizadas por los principales referentes del sector para optimizar procesos, mejorar la toma de decisiones y brindar una mejor experiencia a sus clientes.",
    },
    groups: [
      [
        { id: "loreto", nombre: "Loreto Hernández", cargo: "COO", foto: "assets/equipo/loreto.jpg", quote: "Creo profundamente en el poder de la inteligencia artificial cuando está conectada con necesidades reales de negocio", linkedin: "https://www.linkedin.com/in/loretohernandezk/" },
        { id: "francisco", nombre: "Francisco Pino", cargo: "CCO", foto: "assets/equipo/francisco.jpg", quote: "LISA está provocando un cambio en la industria de seguros, implementando innovación disruptiva con IA para mejorar la relación aseguradora-asegurado y agilizar procesos de forma eficiente y transparente.", linkedin: "https://www.linkedin.com/in/pinnovacionynegocios/" },
        { id: "luis", nombre: "Luis Álvarez", cargo: "CTO", foto: "assets/equipo/luis.jpg", quote: "LISA emplea tecnología avanzada y el potencial de la inteligencia artificial para ofrecer un servicio de excelencias a las empresas de seguros.", linkedin: "https://www.linkedin.com/in/luizoalvarez/" },
      ],
      [
        { id: "diego", nombre: "Diego Ferrochio", cargo: "Head of Operations", foto: "assets/equipo/diego.jpg", quote: "Escalar, innovar y potenciar nuestros equipos de trabajo para liderar la solución de los seguros es una meta que nos mantiene muy enfocados en LISA.", linkedin: "https://www.linkedin.com/company/lisainsurtech" },
        { id: "juan", nombre: "Juan Guilá", cargo: "Head of Customer Success", foto: "assets/equipo/juan.jpg", quote: "El objetivo de la IA es resolver problemas y desafíos, para inventar y reinventar.", linkedin: "https://www.linkedin.com/company/lisainsurtech" },
        { id: "rodrigo", nombre: "Rodrigo Randaro", cargo: "Head of Finance", foto: "assets/equipo/rodrigo.jpg", quote: "Creo en el poder del trabajo colaborativo en el diseño abierto para construir mejores resultados. Me inspira impulsar equipos multidisciplinarios, basados en la confianza, el compromiso y la autonomía de cada persona.", linkedin: "https://www.linkedin.com/company/lisainsurtech" },
      ],
      [
        { id: "marie", nombre: "Marie Merle", cargo: "PMO", foto: "assets/equipo/marie.jpg", quote: "El objetivo de la IA es resolver problemas y desafíos, para inventar y reinventar.", linkedin: "https://www.linkedin.com/company/lisainsurtech" },
        { id: "nicolas", nombre: "Nicolás Nash", cargo: "Senior Product Owner", foto: "assets/equipo/nicolas.jpg", quote: "En LISA buscamos ofrecer soluciones escalables y de gran valor para nuestros clientes, mediante la optimización apoyados en nuestra tecnología.", linkedin: "https://www.linkedin.com/company/lisainsurtech" },
      ],
    ],
  };
  const { lead } = TEAM;

  return h(
    "section",
    { class: `team ${visible ? "is-visible" : ""}`, id: "equipo", ref },

    h(
      "header",
      { class: "team__head" },
      h("p", { class: "u-eyebrow" }, t.team.eyebrow),
      h("h1", { class: "team__title" }, t.team.title),
      h("p", { class: "team__intro" }, t.team.intro)
    ),

    // Fundador, con su testimonio.
    (() => {
      const leadData = t.team.members[lead.id];
      return h(
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
          h("p", { class: "lead-card__role" }, leadData?.cargo || lead.cargo),
          h("blockquote", { class: "lead-card__quote" }, leadData?.quote || lead.quote),
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
      );
    })(),

    // Resto del equipo, una fila por nivel.
    TEAM.groups.map((grupo, g) =>
      h(
        "ul",
        { key: g, class: "team__row" },
        grupo.map((person, i) => h(Member, { key: person.id, person, index: g * 3 + i, t }))
      )
    )
  );
}
