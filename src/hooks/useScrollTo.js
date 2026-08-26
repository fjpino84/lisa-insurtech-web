import { useCallback, useRef } from "../vendor/preact.js";

/** Margen extra bajo el menú, para que el panel no quede pegado al borde. */
const GAP = 24;

/** Altura del menú fijo, leída de los tokens de estilo. */
function topBarHeight() {
  const styles = getComputedStyle(document.documentElement);
  const bar = parseFloat(styles.getPropertyValue("--h-topbar")) || 9.6;
  const root = parseFloat(styles.fontSize) || 10;
  return bar * root;
}

/** Lleva la vista hasta un elemento, dejándolo justo bajo el menú fijo. */
function scrollToNode(node, offset = 0) {
  if (!node) return;

  // Se aplaza un instante para medir con el estado ya repintado.
  window.setTimeout(() => {
    const top = node.getBoundingClientRect().top + window.scrollY - topBarHeight() - GAP - offset;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: Math.max(top, 0),
      behavior: reduced ? "auto" : "smooth",
    });
  }, 80);
}

/**
 * Desplazamiento dentro de una demostración.
 *
 * Devuelve una referencia para el área de trabajo, una función que lleva la
 * vista hasta ella y otra que la lleva hasta un panel concreto. Así cada
 * etapa puede mostrar el contenido que acaba de aparecer, en lugar de
 * dejarlo fuera de pantalla.
 */
export function useScrollTo() {
  const ref = useRef(null);

  const scrollToRef = useCallback((offset = 0) => {
    scrollToNode(ref.current, offset);
  }, []);

  /**
   * Lleva la vista a un panel de la demostración.
   *
   * El panel puede no existir todavía cuando arranca la etapa, así que se
   * reintenta unas cuantas veces antes de desistir.
   */
  const scrollToPanel = useCallback((selector, offset = 0) => {
    const root = ref.current?.closest(".demo") ?? document;
    let attempts = 0;

    const attempt = () => {
      const node = root.querySelector(selector);
      if (node) {
        scrollToNode(node, offset);
        return;
      }
      attempts += 1;
      if (attempts < 12) window.setTimeout(attempt, 90);
    };

    attempt();
  }, []);

  return [ref, scrollToRef, scrollToPanel];
}
