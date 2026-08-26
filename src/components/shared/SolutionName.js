import { h } from "../../vendor/preact.js";

/**
 * Nombre de una solución con las letras "IA" destacadas en su color.
 *
 * LISA clAIms usa el calipso corporativo; LISA vigIA, el rojo de alerta.
 * El nombre se parte en fragmentos para poder colorear solo esas letras,
 * manteniéndolo legible como una sola palabra para lectores de pantalla.
 */

const NAMES = {
  claims: { before: "LISA cl", accent: "AI", after: "ms", tone: "cyan" },
  fwa: { before: "LISA vig", accent: "IA", after: "", tone: "danger" },
};

export function SolutionName({ id, className = "" }) {
  const parts = NAMES[id];
  if (!parts) return null;

  return h(
    "span",
    { class: `sol-name sol-name--${parts.tone} ${className}`.trim() },
    parts.before,
    h("span", { class: "sol-name__ia" }, parts.accent),
    parts.after
  );
}

/** Nombre plano, para atributos de texto como alt o aria-label. */
export function solutionLabel(id) {
  const parts = NAMES[id];
  return parts ? `${parts.before}${parts.accent}${parts.after}` : "";
}
