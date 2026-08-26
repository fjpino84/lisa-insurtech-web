import { h } from "../../vendor/preact.js";

/**
 * Sistema de iconos en SVG inline.
 * Todos los trazos heredan el color del texto (currentColor).
 */

const PATHS = {
  home: "M3 10.5 12 3l9 7.5M5.5 9v11h13V9",
  building: "M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M14 21V9h4a2 2 0 0 1 2 2v10M4 21h17M8 7h2M8 11h2M8 15h2",
  nodes: "M12 5.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM5 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM19 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 5.5v5M12 10.5 6 16M12 10.5 18 16",
  team: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.5 20a6.5 6.5 0 0 1 13 0M17 11.5a3 3 0 1 0 0-6M18 20h3.5a5.5 5.5 0 0 0-3.2-5",
  chat: "M4 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V5a1 1 0 0 1 1-1Z",
  shield: "M12 3l7.5 3v5.5c0 4.5-3 8.5-7.5 10-4.5-1.5-7.5-5.5-7.5-10V6L12 3Z",
  lock: "M12 3l7.5 3v5.5c0 4.5-3 8.5-7.5 10-4.5-1.5-7.5-5.5-7.5-10V6L12 3ZM9.5 12v-1.5a2.5 2.5 0 0 1 5 0V12M9 12h6v4H9z",
  chart: "M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6",
  document: "M6 2h8l4 4v16H6zM14 2v4h4M9 12h6M9 16h6",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3.5 2",
  spark: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM18.5 16.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z",
  upload: "M12 16V4M8 8l4-4 4 4M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3",
  chip: "M7 7h10v10H7zM9.5 9.5h5v5h-5zM12 3v4M12 17v4M3 12h4M17 12h4M7.5 3v4M16.5 3v4M7.5 17v4M16.5 17v4M3 7.5h4M3 16.5h4M17 7.5h4M17 16.5h4",
  rules: "M4 6h7M4 12h7M4 18h7M15 6h5M15 12h5M15 18h5M13 4v4M13 10v4M13 16v4",
  gavel: "m14 3 7 7-2.5 2.5-7-7L14 3ZM10.5 6.5 6 11l7 7 4.5-4.5M3 21h10",
  scan: "M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M8 9h8v6H8z",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.5 2.5 3.8 5.6 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3Z",
  brain: "M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5.2A3 3 0 0 0 6.5 17 3 3 0 0 0 12 19V4.5A2.5 2.5 0 0 0 9 4ZM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5.2A3 3 0 0 1 17.5 17 3 3 0 0 1 12 19",
  person: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0",
  pin: "M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  car: "M5 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM19 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7 15h10M3 15v-3l2-5h14l2 5v3",
  phone: "M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM10.5 18h3",
  wrench: "M15.5 3.5a5 5 0 0 0-5.9 6.4L3 16.5 7.5 21l6.6-6.6a5 5 0 0 0 6.4-5.9l-3 3-2.5-.5-.5-2.5 3-3Z",
  check: "m5 13 4.5 4.5L19 7",
  alert: "M12 4 2.5 20h19L12 4ZM12 10v4M12 17.5v.5",
  close: "M6 6l12 12M18 6 6 18",
  arrow: "M5 12h14M13 6l6 6-6 6",
  play: "M8 5.5v13l11-6.5-11-6.5Z",
  menu: "M4 7h16M4 12h16M4 17h16",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM16 16l5 5",
  bell: "M12 3a6 6 0 0 0-6 6c0 4-2 5-2 5h16s-2-1-2-5a6 6 0 0 0-6-6ZM10 19a2 2 0 0 0 4 0",
  external: "M7 17 17 7M9 7h8v8",
  refresh: "M20 12a8 8 0 1 1-2.3-5.7M20 4v4h-4",
  trophy: "M8 4h8v5a4 4 0 0 1-8 0V4ZM8 6H5.5a2.5 2.5 0 0 0 2.5 4M16 6h2.5a2.5 2.5 0 0 1-2.5 4M10 17h4M9 21h6M12 13v4",
  eye: "M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  file: "M6 2h8l4 4v16H6zM14 2v4h4",
  image: "M4 5h16v14H4zM4 15l4.5-4.5 3 3 3.5-3.5L20 15M9 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  send: "M21 3 3 10.5l7 3 3 7L21 3Z",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
};

const FILLED = new Set(["play"]);

export function Icon({ name, size = 20, className = "", strokeWidth = 1.6 }) {
  const d = PATHS[name];
  if (!d) return null;

  const isFilled = FILLED.has(name);

  return h(
    "svg",
    {
      class: `icon ${className}`.trim(),
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: isFilled ? "currentColor" : "none",
      stroke: isFilled ? "none" : "currentColor",
      "stroke-width": strokeWidth,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": "true",
      focusable: "false",
    },
    h("path", { d })
  );
}
