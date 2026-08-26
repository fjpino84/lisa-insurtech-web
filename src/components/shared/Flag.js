import { h } from "../../vendor/preact.js";

/**
 * Banderas de los países donde opera LISA.
 *
 * Se dibujan en SVG en lugar de usar emoji: Windows no muestra los emoji de
 * bandera, y así se ven igual en todos los sistemas. Son representaciones
 * simplificadas, suficientes para identificar cada país a este tamaño.
 */

const ANCHO = 24;
const ALTO = 16;

/** Franjas horizontales, de arriba abajo. */
function horizontales(colores) {
  const alto = ALTO / colores.length;
  return colores.map((color, i) =>
    h("rect", { key: i, x: 0, y: i * alto, width: ANCHO, height: alto, fill: color })
  );
}

/** Franjas verticales, de izquierda a derecha. */
function verticales(colores) {
  const ancho = ANCHO / colores.length;
  return colores.map((color, i) =>
    h("rect", { key: i, x: i * ancho, y: 0, width: ancho, height: ALTO, fill: color })
  );
}

const BANDERAS = {
  // Franja blanca con cantón azul y estrella, y franja roja inferior.
  cl: () => [
    h("rect", { x: 0, y: 0, width: ANCHO, height: ALTO / 2, fill: "#fff" }),
    h("rect", { x: 0, y: ALTO / 2, width: ANCHO, height: ALTO / 2, fill: "#d52b1e" }),
    h("rect", { x: 0, y: 0, width: ANCHO / 3, height: ALTO / 2, fill: "#0039a6" }),
    h("path", {
      fill: "#fff",
      d: "M4 2.4l.62 1.9h2l-1.62 1.18.62 1.9L4 6.2 2.38 7.38 3 5.48 1.38 4.3h2z",
    }),
  ],

  // Celeste, blanco y celeste, con sol al centro.
  ar: () => [
    ...horizontales(["#74acdf", "#fff", "#74acdf"]),
    h("circle", { cx: ANCHO / 2, cy: ALTO / 2, r: 2.4, fill: "#f6b40e" }),
  ],

  // Verde, blanco y rojo, con el escudo insinuado al centro.
  mx: () => [
    ...verticales(["#006847", "#fff", "#ce1126"]),
    h("circle", { cx: ANCHO / 2, cy: ALTO / 2, r: 2, fill: "none", stroke: "#8b5a2b", "stroke-width": 1 }),
  ],

  // Rojo, blanco y rojo en vertical.
  pe: () => verticales(["#d91023", "#fff", "#d91023"]),

  // Verde con rombo amarillo y círculo azul.
  br: () => [
    h("rect", { x: 0, y: 0, width: ANCHO, height: ALTO, fill: "#009b3a" }),
    h("path", { fill: "#fedf00", d: `M${ANCHO / 2} 2 L${ANCHO - 3} ${ALTO / 2} L${ANCHO / 2} ${ALTO - 2} L3 ${ALTO / 2} Z` }),
    h("circle", { cx: ANCHO / 2, cy: ALTO / 2, r: 2.6, fill: "#002776" }),
  ],

  // Amarillo a la mitad, azul y rojo debajo.
  co: () => [
    h("rect", { x: 0, y: 0, width: ANCHO, height: ALTO / 2, fill: "#fcd116" }),
    h("rect", { x: 0, y: ALTO / 2, width: ANCHO, height: ALTO / 4, fill: "#003893" }),
    h("rect", { x: 0, y: (ALTO * 3) / 4, width: ANCHO, height: ALTO / 4, fill: "#ce1126" }),
  ],
};

export function Flag({ id, nombre }) {
  const dibujo = BANDERAS[id];
  if (!dibujo) return null;

  return h(
    "svg",
    {
      class: "flag__svg",
      viewBox: `0 0 ${ANCHO} ${ALTO}`,
      role: "img",
      "aria-label": `Bandera de ${nombre}`,
    },
    dibujo(),
    // Filo sutil, para que las banderas claras no se pierdan sobre el fondo.
    h("rect", {
      x: 0.25,
      y: 0.25,
      width: ANCHO - 0.5,
      height: ALTO - 0.5,
      fill: "none",
      stroke: "rgba(0,0,0,0.28)",
      "stroke-width": 0.5,
    })
  );
}
