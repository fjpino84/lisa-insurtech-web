import { h } from "../../vendor/preact.js";
import { Icon } from "../shared/Icon.js";
import { SolutionName } from "../shared/SolutionName.js";

/**
 * Encabezado de una demostración: isotipo de la solución y su nombre.
 * Identifica en qué herramienta se encuentra el visitante.
 */
export function DemoHeader({ id, tagline }) {
  const tone = id === "claims" ? "cyan" : "danger";
  const icon = id === "claims" ? "chip" : "scan";

  return h(
    "header",
    { class: `demo-header demo-header--${tone}` },
    h("span", { class: "demo-header__icon" }, h(Icon, { name: icon, size: 26 })),
    h(
      "div",
      { class: "demo-header__text" },
      h("h3", { class: "demo-header__name" }, h(SolutionName, { id })),
      tagline && h("p", { class: "demo-header__tagline" }, tagline)
    )
  );
}
