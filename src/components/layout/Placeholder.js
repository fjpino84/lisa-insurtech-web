import { h } from "../../vendor/preact.js";
import { Champions } from "./Champions.js";
import { Values } from "./Values.js";
import { About } from "./About.js";
import { Team } from "./Team.js";

/**
 * Páginas "Somos LISA" y "Equipo".
 *
 * Ambas comparten el mismo contenedor centrado; su contenido vive en los
 * componentes que agrupan.
 */

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
