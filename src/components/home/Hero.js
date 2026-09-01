import { h } from "../../vendor/preact.js";
import { Icon } from "../shared/Icon.js";
import { AudioPlayer } from "../shared/AudioPlayer.js";
import { NeuralField } from "../shared/NeuralField.js";
import { HERO, METRICS } from "../../data/content.js";
import { useReveal, useCountUp } from "../../hooks/useReveal.js";

/** Separa un indicador en prefijo, número y sufijo para poder animarlo. */
function parseMetric(raw) {
  const match = raw.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: raw };
  return { prefix: match[1], number: Number(match[2]), suffix: match[3] };
}

function MetricCard({ metric, index, active }) {
  const { prefix, number, suffix } = parseMetric(metric.value);
  const animated = useCountUp(number, active, 1400 + index * 200);
  const isDecimal = !Number.isInteger(number);
  const shown = isDecimal ? animated.toFixed(1) : Math.round(animated);

  return h(
    "li",
    {
      class: `metric ${active ? "is-visible" : ""}`,
      style: { transitionDelay: `${index * 110}ms` },
    },
    h(
      "div",
      { class: "metric__icon" },
      h(Icon, { name: metric.icon, size: 26 })
    ),
    h(
      "p",
      { class: "metric__value u-mono" },
      prefix,
      h("span", null, String(shown)),
      suffix
    ),
    h("p", { class: "metric__label" }, metric.label),
    h("span", { class: "metric__rule" })
  );
}

export function Hero({ onDemo }) {
  const [metricsRef, metricsVisible] = useReveal({ threshold: 0.3 });

  return h(
    "section",
    { class: "hero", id: "inicio" },
    h(NeuralField, { density: 52 }),
    h("div", { class: "hero__glow", "aria-hidden": "true" }),
    h("div", { class: "hero__grid", "aria-hidden": "true" }),

    h(
      "div",
      { class: "hero__inner u-container" },
      h("p", { class: "u-eyebrow hero__eyebrow" }, HERO.eyebrow),

      // Solo las palabras marcadas como acento llevan color.
      h(
        "h1",
        { class: "hero__title" },
        [HERO.titleLine1, HERO.titleLine2].map((line, index) =>
          h(
            "span",
            { key: index, class: "hero__line" },
            line.map((part, i) =>
              part.accent
                ? h("span", { key: i, class: "u-gradient-text" }, part.text)
                : part.text
            )
          )
        )
      ),

      h("p", { class: "hero__subtitle" }, HERO.subtitle),

      h(
        "div",
        { class: "hero__actions" },
        // Un único acceso: abre la ventana para elegir la solución.
        h(
          "button",
          {
            type: "button",
            class: "btn btn--primary btn--lg",
            onClick: onDemo,
          },
          h("span", null, HERO.ctaPrimary),
          h(Icon, { name: "arrow", size: 18 })
        )
      ),

      h(
        "ul",
        { class: "hero__metrics", ref: metricsRef },
        METRICS.map((metric, index) =>
          h(MetricCard, {
            key: metric.label,
            metric,
            index,
            active: metricsVisible,
          })
        )
      ),

      h(
        "div",
        { style: { marginTop: "var(--s-6)" } },
        h(AudioPlayer, {
          src: "assets/voz/narrador.mp3",
          startTime: "0:00",
          endTime: "0:11",
          label: "Escuchar: Al abrir el home",
          speed: 1.2,
        })
      )
    ),

    h(
      "div",
      { class: "hero__scroll", "aria-hidden": "true" },
      h("span", { class: "hero__scroll-line" })
    )
  );
}
