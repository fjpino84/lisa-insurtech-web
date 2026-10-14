import { h } from "../../vendor/preact.js";
import { AWARDS } from "../../data/content.js";
import { Icon } from "../shared/Icon.js";
import { useReveal } from "../../hooks/useReveal.js";
import { useTranslations } from "../../data/i18n.js";

export function AwardsSection({ language }) {
  const t = useTranslations(language);
  const [ref, visible] = useReveal({ threshold: 0.1 });

  return h(
    "section",
    { class: `awards-section ${visible ? "is-visible" : ""}`, ref },
    h(
      "div",
      { class: "u-container" },
      h(
        "div",
        { class: "awards" },
        h("p", { class: "awards__label" }, t.awards.label),
        h(
          "ul",
          { class: "awards__list" },
          AWARDS.map((award) =>
            h(
              "li",
              { key: award.org, class: "award" },
              award.highlight &&
                h("span", { class: "award__badge" }, award.highlight),
              h(
                "span",
                { class: "award__icon" },
                h(Icon, { name: "trophy", size: 20 })
              ),
              h(
                "div",
                { class: "award__body" },
                h("p", { class: "award__org" }, award.org),
                h("p", { class: "award__detail" }, award.detail)
              )
            )
          )
        )
      )
    )
  );
}
