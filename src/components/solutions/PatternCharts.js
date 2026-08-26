import { h, useState, useRef } from "../../vendor/preact.js";
import { POPULATION, OUTLIERS, COALITION } from "../../data/fwaDemo.js";

/**
 * Gráficos de detección de patrones de LISA vigIA.
 *
 * Reproducen los del prototipo original: una dispersión de montos sobre las
 * bandas de desviación estándar y un grafo de coalición en torno al
 * prestador. Ambos muestran un globo informativo al posar el puntero.
 */

const clp = (value) => `$${value.toLocaleString("es-CL")}`;

/** Globo informativo compartido por los dos gráficos. */
function Tooltip({ data, position }) {
  if (!data) return null;

  return h(
    "div",
    {
      class: "tooltip is-visible",
      role: "tooltip",
      style: { left: `${position.x}px`, top: `${position.y}px` },
    },
    h("p", { class: "tooltip__title" }, data.title),
    data.rows.map(([key, value]) =>
      h(
        "div",
        { key, class: "tooltip__row" },
        h("span", { class: "tooltip__key" }, key),
        h("span", { class: "tooltip__value" }, value)
      )
    )
  );
}

/** Calcula la posición del globo dentro del contenedor. */
function tooltipPosition(event, container) {
  const bounds = container.getBoundingClientRect();
  const x = event.clientX - bounds.left + 16;
  const y = event.clientY - bounds.top + 16;
  const width = 240;
  return {
    x: x + width > bounds.width ? x - width - 32 : x,
    y,
  };
}

/* ==========================================================================
   Dispersión de montos con bandas de desviación
   ========================================================================== */

const W = 760;
const H = 400;
const M = { top: 28, right: 28, bottom: 46, left: 82 };
const PW = W - M.left - M.right;
const PH = H - M.top - M.bottom;

/** Media y desviación estándar de una serie. */
function stats(values) {
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length;
  return { mean, sd: Math.sqrt(variance) };
}

/**
 * Sitúa cada siniestro sobre la banda esperada de la cartera.
 *
 * La escala vertical es de raíz cuadrada: comprime la parte alta del eje
 * para que la banda de desviación siga siendo legible junto a montos diez
 * veces mayores, sin perder de vista lo lejos que quedan los atípicos.
 */
export function DeviationChart({ average }) {
  const [tip, setTip] = useState(null);
  const box = useRef(null);

  const { sd } = stats(POPULATION.map((d) => d.monto));
  const mean = average;
  const maxAmount = Math.max(...OUTLIERS.map((d) => d.monto)) * 1.12;

  const y = (amount) => PH - Math.sqrt(Math.max(amount, 0) / maxAmount) * PH;

  // Los atípicos se intercalan entre la población para comparar de inmediato.
  const total = POPULATION.length + OUTLIERS.length;
  const x = (index) => (PW / (total + 1)) * (index + 1);
  const outlierSlot = (index) => Math.round(((index + 1) * total) / (OUTLIERS.length + 1));

  // Cada punto de la población toma la siguiente ranura libre del eje.
  const taken = new Set(OUTLIERS.map((unused, i) => outlierSlot(i)));
  const slots = [];
  for (let slot = 0; slots.length < POPULATION.length; slot += 1) {
    if (!taken.has(slot)) slots.push(slot);
  }

  const show = (data, rows) => (event) => {
    if (!box.current) return;
    setTip({ data: { title: data.nombre, rows }, position: tooltipPosition(event, box.current) });
  };
  const hide = () => setTip(null);

  // Marcas elegidas a mano: la escala no es lineal y así conserva cifras redondas.
  const ticks = [0, 50000, 150000, 400000, 700000, 1000000].filter((t) => t <= maxAmount);

  return h(
    "div",
    { class: "chart", ref: box },
    h(
      "svg",
      {
        class: "chart__svg",
        viewBox: `0 0 ${W} ${H}`,
        role: "img",
        "aria-label":
          "Dispersión de montos por siniestro: la banda sombreada marca el rango esperado y cuatro casos quedan muy por encima.",
      },
      h(
        "g",
        { transform: `translate(${M.left}, ${M.top})` },

        // Bandas de ±2σ y ±1σ
        [
          { factor: 2, opacity: 0.06 },
          { factor: 1, opacity: 0.1 },
        ].map(({ factor, opacity }) => {
          const top = y(mean + sd * factor);
          const bottom = y(Math.max(mean - sd * factor, 0));
          return h("rect", {
            key: factor,
            class: "chart__band",
            x: 0,
            y: top,
            width: PW,
            height: Math.max(bottom - top, 1),
            opacity,
            rx: 4,
          });
        }),

        // Rejilla y marcas del eje vertical
        ticks.map((tick) =>
          h(
            "g",
            { key: tick },
            h("line", { class: "chart__grid", x1: 0, y1: y(tick), x2: PW, y2: y(tick) }),
            h(
              "text",
              { class: "chart__tick", x: -12, y: y(tick) + 4, "text-anchor": "end" },
              `$${Math.round(tick / 1000)}k`
            )
          )
        ),

        // Promedio histórico
        h("line", { class: "chart__mean", x1: 0, y1: y(mean), x2: PW, y2: y(mean) }),
        h(
          "text",
          { class: "chart__mean-label", x: 6, y: y(mean) - 8 },
          `Promedio histórico ${clp(mean)}`
        ),

        // Población dentro de rango
        POPULATION.map((d, i) =>
          h("circle", {
            key: d.id,
            class: "chart__dot",
            cx: x(slots[i]),
            cy: y(d.monto),
            r: 5,
            onMouseMove: show(d, [
              ["RUT", d.rut],
              ["Documento", d.documento],
              ["Monto", clp(d.monto)],
              ["Prestación", d.prestacion],
              ["Fecha", d.fecha],
            ]),
            onMouseLeave: hide,
          })
        ),

        // Casos atípicos
        OUTLIERS.map((d, i) => {
          const cx = x(outlierSlot(i));
          const cy = y(d.monto);

          return h(
            "g",
            { key: d.id },

            // Halo palpitante sobre el caso en revisión
            d.esCasoActual &&
              h(
                "circle",
                { class: "chart__halo", cx, cy, r: 14 },
                h("animate", {
                  attributeName: "r",
                  values: "12;18;12",
                  dur: "2.4s",
                  repeatCount: "indefinite",
                })
              ),

            // Distancia respecto del promedio
            h("line", { class: "chart__drop", x1: cx, y1: cy, x2: cx, y2: y(mean) }),

            h("circle", {
              class: `chart__dot chart__dot--out ${d.esCasoActual ? "is-current" : ""}`,
              cx,
              cy,
              r: d.esCasoActual ? 8 : 7,
              onMouseMove: show(d, [
                ["RUT", d.rut],
                ["Documento", d.documento],
                ["Monto", clp(d.monto)],
                ["Prestación", d.prestacion],
                ["Fecha", d.fecha],
              ]),
              onMouseLeave: hide,
            }),

            d.esCasoActual &&
              h("text", { class: "chart__tag", x: cx, y: cy - 22, "text-anchor": "middle" }, d.nombre)
          );
        }),

        // Eje inferior
        h("line", { class: "chart__axis", x1: 0, y1: PH, x2: PW, y2: PH }),
        h(
          "text",
          { class: "chart__axis-title", x: PW / 2, y: PH + 30, "text-anchor": "middle" },
          "Siniestros de la misma prestación"
        )
      )
    ),
    h(Tooltip, tip ?? {}),
    h(
      "p",
      { class: "chart__legend" },
      h("span", { class: "chart__key chart__key--band" }, "Rango esperado (±1σ, ±2σ)"),
      h("span", { class: "chart__key chart__key--out" }, "Atípicos"),
      h("span", { class: "chart__key chart__key--cur" }, "Caso investigado")
    )
  );
}

/* ==========================================================================
   Grafo de coalición
   ========================================================================== */

const GW = 760;
const GH = 400;
const CX = GW / 2;
const CY = 176;
const ORBIT = 138;

/**
 * Dispone el prestador en el centro y a su alrededor los pacientes que
 * repiten visitas. El grosor de cada arista refleja el número de visitas,
 * de modo que la concentración del patrón se aprecia de un vistazo.
 */
export function CoalitionChart() {
  const [tip, setTip] = useState(null);
  const box = useRef(null);

  const { prestador, pacientes } = COALITION;
  const maxVisits = Math.max(...pacientes.map((p) => p.visitas));

  // La órbita se achata en vertical para dejar libre la franja del cartel.
  const nodes = pacientes.map((paciente, i) => {
    const angle = (Math.PI * 2 * i) / pacientes.length - Math.PI / 2;
    const sin = Math.sin(angle);
    return {
      paciente,
      x: CX + Math.cos(angle) * ORBIT,
      y: CY + sin * ORBIT * (sin > 0 ? 1.06 : 0.82),
    };
  });

  const show = (p) => (event) => {
    if (!box.current) return;
    setTip({
      data: {
        title: p.nombre,
        rows: [
          ["RUT", p.rut],
          ["Visitas", `${p.visitas} en ${p.dias} días`],
          ["Monto", clp(p.monto)],
          ["Prestador", prestador.nombre],
        ],
      },
      position: tooltipPosition(event, box.current),
    });
  };
  const hide = () => setTip(null);

  return h(
    "div",
    { class: "chart", ref: box },
    h(
      "svg",
      {
        class: "chart__svg",
        viewBox: `0 0 ${GW} ${GH}`,
        role: "img",
        "aria-label": `Red de coalición: ${pacientes.length} pacientes concentran sus visitas en el prestador ${prestador.nombre}.`,
      },

      // Anillos de referencia
      [ORBIT * 0.55, ORBIT].map((radius) =>
        h("ellipse", {
          key: radius,
          class: "graph-ring",
          cx: CX,
          cy: CY,
          rx: radius,
          ry: radius * 0.94,
        })
      ),

      // Aristas: el grosor crece con las visitas
      nodes.map(({ paciente, x, y }) =>
        h(
          "line",
          {
            key: `e-${paciente.id}`,
            class: `graph-edge ${paciente.esCasoActual ? "is-current" : ""}`,
            x1: CX,
            y1: CY,
            x2: x,
            y2: y,
            "stroke-width": 1 + (paciente.visitas / maxVisits) * 4,
          },
          paciente.esCasoActual &&
            h("animate", {
              attributeName: "opacity",
              values: "0.9;0.35;0.9",
              dur: "2.2s",
              repeatCount: "indefinite",
            })
        )
      ),

      // Rótulo de visitas, apartado en perpendicular a la arista
      nodes.map(({ paciente, x, y }) => {
        const length = Math.hypot(x - CX, y - CY) || 1;
        const lower = y > CY;
        const gap = lower ? 34 : 16;
        const along = lower ? 0.78 : 0.5;
        const mx = CX + (x - CX) * along;
        const my = CY + (y - CY) * along;

        return h(
          "text",
          {
            key: `v-${paciente.id}`,
            class: `graph-visits ${paciente.esCasoActual ? "is-current" : ""}`,
            x: mx + (-(y - CY) / length) * gap,
            y: my + ((x - CX) / length) * gap,
            "text-anchor": "middle",
          },
          `${paciente.visitas} visitas`
        );
      }),

      // Pacientes
      nodes.map(({ paciente, x, y }) =>
        h(
          "g",
          {
            key: paciente.id,
            class: `graph-node ${paciente.esCasoActual ? "is-current" : ""}`,
            onMouseMove: show(paciente),
            onMouseLeave: hide,
          },
          h("circle", { class: "graph-node__dot", cx: x, cy: y, r: paciente.esCasoActual ? 22 : 18 }),
          h(
            "text",
            { class: "graph-node__label", x, y: y > CY ? y + 38 : y - 28, "text-anchor": "middle" },
            paciente.nombre
          )
        )
      ),

      // Prestador en el centro
      h("circle", { class: "graph-hub", cx: CX, cy: CY, r: 34 }),
      h("text", { class: "graph-hub__initials", x: CX, y: CY + 6, "text-anchor": "middle" }, "FR"),
      h(
        "text",
        { class: "graph-hub__label", x: CX, y: GH - 28, "text-anchor": "middle" },
        prestador.nombre
      ),
      h(
        "text",
        { class: "graph-hub__meta", x: CX, y: GH - 10, "text-anchor": "middle" },
        `${prestador.rut} · ${pacientes.length} pacientes`
      )
    ),
    h(Tooltip, tip ?? {}),
    h(
      "p",
      { class: "chart__legend" },
      h("span", null, "El grosor del vínculo indica el número de visitas")
    )
  );
}
