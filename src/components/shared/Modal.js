import { h, useEffect, useRef, useState } from "../../vendor/preact.js";
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
  const velo = useRef(null);

  // Cuando el contenido no cabe en la ventana, se avisa de que hay más abajo.
  const [hayMas, setHayMas] = useState(false);

  // El aviso aparece mientras quede recorrido por debajo.
  useEffect(() => {
    if (!open) return undefined;

    const caja = velo.current;
    if (!caja) return undefined;

    const revisar = () => {
      const restante = caja.scrollHeight - caja.scrollTop - caja.clientHeight;
      setHayMas(restante > 24);
    };

    revisar();
    caja.addEventListener("scroll", revisar, { passive: true });
    window.addEventListener("resize", revisar);

    // El contenido puede crecer tras el primer pintado.
    const t = window.setTimeout(revisar, 300);

    return () => {
      caja.removeEventListener("scroll", revisar);
      window.removeEventListener("resize", revisar);
      window.clearTimeout(t);
    };
  }, [open, children]);

  useEffect(() => {
    if (!open) return undefined;

    lastFocused.current = document.activeElement;
    document.body.style.overflow = "hidden";

    // El modal siempre arranca arriba del todo, sin importar dónde estaba el usuario.
    if (velo.current) velo.current.scrollTop = 0;

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
      ref: velo,
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
    ),

    // Invita a seguir bajando cuando el contenido excede la ventana.
    hayMas &&
      h(
        "button",
        {
          type: "button",
          class: "modal__more",
          "aria-label": "Ver el resto del contenido",
          onClick: () => {
            velo.current?.scrollBy({ top: velo.current.clientHeight * 0.8, behavior: "smooth" });
          },
        },
        h(Icon, { name: "chevronDown", size: 20 })
      )
  );
}
