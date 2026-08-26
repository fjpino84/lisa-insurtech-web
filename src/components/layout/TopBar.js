import { h } from "../../vendor/preact.js";
import { Icon } from "../shared/Icon.js";
import { Logo } from "../shared/Logo.js";
import { NAV_ITEMS } from "../../data/content.js";

/**
 * Barra superior de la página de llegada.
 * Se vuelve opaca al hacer scroll y colapsa en menú en móvil.
 */
export function TopBar({ current, onNavigate, scrolled, menuOpen, onToggleMenu }) {
  const items = NAV_ITEMS.filter((item) => item.id !== "hablemos");

  // Fuera del inicio no hay hero a pantalla completa: el menú se muestra
  // opaco desde el principio para que el contenido no se vea por detrás.
  const solid = scrolled || current !== "inicio";

  const go = (event, id) => {
    event.preventDefault();
    onNavigate(id);
  };

  return h(
    "header",
    { class: `topbar ${solid ? "is-scrolled" : ""} ${menuOpen ? "is-open" : ""}` },
    h(
      "div",
      { class: "topbar__inner" },
      h(
        "a",
        {
          href: "#inicio",
          class: "topbar__brand",
          onClick: (event) => go(event, "inicio"),
          "aria-label": "LISA Insurtech, ir al inicio",
        },
        h(Logo, { size: "sm" })
      ),

      h(
        "nav",
        { class: "topbar__nav", "aria-label": "Navegación principal" },
        h(
          "ul",
          { class: "topbar__list" },
          items.map((item) =>
            h(
              "li",
              { key: item.id },
              h(
                "a",
                {
                  href: `#${item.id}`,
                  class: `topbar__link ${current === item.id ? "is-active" : ""}`,
                  "aria-current": current === item.id ? "page" : undefined,
                  onClick: (event) => go(event, item.id),
                },
                h(Icon, { name: item.icon, size: 16 }),
                h("span", null, item.label)
              )
            )
          )
        )
      ),

      h(
        "button",
        {
          type: "button",
          class: "topbar__cta",
          onClick: (event) => go(event, "hablemos"),
        },
        h("span", null, "Hablemos"),
        h(Icon, { name: "chat", size: 16 })
      ),

      h(
        "button",
        {
          type: "button",
          class: "topbar__burger",
          onClick: onToggleMenu,
          "aria-expanded": menuOpen ? "true" : "false",
          "aria-label": menuOpen ? "Cerrar menú" : "Abrir menú",
        },
        h(Icon, { name: menuOpen ? "close" : "menu", size: 22 })
      )
    ),

    // Menú desplegable en móvil.
    h(
      "nav",
      { class: "topbar__mobile", "aria-label": "Navegación móvil", hidden: !menuOpen },
      h(
        "ul",
        null,
        NAV_ITEMS.map((item) =>
          h(
            "li",
            { key: item.id },
            h(
              "a",
              {
                href: `#${item.id}`,
                class: `topbar__mobile-link ${current === item.id ? "is-active" : ""}`,
                onClick: (event) => go(event, item.id),
              },
              h(Icon, { name: item.icon, size: 18 }),
              h("span", null, item.label)
            )
          )
        )
      )
    )
  );
}
