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
export function AboutPage({ language }) {
  return h(
    "div",
    { class: "about" },
    h(Champions, { language }),
    h(About, { language }),
    h(Values, { language })
  );
}

/** Sección "Equipo". */
export function TeamPage({ language }) {
  return h("div", { class: "about" }, h(Team, { language }));
}
