import { h } from "../../vendor/preact.js";
import { ModuleMark } from "../shared/ModuleMark.js";
import { ReadingVisual, DecisionVisual, NetworkVisual } from "./ModuleVisuals.js";
import { INTRO, PILLARS, MODULES_TITLE } from "../../data/content.js";
import { useReveal } from "../../hooks/useReveal.js";

/** Ilustración que acompaña a cada módulo, según su identificador. */
const VISUALS = {
  lisai: ReadingVisual,
  lisux: DecisionVisual,
  fwa: NetworkVisual,
};

function PillarVisual({ pillar }) {
  const Visual = VISUALS[pillar.id];
  if (!Visual) return null;

  return h(
    "div",
    { class: `pillar__visual pillar__visual--${pillar.id}` },
    h(Visual, null)
  );
}

export function Pillars() {
  const [introRef, introVisible] = useReveal();

  return h(
    "section",
    { class: "pillars pillars--intro", id: "propuesta" },
    h(
      "div",
      { class: "u-container" },
      h(
        "div",
        { class: `intro ${introVisible ? "is-visible" : ""}`, ref: introRef },
        h("h2", { class: "intro__title" }, INTRO.title),
        INTRO.paragraphs.map((text, index) =>
          h("p", { key: index, class: "intro__text" }, text)
        )
      )
    )
  );
}

/**
 * Módulos de la plataforma.
 *
 * Van tras la presentación de las soluciones: primero se ve qué resuelve
 * LISA y después de qué piezas se compone.
 */
export function Modules() {
  return h(
    "section",
    { class: "pillars pillars--modules", id: "modulos" },
    h(
      "div",
      { class: "u-container" },

      h(
        "header",
        { class: "section-head" },
        h("p", { class: "u-eyebrow" }, "Arquitectura"),
        h("h2", { class: "section-head__title" }, MODULES_TITLE)
      ),

      h(
        "div",
        { class: "pillars__list" },
        PILLARS.map((pillar, index) => h(PillarRow, { key: pillar.id, pillar, index }))
      )
    )
  );
}

function PillarRow({ pillar, index }) {
  const [ref, visible] = useReveal({ threshold: 0.2 });
  const reversed = index % 2 === 1;

  return h(
    "article",
    {
      class: `pillar ${reversed ? "pillar--reverse" : ""} ${visible ? "is-visible" : ""}`,
      ref,
    },
    h(
      "div",
      { class: "pillar__body" },
      h(ModuleMark, { id: pillar.id }),
      h(
        "p",
        { class: `pillar__name pillar__name--${pillar.name.tone}` },
        h("span", { class: "pillar__name-prefix" }, pillar.name.prefix),
        pillar.name.suffix
      ),
      h("h2", { class: "pillar__title" }, pillar.title),
      h("p", { class: "pillar__text" }, pillar.text)
    ),
    h(PillarVisual, { pillar })
  );
}
