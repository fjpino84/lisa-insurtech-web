import { h } from "../../vendor/preact.js";

/**
 * Marca LISA.
 *
 * Se utiliza el logotipo corporativo original, que ya incluye el isotipo y
 * el texto "LISA Insurtech": no se superpone ningún texto adicional.
 *
 * @param {"sm"|"md"|"lg"} size  Tamaño visual.
 * @param {boolean} markOnly     Muestra solo el isotipo (sin texto), para
 *                               espacios reducidos como la barra móvil.
 */
export function Logo({ size = "md", markOnly = false }) {
  const src = markOnly ? "assets/logo/lisa-isotipo.png" : "assets/logo/lisa-logo.png";

  return h(
    "span",
    { class: `logo logo--${size} ${markOnly ? "logo--mark-only" : ""}` },
    h("img", {
      class: "logo__img",
      src,
      alt: "LISA Insurtech",
      width: markOnly ? 512 : 760,
      height: markOnly ? 379 : 296,
      decoding: "async",
    })
  );
}
