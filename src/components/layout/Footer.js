import { h } from "../../vendor/preact.js";
import { Logo } from "../shared/Logo.js";
import { FOOTER } from "../../data/content.js";

export function Footer({ onNavigate }) {
  return h(
    "footer",
    { class: "footer" },
    h(
      "div",
      { class: "footer__inner u-container" },
      h(
        "div",
        { class: "footer__brand" },
        h(Logo, { size: "sm" }),
        h("p", { class: "footer__legal" }, FOOTER.legal)
      ),
      h(
        "nav",
        { class: "footer__nav", "aria-label": "Enlaces legales" },
        h(
          "ul",
          null,
          FOOTER.links.map((link) =>
            h(
              "li",
              { key: link },
              h(
                "a",
                {
                  href: "#hablemos",
                  onClick: (event) => {
                    event.preventDefault();
                    onNavigate("hablemos");
                  },
                },
                link
              )
            )
          )
        )
      ),
      h(
        "ul",
        { class: "footer__social" },
        FOOTER.social.map((item) =>
          h(
            "li",
            { key: item.label },
            h(
              "a",
              { href: item.href, target: "_blank", rel: "noopener noreferrer" },
              item.label
            )
          )
        )
      )
    )
  );
}
