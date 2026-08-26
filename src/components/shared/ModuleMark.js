import { h } from "../../vendor/preact.js";

/**
 * Isotipos de los módulos de la plataforma.
 *
 * Cada uno lleva su color y una forma propia que alude a su función:
 * LISai lee y clasifica, LISux ramifica decisiones y FWA descubre una red.
 * Comparten el mismo encaje geométrico para que se lean como familia.
 */

/** LISai: un documento atravesado por el haz de lectura. */
function MarkLisai() {
  return h(
    "svg",
    { viewBox: "0 0 32 32", class: "mark__svg", "aria-hidden": "true" },
    // Hoja
    h("path", {
      class: "mark__stroke",
      d: "M9 5.5h9l5 5v16a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z",
    }),
    h("path", { class: "mark__stroke", d: "M18 5.5v5h5" }),
    // Renglones extraídos
    h("path", { class: "mark__stroke mark__stroke--thin", d: "M12 16h8M12 20h8M12 24h5" }),
    // Haz que recorre el documento
    h("path", { class: "mark__beam", d: "M4 20h24" }),
    h("circle", { class: "mark__dot", cx: 26, cy: 20, r: 2.4 })
  );
}

/** LISux: una decisión que se ramifica en dos caminos. */
function MarkLisux() {
  return h(
    "svg",
    { viewBox: "0 0 32 32", class: "mark__svg", "aria-hidden": "true" },
    // Ramas
    h("path", { class: "mark__stroke", d: "M16 10v5M16 15l-7 6M16 15l7 6" }),
    // Nodo raíz
    h("circle", { class: "mark__stroke mark__fill", cx: 16, cy: 7, r: 3.6 }),
    // Hojas: la rama elegida va rellena
    h("circle", { class: "mark__stroke", cx: 8, cy: 24, r: 3.4 }),
    h("circle", { class: "mark__stroke mark__fill-solid", cx: 24, cy: 24, r: 3.4 })
  );
}

/** LISA FWA: una red oculta que queda al descubierto. */
function MarkFwa() {
  return h(
    "svg",
    { viewBox: "0 0 32 32", class: "mark__svg", "aria-hidden": "true" },
    // Vínculos hacia el núcleo
    h("path", { class: "mark__stroke mark__stroke--thin", d: "M16 16 7 9M16 16l9-7M16 16l-7 10M16 16l8 9" }),
    // Satélites; dos de ellos marcados
    h("circle", { class: "mark__stroke", cx: 6.5, cy: 8.5, r: 2.6 }),
    h("circle", { class: "mark__stroke mark__fill-solid", cx: 25.5, cy: 8.5, r: 2.6 }),
    h("circle", { class: "mark__stroke mark__fill-solid", cx: 8.5, cy: 26, r: 2.6 }),
    h("circle", { class: "mark__stroke", cx: 24.5, cy: 25.5, r: 2.6 }),
    // Núcleo
    h("circle", { class: "mark__stroke mark__fill", cx: 16, cy: 16, r: 4.6 })
  );
}

const MARKS = {
  lisai: MarkLisai,
  lisux: MarkLisux,
  fwa: MarkFwa,
};

/** Tonos de cada módulo, para el recuadro y el trazo. */
const TONES = {
  lisai: "cyan",
  lisux: "purple",
  fwa: "danger",
};

export function ModuleMark({ id, size = "md" }) {
  const Mark = MARKS[id];
  if (!Mark) return null;

  return h(
    "span",
    { class: `mark mark--${TONES[id]} mark--${size}` },
    h(Mark, null)
  );
}
