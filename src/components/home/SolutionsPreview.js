import { h } from "../../vendor/preact.js";
import { Icon } from "../shared/Icon.js";
import { SolutionName } from "../shared/SolutionName.js";
import { useReveal } from "../../hooks/useReveal.js";
import { useTranslations } from "../../data/i18n.js";

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

    // Indicadores de desempeño específicos (FWA).
    solution.metrics &&
      h(
        "div",
        { class: "solution-card__metrics" },
        solution.metrics.map((metric) =>
          h(
            "div",
            { key: metric.label, class: "metric-item" },
            h("span", { class: "metric-item__value" }, metric.value),
            h("span", { class: "metric-item__label" }, metric.label)
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

export function SolutionsPreview({ onOpenDemo, language }) {
  const t = useTranslations(language);

  return h(
    "section",
    { class: "solutions-preview", id: "soluciones-preview" },
    h(
      "div",
      { class: "u-container" },

      h(
        "header",
        { class: "section-head" },
        h("p", { class: "u-eyebrow" }, t.modules_head.eyebrow),
        h(
          "h2",
          { class: "section-head__title" },
          language === "es" ? "Dos productos, un mismo " : "Two products, one ",
          h("span", { class: "u-gradient-text" }, language === "es" ? "motor agéntico" : "agentic engine")
        )
      ),

      h(
        "div",
        { class: "solutions-preview__grid" },
        t.solutions.map((solution, index) =>
          h(SolutionCard, {
            key: solution.id,
            solution,
            index,
            onOpen: onOpenDemo,
          })
        )
      )
    )
  );
}

/**
 * Cierre de la portada: reconocimientos del sector y llamada a la acción.
 * Van al final, tras haber presentado productos y módulos.
 */
export function Closing({ onNavigate, language }) {
  const t = useTranslations(language);
  const [awardsRef, awardsVisible] = useReveal({ threshold: 0.15 });
  const [ctaRef, ctaVisible] = useReveal({ threshold: 0.3 });

  return h(
    "section",
    { class: "closing" },
    h(
      "div",
      { class: "u-container" },

      // --- Reconocimientos de la industria ---
      h(
        "div",
        { class: `awards ${awardsVisible ? "is-visible" : ""}`, ref: awardsRef },
        h("p", { class: "awards__label" }, language === "es" ? "Respaldados y reconocidos por líderes de la industria" : "Supported and recognized by industry leaders"),
        h(
          "ul",
          { class: "awards__list" },
          t.awards.title && h("li", null, h("p", null, t.awards.title))
        )
      ),

      // --- Llamada a la acción final ---
      h(
        "div",
        { class: `final-cta ${ctaVisible ? "is-visible" : ""}`, ref: ctaRef },
        h("div", { class: "final-cta__glow", "aria-hidden": "true" }),
        h("h2", { class: "final-cta__title" }, t.cta_final.title),
        h("p", { class: "final-cta__text" }, t.cta_final.text),
        h(
          "button",
          {
            type: "button",
            class: "btn btn--primary btn--lg",
            onClick: () => onNavigate("hablemos"),
          },
          h("span", null, t.cta_final.button),
          h(Icon, { name: "arrow", size: 18 })
        )
      )
    )
  );
}
