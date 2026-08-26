import { h, useState, useEffect, useRef, useCallback } from "../../vendor/preact.js";
import { Icon } from "../shared/Icon.js";
import { Modal } from "../shared/Modal.js";
import { useScrollTo } from "../../hooks/useScrollTo.js";
import { DeviationChart, CoalitionChart } from "./PatternCharts.js";
import {
  CASE,
  PHASES,
  DOC_MARKS,
  FORENSIC_SIGNALS,
  METADATA,
  VALIDATIONS,
  PATTERNS,
  RELATED_CASES,
  PROVIDER,
  RESOLUTION,
  REPORT,
} from "../../data/fwaDemo.js";

/**
 * Mockup interactivo de LISA vigIA sobre el caso Ramiro Lucas Fiochi.
 *
 * El análisis avanza por fases: forense documental sobre la boleta,
 * validación con el SII y la lista de vigilancia, patrones de cartera y
 * resolución. Los datos proceden del prototipo LISA vigIA.
 */

/** Puntaje de riesgo acumulado al terminar cada fase. */
const PHASE_SCORE = [0, 62, 88, 98, 98];

/** Formatea un importe en pesos chilenos. */
const money = (value) => `$${value.toLocaleString("es-CL")}`;

export function FwaDemo() {
  const [phase, setPhase] = useState(0);
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [marksShown, setMarksShown] = useState(0);
  const [signalsShown, setSignalsShown] = useState(0);
  const [showMeta, setShowMeta] = useState(false);
  const [validationsShown, setValidationsShown] = useState(0);
  const [activeMark, setActiveMark] = useState(null);
  const [finished, setFinished] = useState(false);
  const [showResolution, setShowResolution] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [sending, setSending] = useState(false);
  const [reportSent, setReportSent] = useState(false);

  const timers = useRef([]);
  const [workRef, scrollToWork, scrollToPanel] = useScrollTo();
  const scoreFrame = useRef(0);
  const scoreValue = useRef(0);

  const clearAll = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    window.clearInterval(scoreFrame.current);
  }, []);

  useEffect(() => clearAll, [clearAll]);

  const schedule = useCallback((fn, delay) => {
    const id = window.setTimeout(fn, delay);
    timers.current.push(id);
  }, []);

  /**
   * Anima el puntaje de riesgo hasta el valor objetivo.
   *
   * El punto de partida se lee de una referencia y no del estado, porque la
   * animación se programa con antelación y el valor capturado quedaría
   * obsoleto al ejecutarse.
   */
  const animateScore = useCallback((to) => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      scoreValue.current = to;
      setScore(to);
      return;
    }

    // Se avanza por pasos contados en lugar de por marca de tiempo: así el
    // recuento termina siempre en el valor exacto, aunque el navegador
    // ralentice o agrupe los intervalos.
    const from = scoreValue.current;
    const steps = 30;
    let current = 0;

    window.clearInterval(scoreFrame.current);

    scoreFrame.current = window.setInterval(() => {
      current += 1;
      const p = Math.min(current / steps, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = Math.round(from + (to - from) * eased);

      scoreValue.current = value;
      setScore(value);

      if (p >= 1) window.clearInterval(scoreFrame.current);
    }, 30);
  }, []);

  /** Simula el envío del expediente a la unidad de fraude. */
  const sendReport = useCallback(() => {
    setSending(true);
    schedule(() => {
      setSending(false);
      setReportSent(true);
    }, 1400);
  }, [schedule]);

  const reset = useCallback(() => {
    clearAll();
    setPhase(0);
    setRunning(false);
    setStarted(false);
    scoreValue.current = 0;
    setScore(0);
    setMarksShown(0);
    setSignalsShown(0);
    setShowMeta(false);
    setValidationsShown(0);
    setActiveMark(null);
    setFinished(false);
    setShowResolution(false);
    setShowReport(false);
    setSending(false);
    setReportSent(false);
  }, [clearAll]);

  const runPhase = useCallback(
    (index) => {
      setRunning(true);
      setPhase(index);
      setStarted(true);

      // Fase 1: se marcan las zonas del documento y se listan los hallazgos.
      if (index === 0) {
        scrollToPanel(".panel--doc");
        DOC_MARKS.forEach((unused, i) => {
          schedule(() => setMarksShown(i + 1), 520 * (i + 1));
        });
        FORENSIC_SIGNALS.forEach((unused, i) => {
          schedule(() => setSignalsShown(i + 1), 900 + 520 * i);
        });
        schedule(() => setShowMeta(true), 2900);
        schedule(() => {
          animateScore(PHASE_SCORE[1]);
          setRunning(false);
        }, 3400);
      }

      // Fase 2: validación con fuentes externas.
      if (index === 1) {
        scrollToPanel(".panel--external");
        VALIDATIONS.forEach((unused, i) => {
          schedule(() => setValidationsShown(i + 1), 800 * (i + 1));
        });
        schedule(() => {
          animateScore(PHASE_SCORE[2]);
          setRunning(false);
        }, 2000);
      }

      // Fase 3: patrones de cartera y casos relacionados.
      if (index === 2) {
        scrollToPanel(".panel--patterns");
        schedule(() => {
          animateScore(PHASE_SCORE[3]);
          setRunning(false);
        }, 1800);
      }

      // Fase 4: resolución.
      if (index === 3) {
        scrollToWork();
        schedule(() => {
          setFinished(true);
          setShowResolution(true);
          setRunning(false);
        }, 900);
      }
    },
    [schedule, animateScore, scrollToPanel, scrollToWork]
  );

  const start = () => {
    clearAll();
    scrollToWork();
    scoreValue.current = 0;
    setScore(0);
    setMarksShown(0);
    setSignalsShown(0);
    setShowMeta(false);
    setValidationsShown(0);
    setFinished(false);
    schedule(() => runPhase(0), 60);
  };

  const next = () => {
    if (running || finished) return;
    if (phase < PHASES.length - 1) runPhase(phase + 1);
  };

  const canAdvance = started && !running && !finished && phase < PHASES.length - 1;
  const riskLevel = score >= 80 ? "alto" : score >= 50 ? "medio" : "bajo";
  const mark = DOC_MARKS.find((m) => m.id === activeMark);

  return h(
    "div",
    { class: "demo demo--fwa" },

    // ---------- Cuerpo ----------
    h(
      "div",
      { class: "demo__body demo__body--fwa", ref: workRef },

      // Columna izquierda: documento analizado
      h(
        "div",
        { class: "demo__col" },
        h(
          "section",
          { class: `panel panel--doc ${started ? "is-active" : ""}` },
          h(
            "header",
            { class: "panel__head" },
            h(
              "div",
              { class: "panel__head-left" },
              h("span", { class: "panel__icon panel__icon--danger" }, h(Icon, { name: "scan", size: 20 })),
              h(
                "div",
                null,
                h("h4", { class: "panel__title" }, CASE.documento),
                h("p", { class: "panel__sub" }, `Prestador: ${CASE.prestador}`)
              )
            ),
            marksShown > 0 &&
              h("span", { class: "chip chip--danger" }, `${marksShown} hallazgos`)
          ),

          // Documento con las zonas marcadas
          h(
            "div",
            { class: "boleta" },
            h("img", {
              class: "boleta__img",
              src: "assets/casos/boleta-4761.png",
              alt: `${CASE.documento}, emitida por ${CASE.prestador}`,
              width: 720,
              height: 605,
              decoding: "async",
            }),
            started && h("span", { class: "boleta__scan", "aria-hidden": "true" }),
            DOC_MARKS.slice(0, marksShown).map((m) =>
              h(
                "button",
                {
                  key: m.id,
                  type: "button",
                  class: `boleta__mark boleta__mark--${m.tipo} ${activeMark === m.id ? "is-active" : ""}`,
                  style: {
                    left: `${m.x}%`,
                    top: `${m.y}%`,
                    width: `${m.ancho}%`,
                    height: `${m.alto}%`,
                  },
                  onClick: () => setActiveMark(activeMark === m.id ? null : m.id),
                  "aria-label": `Hallazgo: ${m.etiqueta}`,
                },
                h("span", { class: "boleta__tag" }, m.etiqueta)
              )
            )
          ),

          marksShown > 0 &&
            h(
              "p",
              { class: "boleta__hint" },
              h(Icon, { name: "eye", size: 14 }),
              h("span", null, mark ? mark.detalle : "Pulse sobre una zona marcada para ver el detalle.")
            )
        ),

        // Metadatos del archivo
        showMeta &&
          h(
            "section",
            { class: "panel is-active" },
            h(
              "header",
              { class: "panel__head" },
              h(
                "div",
                { class: "panel__head-left" },
                h("span", { class: "panel__icon panel__icon--danger" }, h(Icon, { name: "file", size: 20 })),
                h("h4", { class: "panel__title" }, "Metadatos del archivo")
              )
            ),
            h(
              "ul",
              { class: "meta-list" },
              h(
                "li",
                null,
                h("span", { class: "meta-list__label" }, "Creación"),
                h("span", { class: "meta-list__value u-mono" }, METADATA.creacion)
              ),
              h(
                "li",
                null,
                h("span", { class: "meta-list__label" }, "Última modificación"),
                h("span", { class: "meta-list__value u-mono" }, METADATA.modificacion)
              ),
              h(
                "li",
                null,
                h("span", { class: "meta-list__label" }, "Software"),
                h("span", { class: "meta-list__value meta-list__value--alert" }, METADATA.software)
              )
            ),
            h("p", { class: "meta-conclusion" }, METADATA.conclusion)
          )
      ),

      // Columna derecha: puntaje, hallazgos, validación y patrones
      h(
        "div",
        { class: "demo__col" },

        // Puntaje de riesgo
        h(
          "section",
          { class: "panel panel--score" },
          h(
            "div",
            { class: "score" },
            h(
              "div",
              null,
              h("p", { class: "score__label" }, "Puntaje de riesgo"),
              h("p", { class: "score__case u-mono" }, `Siniestro ${CASE.id}`)
            ),
            h(
              "p",
              { class: `score__value score__value--${riskLevel} u-mono` },
              score,
              h("span", null, "%")
            )
          ),
          h(
            "div",
            { class: "score__bar" },
            h("span", { class: `score__fill score__fill--${riskLevel}`, style: { width: `${score}%` } })
          ),
          h(
            "dl",
            { class: "score__facts" },
            h("div", null, h("dt", null, "Beneficiario"), h("dd", null, CASE.subject)),
            h("div", null, h("dt", null, "RUT"), h("dd", { class: "u-mono" }, CASE.rut)),
            h("div", null, h("dt", null, "Prestación"), h("dd", null, CASE.prestacion)),
            h("div", null, h("dt", null, "Monto"), h("dd", { class: "u-mono" }, money(CASE.monto)))
          )
        ),

        // Hallazgos forenses
        h(
          "section",
          { class: `panel panel--findings ${signalsShown > 0 ? "is-active" : ""}` },
          h(
            "header",
            { class: "panel__head" },
            h(
              "div",
              { class: "panel__head-left" },
              h("span", { class: "panel__icon" }, h(Icon, { name: "search", size: 20 })),
              h("h4", { class: "panel__title" }, "Hallazgos forenses")
            )
          ),
          signalsShown === 0
            ? h("p", { class: "panel__empty" }, "Inicie el análisis para inspeccionar el documento.")
            : h(
                "ul",
                { class: "signals" },
                FORENSIC_SIGNALS.slice(0, signalsShown).map((signal) =>
                  h(
                    "li",
                    { key: signal.id, class: `signal signal--${signal.severity} is-in` },
                    h(Icon, { name: "alert", size: 15 }),
                    h(
                      "div",
                      null,
                      h("p", { class: "signal__label" }, signal.label),
                      h("p", { class: "signal__detail" }, signal.detail)
                    )
                  )
                )
              )
        ),

        // Validación con fuentes externas
        h(
          "section",
          { class: `panel panel--external ${phase >= 1 ? "is-active" : ""}` },
          h(
            "header",
            { class: "panel__head" },
            h(
              "div",
              { class: "panel__head-left" },
              h("span", { class: "panel__icon" }, h(Icon, { name: "globe", size: 20 })),
              h("h4", { class: "panel__title" }, "Validación externa")
            )
          ),
          phase < 1
            ? h("p", { class: "panel__empty" }, "Pendiente de la fase de fuentes externas.")
            : h(
                "ul",
                { class: "validations" },
                VALIDATIONS.slice(0, validationsShown).map((v) =>
                  h(
                    "li",
                    { key: v.id, class: "validation" },
                    h(
                      "p",
                      { class: "validation__head" },
                      h("span", { class: "validation__source" }, v.fuente),
                      h("span", { class: "validation__title" }, v.titulo)
                    ),
                    h("p", { class: "validation__text" }, v.texto),
                    v.montoReal &&
                      h(
                        "div",
                        { class: "amounts" },
                        h(
                          "div",
                          { class: "amounts__item" },
                          h("span", { class: "amounts__label" }, "Declarado"),
                          h("span", { class: "amounts__value amounts__value--alert u-mono" }, money(v.montoDeclarado))
                        ),
                        h(
                          "div",
                          { class: "amounts__item" },
                          h("span", { class: "amounts__label" }, "Real (SII)"),
                          h("span", { class: "amounts__value u-mono" }, money(v.montoReal))
                        )
                      )
                  )
                )
              )
        )

      )
    ),

    // ---------- Patrones de cartera, a todo el ancho ----------
    h(
      "section",
      { class: `panel panel--patterns ${phase >= 2 ? "is-active" : ""}` },
      h(
        "header",
        { class: "panel__head" },
        h(
          "div",
          { class: "panel__head-left" },
          h("span", { class: "panel__icon" }, h(Icon, { name: "brain", size: 20 })),
          h("h4", { class: "panel__title" }, "Patrones de comportamiento")
        )
      ),
      phase < 2
        ? h("p", { class: "panel__empty" }, "Pendiente de la fase de patrones.")
        : h(
            "div",
            { class: "patterns" },

            // Los dos gráficos del análisis de cartera.
            h(
              "div",
              { class: "patterns__charts" },
              h(
                "div",
                { class: "pattern" },
                h(
                  "p",
                  { class: "pattern__head" },
                  h(Icon, { name: "chart", size: 16 }),
                  h("span", null, PATTERNS.desviacion.titulo)
                ),
                h(DeviationChart, { average: PATTERNS.desviacion.promedio }),
                h("p", { class: "pattern__text" }, PATTERNS.desviacion.texto)
              ),
              h(
                "div",
                { class: "pattern" },
                h(
                  "p",
                  { class: "pattern__head" },
                  h(Icon, { name: "team", size: 16 }),
                  h("span", null, PATTERNS.coalicion.titulo)
                ),
                h(CoalitionChart, null),
                h("p", { class: "pattern__text" }, PATTERNS.coalicion.texto)
              )
            ),

            // Casos relacionados por prestador
            h(
              "div",
              { class: "related" },
              h(
                "p",
                { class: "related__head" },
                h("span", null, "Casos relacionados"),
                h("span", { class: "chip chip--danger" }, PROVIDER.nombre)
              ),
              h(
                "ul",
                { class: "related__list" },
                RELATED_CASES.map((c) =>
                  h(
                    "li",
                    { key: c.id, class: "related__item" },
                    h(
                      "div",
                      { class: "related__main" },
                      h("p", { class: "related__name" }, c.beneficiario),
                      h(
                        "p",
                        { class: "related__meta u-mono" },
                        `${c.id} · ${c.prestacion} · ${money(c.monto)}`
                      )
                    ),
                    h("span", { class: "related__score u-mono" }, `${c.puntaje}%`)
                  )
                )
              )
            )
          )
    ),

    // ---------- Barra de control: recorrido, puntaje y avance ----------
    h(
      "div",
      { class: "deck" },

      // Recorrido por fases
      h(
        "ol",
        { class: "deck__steps", "aria-label": "Fases del análisis" },
        PHASES.map((p, i) =>
          h(
            "li",
            {
              key: p.id,
              class: `deck__step ${i < phase || finished ? "is-done" : ""} ${
                i === phase && started ? "is-current" : ""
              }`,
              title: p.label,
            },
            h("span", { class: "deck__dot" }),
            i < PHASES.length - 1 &&
              h("span", { class: `deck__line ${i < phase || finished ? "is-done" : ""}` })
          )
        )
      ),

      // Fase en curso
      h(
        "div",
        { class: "deck__phase" },
        h("p", { class: "deck__phase-name" }, PHASES[phase].title),
        h(
          "p",
          { class: "deck__phase-hint" },
          started ? `Fase ${phase + 1} de ${PHASES.length}` : "Listo para comenzar"
        )
      ),

      // Puntaje siempre visible
      h(
        "div",
        { class: "deck__score" },
        h("span", { class: "deck__score-label" }, "Riesgo"),
        h("span", { class: `deck__score-value deck__score-value--${riskLevel} u-mono` }, `${score}%`)
      ),

      // Acciones
      h(
        "div",
        { class: "deck__actions" },
        !started &&
          h(
            "button",
            { type: "button", class: "btn btn--danger btn--pulse", onClick: start },
            h(Icon, { name: "play", size: 15 }),
            h("span", null, "Iniciar análisis")
          ),
        canAdvance &&
          h(
            "button",
            { type: "button", class: "btn btn--danger btn--pulse", onClick: next },
            h("span", null, "Siguiente fase"),
            h(Icon, { name: "arrow", size: 16 })
          ),
        running &&
          h(
            "span",
            { class: "demo__working" },
            h("span", { class: "spinner spinner--danger" }),
            "Analizando…"
          ),
        finished &&
          h(
            "button",
            { type: "button", class: "btn btn--ghost", onClick: reset },
            h(Icon, { name: "refresh", size: 15 }),
            h("span", null, "Reiniciar")
          )
      )
    ),

    // ---------- Resolución ----------
    h(
      Modal,
      {
        open: showResolution,
        onClose: () => setShowResolution(false),
        title: RESOLUTION.title,
        tone: "danger",
      },
      h(
        "p",
        { class: "decision__lead" },
        h("span", { class: "decision__check decision__check--alert" }, h(Icon, { name: "alert", size: 18 })),
        h("span", null, RESOLUTION.summary)
      ),
      h(
        "div",
        { class: "resolution__score" },
        h("span", { class: "resolution__score-label" }, "Puntaje de riesgo"),
        h("span", { class: "resolution__score-value u-mono" }, `${RESOLUTION.score}%`)
      ),
      h(
        "ul",
        { class: "resolution__actions" },
        RESOLUTION.actions.map((action) =>
          h(
            "li",
            { key: action },
            h(Icon, { name: "check", size: 15 }),
            h("span", null, action)
          )
        )
      ),
      h(
        "div",
        { class: "resolution__saving" },
        h("span", { class: "resolution__saving-label" }, "Pérdida evitada"),
        h("span", { class: "resolution__saving-value u-mono" }, money(RESOLUTION.savings))
      ),

      // Deriva el expediente a la unidad de investigación.
      h(
        "button",
        {
          type: "button",
          class: "btn btn--danger btn--lg report__cta",
          onClick: () => {
            setShowResolution(false);
            setShowReport(true);
          },
        },
        h(Icon, { name: "send", size: 17 }),
        h("span", null, REPORT.action)
      )
    ),

    // ---------- Envío del reporte ----------
    h(
      Modal,
      {
        open: showReport,
        onClose: () => {
          setShowReport(false);
          setReportSent(false);
        },
        title: reportSent ? REPORT.sentTitle : REPORT.title,
        tone: reportSent ? "success" : "danger",
        icon: reportSent ? "check" : "send",
      },
      reportSent
        ? h(
            "div",
            { class: "report-sent" },
            h("span", { class: "report-sent__icon" }, h(Icon, { name: "check", size: 34 })),
            h("p", { class: "report-sent__text" }, REPORT.sentText),
            h(
              "p",
              { class: "report-sent__to" },
              h(Icon, { name: "mail", size: 15 }),
              h("span", null, REPORT.destino)
            )
          )
        : h(
            "div",
            null,

            // Documento adjunto
            h(
              "div",
              { class: "report-file" },
              h("span", { class: "report-file__icon" }, h(Icon, { name: "file", size: 26 })),
              h(
                "div",
                { class: "report-file__info" },
                h("p", { class: "report-file__name" }, REPORT.file.name),
                h(
                  "p",
                  { class: "report-file__meta" },
                  `PDF · ${REPORT.file.pages} páginas · ${REPORT.file.size}`
                )
              ),
              h("span", { class: "report-file__tag" }, "Adjunto")
            ),

            // Resumen del caso
            h(
              "dl",
              { class: "report-summary" },
              REPORT.resumen.map((row) =>
                h(
                  "div",
                  { key: row.label, class: "report-summary__row" },
                  h("dt", null, row.label),
                  h("dd", { class: row.alert ? "is-alert" : "" }, row.value)
                )
              )
            ),

            // Contenido del expediente
            h(
              "div",
              { class: "report-contents" },
              h("p", { class: "report-contents__title" }, "El reporte incluye"),
              h(
                "ul",
                null,
                REPORT.adjuntos.map((item) =>
                  h(
                    "li",
                    { key: item },
                    h(Icon, { name: "check", size: 14 }),
                    h("span", null, item)
                  )
                )
              )
            ),

            h(
              "p",
              { class: "report-to" },
              h(Icon, { name: "mail", size: 15 }),
              h("span", null, "Destinatario: "),
              h("strong", null, REPORT.destino)
            ),

            h(
              "button",
              {
                type: "button",
                class: "btn btn--danger btn--lg report__send",
                disabled: sending,
                "data-autofocus": true,
                onClick: sendReport,
              },
              sending
                ? h("span", { class: "spinner spinner--danger" })
                : h(Icon, { name: "send", size: 17 }),
              h("span", null, sending ? REPORT.sending : REPORT.send)
            ),

            h("p", { class: "report-note" }, REPORT.note)
          )
    )
  );
}
