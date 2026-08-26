import { h } from "../../vendor/preact.js";
import { ModuleMark } from "../shared/ModuleMark.js";
import { ReadingVisual, DecisionVisual, NetworkVisual } from "./ModuleVisuals.js";
import { INTRO, PILLARS } from "../../data/content.js";
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
    { class: "pillars", id: "propuesta" },
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
