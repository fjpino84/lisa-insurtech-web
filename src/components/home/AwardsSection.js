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
    { class: `awards ${visible ? "is-visible" : ""}`, ref },
    h("p", { class: "awards__label" }, t.awards.label),
    h(
      "ul",
      { class: "awards__list" },
      AWARDS.map((award) =>
        h(
          "li",
          { key: award.org, class: "award" },
          h(Icon, { name: "award", size: 24, class: "award__icon" }),
          h(
            "div",
            null,
            h(
              "div",
              { class: "award__org" },
              h("span", null, award.org),
              award.highlight &&
                h("span", { class: "award__badge" }, award.highlight)
            ),
            h("p", { class: "award__detail" }, award.detail)
          )
        )
      )
    )
  );
}
