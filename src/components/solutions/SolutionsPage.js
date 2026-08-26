import { h, useState, useEffect, useCallback } from "../../vendor/preact.js";
import { Icon } from "../shared/Icon.js";
import { ClaimsDemo } from "./ClaimsDemo.js";
import { FwaDemo } from "./FwaDemo.js";
import { DemoHeader } from "./DemoHeader.js";
import { SolutionName } from "../shared/SolutionName.js";
import { SOLUTIONS } from "../../data/content.js";

/**
 * Sección Soluciones: presenta los dos productos y sus mockups interactivos.
 * El producto activo se puede fijar desde fuera mediante `initial`.
 */
export function SolutionsPage({ initial = "claims" }) {
  const [active, setActive] = useState(initial);

  useEffect(() => {
    setActive(initial);
  }, [initial]);

  const solution = SOLUTIONS.find((s) => s.id === active);

  /** Cambia de producto y lleva la vista al inicio de la demostración. */
  const select = useCallback((id) => {
    setActive(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return h(
    "section",
    { class: "page page--solutions", id: "soluciones" },

    // Identidad del producto y su descripción, sobre la demostración.
    h(
      "div",
      { class: "solution-intro" },
      h(DemoHeader, { id: active, tagline: solution.tagline }),
      h("p", { class: "solution-intro__text" }, solution.description)
    ),

    // Mockup interactivo
    h(
      "div",
      {
        class: "demo-frame",
        role: "tabpanel",
        id: `panel-${active}`,
        "aria-labelledby": `tab-${active}`,
      },
      h(
        "div",
        { class: "demo-frame__bar", "aria-hidden": "true" },
        h(
          "span",
          { class: "demo-frame__dots" },
          h("span"),
          h("span"),
          h("span")
        ),
        h(
          "span",
          { class: "demo-frame__url" },
          h(Icon, { name: "lock", size: 12 }),
          active === "claims" ? "app.lisa.la/claims/HM-8942" : "app.lisa.la/vigia/INV-2024-8832"
        ),
        h("span", { class: "demo-frame__label" }, "Entorno de demostración")
      ),
      active === "claims"
        ? h(ClaimsDemo, { onGoToFwa: () => select("fwa") })
        : h(FwaDemo, null)
    ),

    h(
      "p",
      { class: "demo-note" },
      h(Icon, { name: "eye", size: 15 }),
      h(
        "span",
        null,
        "Datos simulados con fines demostrativos. Ninguna información mostrada corresponde a personas o siniestros reales."
      )
    ),

    // Selector de producto, al final de la página.
    h(
      "div",
      { class: "switcher", role: "tablist", "aria-label": "Seleccionar producto" },
      SOLUTIONS.map((item) =>
        h(
          "button",
          {
            key: item.id,
            type: "button",
            role: "tab",
            id: `tab-${item.id}`,
            "aria-selected": active === item.id ? "true" : "false",
            "aria-controls": `panel-${item.id}`,
            class: `switcher__btn switcher__btn--${item.accent} ${active === item.id ? "is-active" : ""}`,
            onClick: () => select(item.id),
          },
          h(Icon, { name: item.id === "claims" ? "chip" : "scan", size: 18 }),
          h(
            "span",
            { class: "switcher__text" },
            h("span", { class: "switcher__name" }, h(SolutionName, { id: item.id })),
            h("span", { class: "switcher__tag" }, item.tagline)
          )
        )
      )
    )
  );
}
