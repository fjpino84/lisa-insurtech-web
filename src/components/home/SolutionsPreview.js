import { h } from "../../vendor/preact.js";
import { Icon } from "../shared/Icon.js";
import { SolutionName } from "../shared/SolutionName.js";
import { SOLUTIONS, AWARDS, CTA_FINAL } from "../../data/content.js";
import { useReveal } from "../../hooks/useReveal.js";

/** Tarjeta de producto con acceso a su demostración interactiva. */
function SolutionCard({ solution, index, onOpen }) {
  const [ref, visible] = useReveal({ threshold: 0.2 });

  return h(
    "article",
    {
      class: `solution-card solution-card--${solution.accent} ${visible ? "is-visible" : ""}`,
      style: { transitionDelay: `${index * 120}ms` },
      ref,
    },
    h("div", { class: "solution-card__glow", "aria-hidden": "true" }),

    h(
      "header",
      { class: "solution-card__head" },
      h(
        "span",
        { class: "solution-card__icon" },
        h(Icon, { name: solution.id === "claims" ? "chip" : "scan", size: 24 })
      ),
      h(
        "div",
        null,
        h("h3", { class: "solution-card__name" }, h(SolutionName, { id: solution.id })),
        h("p", { class: "solution-card__tagline" }, solution.tagline)
      )
    ),

    h("p", { class: "solution-card__text" }, solution.description),

    h(
      "ul",
      { class: "solution-card__features" },
      solution.features.map((feature) =>
        h(
          "li",
          { key: feature },
          h(Icon, { name: "check", size: 15 }),
          h("span", null, feature)
        )
      )
    ),

    h(
      "button",
      {
        type: "button",
        class: "btn btn--outline solution-card__cta",
        onClick: () => onOpen(solution.id),
      },
      h("span", null, "Probar demostración"),
      h(Icon, { name: "arrow", size: 16 })
    )
  );
}

export function SolutionsPreview({ onOpenDemo, onNavigate }) {
  const [awardsRef, awardsVisible] = useReveal({ threshold: 0.15 });
  const [ctaRef, ctaVisible] = useReveal({ threshold: 0.3 });

  return h(
    "section",
    { class: "solutions-preview", id: "soluciones-preview" },
    h(
      "div",
      { class: "u-container" },

      h(
        "header",
        { class: "section-head" },
        h("p", { class: "u-eyebrow" }, "Nuestras Soluciones"),
        h(
          "h2",
          { class: "section-head__title" },
          "3 módulos que garantizan un producto ",
          h("span", { class: "u-gradient-text" }, "flexible")
        )
      ),

      h(
        "div",
        { class: "solutions-preview__grid" },
        SOLUTIONS.map((solution, index) =>
          h(SolutionCard, {
            key: solution.id,
            solution,
            index,
            onOpen: onOpenDemo,
          })
        )
      ),

      // --- Reconocimientos de la industria ---
      h(
        "div",
        { class: `awards ${awardsVisible ? "is-visible" : ""}`, ref: awardsRef },
        h("p", { class: "awards__label" }, "Respaldados y reconocidos por líderes de la industria"),
        h(
          "ul",
          { class: "awards__list" },
          AWARDS.map((award, index) =>
            h(
              "li",
              {
                key: award.org,
                class: "award",
                style: { transitionDelay: `${index * 80}ms` },
              },
              h(
                "span",
                { class: "award__icon" },
                h(Icon, { name: "trophy", size: 20 })
              ),
              h(
                "div",
                null,
                h(
                  "p",
                  { class: "award__org" },
                  award.org,
                  award.highlight &&
                    h("span", { class: "award__badge" }, award.highlight)
                ),
                h("p", { class: "award__detail" }, award.detail)
              )
            )
          )
        )
      ),

      // --- Llamada a la acción final ---
      h(
        "div",
        { class: `final-cta ${ctaVisible ? "is-visible" : ""}`, ref: ctaRef },
        h("div", { class: "final-cta__glow", "aria-hidden": "true" }),
        h("h2", { class: "final-cta__title" }, CTA_FINAL.title),
        h("p", { class: "final-cta__text" }, CTA_FINAL.text),
        h(
          "button",
          {
            type: "button",
            class: "btn btn--primary btn--lg",
            onClick: () => onNavigate("hablemos"),
          },
          h("span", null, CTA_FINAL.button),
          h(Icon, { name: "arrow", size: 18 })
        )
      )
    )
  );
}
