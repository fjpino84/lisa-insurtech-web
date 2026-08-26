import { h, useEffect, useRef } from "../../vendor/preact.js";
import { Icon } from "./Icon.js";

/**
 * Ventana modal con el estilo de la web.
 * Sustituye a alert/confirm: todo el feedback es visual en el DOM.
 *
 * Gestiona el cierre con Escape, el clic en el fondo y el foco inicial.
 */
export function Modal({ open, onClose, title, tone = "cyan", icon, children, footer }) {
  const panelRef = useRef(null);
  const lastFocused = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    lastFocused.current = document.activeElement;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      // Mantener el foco dentro del diálogo.
      if (event.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const timer = window.setTimeout(() => {
      const target = panelRef.current?.querySelector("[data-autofocus]") ?? panelRef.current;
      target?.focus();
    }, 60);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      window.clearTimeout(timer);
      if (lastFocused.current instanceof HTMLElement) lastFocused.current.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return h(
    "div",
    {
      class: "modal",
      role: "presentation",
      onClick: (event) => {
        if (event.target === event.currentTarget) onClose();
      },
    },
    h(
      "div",
      {
        class: `modal__panel modal__panel--${tone}`,
        role: "dialog",
        "aria-modal": "true",
        "aria-label": title,
        tabIndex: -1,
        ref: panelRef,
      },
      h(
        "header",
        { class: "modal__head" },
        h(
          "h2",
          { class: "modal__title" },
          icon && h("span", { class: "modal__title-icon" }, h(Icon, { name: icon, size: 22 })),
          h("span", null, title)
        ),
        h(
          "button",
          {
            type: "button",
            class: "modal__close",
            onClick: onClose,
            "aria-label": "Cerrar ventana",
          },
          h(Icon, { name: "close", size: 18 })
        )
      ),
      h("div", { class: "modal__body" }, children),
      footer && h("footer", { class: "modal__foot" }, footer)
    )
  );
}
