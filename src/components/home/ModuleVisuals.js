import { h } from "../../vendor/preact.js";

/**
 * Ilustraciones abstractas de cada módulo.
 *
 * No muestran datos: representan el gesto característico de cada uno —
 * clasificar documentos, ramificar decisiones y revelar una red oculta.
 */

/* --- LISai: lectura y clasificación de documentos ------------------------ */

/**
 * Tres documentos entran por la izquierda, un haz los recorre y salen
 * clasificados por tipo hacia la derecha.
 */
export function ReadingVisual() {
  return h(
    "div",
    { class: "mv mv--read" },
    h(
      "svg",
      { viewBox: "0 0 420 260", class: "mv__svg", "aria-hidden": "true" },

      // Documentos entrando en cola
      [0, 1, 2].map((i) =>
        h(
          "g",
          { key: `in-${i}`, class: "mv-doc", style: { animationDelay: `${i * 1.6}s` } },
          h("rect", { class: "mv-doc__page", x: 24, y: 96, width: 58, height: 74, rx: 4 }),
          // Renglones que sugieren texto, sin contenido legible
          [0, 1, 2, 3].map((r) =>
            h("rect", {
              key: r,
              class: "mv-doc__line",
              x: 34,
              y: 110 + r * 13,
              width: r === 3 ? 26 : 38,
              height: 4,
              rx: 2,
            })
          )
        )
      ),

      // Haz de lectura
      h("rect", { class: "mv-beam", x: 176, y: 62, width: 3, height: 142, rx: 1.5 }),
      h("circle", { class: "mv-beam__glow", cx: 177, cy: 133, r: 26 }),

      // Trazas hacia cada categoría
      [
        { y: 74, d: "M186 133 C 240 133, 250 74, 300 74" },
        { y: 133, d: "M186 133 L 300 133" },
        { y: 192, d: "M186 133 C 240 133, 250 192, 300 192" },
      ].map((t, i) =>
        h("path", {
          key: `p-${i}`,
          class: "mv-trace",
          d: t.d,
          style: { animationDelay: `${i * 0.35}s` },
        })
      ),

      // Bandejas de salida por tipo
      [74, 133, 192].map((y, i) =>
        h(
          "g",
          { key: `out-${i}`, class: "mv-tray", style: { animationDelay: `${i * 0.35 + 0.5}s` } },
          h("rect", { class: "mv-tray__box", x: 308, y: y - 21, width: 84, height: 42, rx: 6 }),
          h("rect", { class: "mv-tray__bar", x: 320, y: y - 7, width: 44, height: 4, rx: 2 }),
          h("rect", { class: "mv-tray__bar", x: 320, y: y + 3, width: 28, height: 4, rx: 2 })
        )
      )
    )
  );
}

/* --- LISux: árbol de decisiones ------------------------------------------ */

/**
 * El siniestro desciende por un árbol de reglas: en cada nodo se evalúa una
 * condición y el recorrido continúa por la rama que corresponde.
 */
export function DecisionVisual() {
  // Árbol descrito por relaciones padre-hijo: las ramas y el recorrido se
  // derivan de aquí, de modo que no puedan desincronizarse entre sí.
  const nodos = [
    { x: 210, y: 40, padre: null },
    { x: 120, y: 112, padre: 0 },
    { x: 300, y: 112, padre: 0 },
    { x: 74, y: 190, padre: 1 },
    { x: 166, y: 190, padre: 1 },
    { x: 256, y: 190, padre: 2 },
    { x: 346, y: 190, padre: 2 },
  ];

  /** Recorrido que sigue el siniestro, de la raíz a la hoja resuelta. */
  const camino = [0, 2, 5];

  const RADIO = 12;
  const PASO = 0.9;

  /** Traza entre dos nodos, recortada para no invadir sus círculos. */
  const rama = (desde, hasta) => {
    const dx = hasta.x - desde.x;
    const dy = hasta.y - desde.y;
    const largo = Math.hypot(dx, dy) || 1;
    const ux = dx / largo;
    const uy = dy / largo;
    return `M${desde.x + ux * RADIO} ${desde.y + uy * RADIO} L${hasta.x - ux * RADIO} ${hasta.y - uy * RADIO}`;
  };

  // La hoja del recorrido marca dónde se sitúa la resolución.
  const hoja = nodos[camino[camino.length - 1]];

  return h(
    "div",
    { class: "mv mv--tree" },
    h(
      "svg",
      { viewBox: "0 0 420 240", class: "mv__svg", "aria-hidden": "true" },

      // Ramas: se resalta la del recorrido, en el orden en que se recorre.
      nodos.map((n, i) => {
        if (n.padre === null) return null;

        const d = rama(nodos[n.padre], n);
        const paso = camino.indexOf(i);
        const enCamino = paso > 0 && camino[paso - 1] === n.padre;

        return h(
          "g",
          { key: `b-${i}` },
          h("path", { class: "mv-branch", d }),
          enCamino &&
            h("path", {
              class: "mv-branch mv-branch--live",
              d,
              style: { animationDelay: `${(paso - 1) * PASO + 0.3}s` },
            })
        );
      }),

      // Nodos: los del recorrido se encienden en secuencia.
      nodos.map((n, i) => {
        const paso = camino.indexOf(i);
        const activo = paso !== -1;
        const retardo = `${Math.max(paso, 0) * PASO}s`;

        return h(
          "g",
          { key: `n-${i}` },
          activo &&
            h("circle", {
              class: "mv-node__halo",
              cx: n.x,
              cy: n.y,
              r: 18,
              style: { animationDelay: retardo },
            }),
          h("circle", {
            class: `mv-node ${activo ? "is-live" : ""}`,
            cx: n.x,
            cy: n.y,
            r: RADIO,
            style: activo ? { animationDelay: retardo } : undefined,
          }),
          h("rect", { class: "mv-node__mark", x: n.x - 5, y: n.y - 1.5, width: 10, height: 3, rx: 1.5 })
        );
      }),

      // Resolución, bajo la hoja alcanzada.
      h("rect", {
        class: "mv-outcome",
        x: hoja.x - 42,
        y: 214,
        width: 84,
        height: 18,
        rx: 9,
      })
    )
  );
}

/* --- LISA FWA: red de coalición ------------------------------------------ */

/**
 * Una red que emerge de la nada: nodos dispersos que se revelan conectados
 * en torno a un centro, el gesto de hacer visible lo invisible.
 */
export function NetworkVisual() {
  const CX = 210;
  const CY = 130;
  const R = 82;

  const satelites = Array.from({ length: 7 }, (unused, i) => {
    const a = (Math.PI * 2 * i) / 7 - Math.PI / 2;
    return {
      x: CX + Math.cos(a) * R,
      y: CY + Math.sin(a) * R * 0.9,
      // Tres de ellos forman el patrón sospechoso.
      alerta: i === 1 || i === 3 || i === 5,
    };
  });

  return h(
    "div",
    { class: "mv mv--net" },
    h(
      "svg",
      { viewBox: "0 0 420 260", class: "mv__svg", "aria-hidden": "true" },

      // Anillos de referencia
      [R * 0.55, R].map((r) =>
        h("ellipse", { key: r, class: "mv-ring", cx: CX, cy: CY, rx: r, ry: r * 0.9 })
      ),

      // Vínculos que se van revelando
      satelites.map((s, i) =>
        h("line", {
          key: `l-${i}`,
          class: `mv-link ${s.alerta ? "is-alert" : ""}`,
          x1: CX,
          y1: CY,
          x2: s.x,
          y2: s.y,
          style: { animationDelay: `${i * 0.22}s` },
        })
      ),

      // Nodos periféricos
      satelites.map((s, i) =>
        h(
          "g",
          { key: `n-${i}`, style: { animationDelay: `${i * 0.22 + 0.2}s` }, class: "mv-sat" },
          s.alerta && h("circle", { class: "mv-sat__halo", cx: s.x, cy: s.y, r: 15 }),
          h("circle", { class: `mv-sat__dot ${s.alerta ? "is-alert" : ""}`, cx: s.x, cy: s.y, r: 9 })
        )
      ),

      // Núcleo de la red
      h("circle", { class: "mv-core__pulse", cx: CX, cy: CY, r: 30 }),
      h("circle", { class: "mv-core", cx: CX, cy: CY, r: 20 }),

      // Barrido que revela la red
      h("rect", { class: "mv-sweep", x: 0, y: 0, width: 420, height: 3 })
    )
  );
}
