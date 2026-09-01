import { h, useState, useEffect, useRef, useCallback } from "../../vendor/preact.js";
import { Icon } from "../shared/Icon.js";
import { AudioPlayer } from "../shared/AudioPlayer.js";
import { Modal } from "../shared/Modal.js";
import { useScrollTo } from "../../hooks/useScrollTo.js";
import {
  CLAIM,
  CASE_STATUS,
  STAGES,
  DOCUMENTS,
  MISSING_DOC,
  EXTRACTED_FIELDS,
  RULES,
  RULES_READY,
  DECISION,
} from "../../data/claimsDemo.js";

/**
 * Mockup interactivo de LISA Claims sobre un siniestro de Gastos Médicos.
 *
 * El usuario avanza el proceso paso a paso. Durante la recepción se detecta
 * que falta un documento obligatorio y se le pide aportarlo: hasta entonces
 * el proceso no continúa. Todos los datos son simulados.
 */

/** Documentos que llegan con el expediente. */
const PROVIDED = DOCUMENTS.filter((doc) => doc.provided);

/** Estado de validación de cada documento. */
const ESTADOS = {
  espera: { label: "En espera", icon: "clock", tone: "espera" },
  recibido: { label: "Recibido", icon: "upload", tone: "recibido" },
  validado: { label: "Validado", icon: "check", tone: "validado" },
  pendiente: { label: "Pendiente", icon: "alert", tone: "pendiente" },
};

export function ClaimsDemo({ onGoToFwa }) {
  const [stage, setStage] = useState(0);
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const narrationAudioRef = useRef(null);

  // Recepción: documentos recibidos, validados y receta aportada.
  const [docsIn, setDocsIn] = useState(0);
  const [docsValidated, setDocsValidated] = useState(0);
  const [recetaState, setRecetaState] = useState("ninguno");
  const [askUpload, setAskUpload] = useState(false);

  const [fieldsShown, setFieldsShown] = useState(0);
  const [rulesDone, setRulesDone] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showDecision, setShowDecision] = useState(false);

  const timers = useRef([]);
  const [workRef, scrollToWork, scrollToPanel] = useScrollTo();

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const schedule = useCallback((fn, delay) => {
    const id = window.setTimeout(fn, delay);
    timers.current.push(id);
  }, []);

  /** Devuelve la simulación a su estado inicial. */
  const reset = useCallback(() => {
    clearTimers();
    setStage(0);
    setRunning(false);
    setStarted(false);
    setDocsIn(0);
    setDocsValidated(0);
    setRecetaState("ninguno");
    setAskUpload(false);
    setFieldsShown(0);
    setRulesDone(0);
    setFinished(false);
    setShowDecision(false);
  }, [clearTimers]);

  /** Recepción: llegan dos documentos, se validan y falta la receta. */
  const runReception = useCallback(() => {
    setRunning(true);
    setStarted(true);
    setStage(0);
    scrollToWork();

    // Reproduce audio de explicación (0:42 - 1:18)
    if (narrationAudioRef.current) {
      narrationAudioRef.current.currentTime = 42;
      narrationAudioRef.current.playbackRate = 1.2;
      narrationAudioRef.current.play();
    }

    PROVIDED.forEach((unused, i) => {
      schedule(() => setDocsIn(i + 1), 500 * (i + 1));
    });

    PROVIDED.forEach((unused, i) => {
      schedule(() => setDocsValidated(i + 1), 1400 + 700 * i);
    });

    // La receta aparece como pendiente y se solicita al usuario.
    schedule(() => setRecetaState("pendiente"), 3100);
    schedule(() => {
      setAskUpload(true);
      setRunning(false);
    }, 5100);
  }, [schedule, scrollToWork]);

  /** El usuario aporta la receta: se carga y se valida. */
  const uploadReceta = useCallback(() => {
    setAskUpload(false);
    setRecetaState("cargando");
    setRunning(true);
    schedule(() => setRecetaState("recibido"), 900);
    schedule(() => {
      setRecetaState("validado");
      setRunning(false);
    }, 1900);
  }, [schedule]);

  /** Cierto cuando los paneles se apilan y hay que ir a cada uno. */
  const apilado = () => window.matchMedia("(max-width: 900px)").matches;

  /** Ejecuta la animación de las etapas posteriores a la recepción. */
  const runStage = useCallback(
    (index) => {
      setRunning(true);
      setStage(index);

      if (index === 1) {
        if (apilado()) scrollToPanel(".panel--lisai");
        EXTRACTED_FIELDS.forEach((unused, i) => {
          schedule(() => setFieldsShown(i + 1), 700 * (i + 1));
        });
        schedule(() => setRunning(false), 700 * EXTRACTED_FIELDS.length + 400);
      }

      if (index === 2) {
        if (apilado()) scrollToPanel(".panel--lisux");
        RULES.forEach((unused, i) => {
          schedule(() => setRulesDone(i + 1), 600 * (i + 1));
        });
        schedule(() => setRunning(false), 600 * RULES.length + 400);
      }

      if (index === 3) {
        schedule(() => {
          setFinished(true);
          setShowDecision(true);
          setRunning(false);
        }, 900);
      }
    },
    [schedule, scrollToPanel]
  );

  const next = () => {
    if (running || finished) return;
    if (stage < STAGES.length - 1) runStage(stage + 1);
  };

  // La recepción solo se considera completa con la receta validada.
  const receptionDone = recetaState === "validado";
  const canAdvance = started && !running && !finished && (stage > 0 || receptionDone);
  const allValidated = docsValidated + (receptionDone ? 1 : 0);

  /** Estado de un documento según el momento de la simulación. */
  const docState = (doc, index) => {
    if (!doc.provided) {
      if (recetaState === "ninguno") return "espera";
      if (recetaState === "cargando") return "recibido";
      if (recetaState === "pendiente") return "pendiente";
      return recetaState === "recibido" ? "recibido" : "validado";
    }
    if (index < docsValidated) return "validado";
    if (index < docsIn) return "recibido";
    return "espera";
  };

  return h(
    "div",
    { class: "demo demo--claims" },

    // ---------- Línea de proceso ----------
    h(
      "ol",
      { class: "pipeline", ref: workRef },
      STAGES.map((s, i) =>
        h(
          "li",
          {
            key: s.id,
            class: `pipeline__step ${i < stage || finished ? "is-done" : ""} ${
              i === stage && started ? "is-current" : ""
            }`,
          },
          h(
            "span",
            { class: "pipeline__marker" },
            h(Icon, { name: i < stage || finished ? "check" : s.icon, size: 20 })
          ),
          h("span", { class: "pipeline__label" }, s.label),
          i < STAGES.length - 1 && h("span", { class: "pipeline__track" })
        )
      )
    ),

    // ---------- Audio de bienvenida ----------
    !started &&
      h(
        "div",
        { style: { marginBottom: "var(--s-5)" } },
        h(AudioPlayer, {
          src: "assets/voz/narrador.mp3",
          startTime: "0:12",
          endTime: "0:42",
          label: "Escuchar: Al abrir landing de LISA Claims",
          speed: 1.2,
        })
      ),

    // ---------- Controles ----------
    h(
      "div",
      { class: "demo__controls" },
      h(
        "p",
        { class: "demo__stage-info" },
        h("strong", null, STAGES[stage].title),
        h("span", null, STAGES[stage].description)
      ),
      h(
        "div",
        { class: "demo__buttons" },
        !started &&
          h(
            "button",
            { type: "button", class: "btn btn--primary btn--pulse", onClick: runReception },
            h(Icon, { name: "play", size: 15 }),
            h("span", null, "Iniciar simulación")
          ),
        canAdvance &&
          h(
            "button",
            { type: "button", class: "btn btn--primary btn--pulse", onClick: next },
            h("span", null, "Siguiente etapa"),
            h(Icon, { name: "arrow", size: 16 })
          ),
        running &&
          h(
            "span",
            { class: "demo__working" },
            h("span", { class: "spinner" }),
            "Procesando…"
          ),
        // El reinicio solo se ofrece al terminar todo el proceso.
        finished &&
          h(
            "button",
            { type: "button", class: "btn btn--ghost", onClick: reset },
            h(Icon, { name: "refresh", size: 15 }),
            h("span", null, "Reiniciar")
          )
      )
    ),

    // ---------- Cuerpo ----------
    h(
      "div",
      { class: "demo__body" },

      // Documentos obligatorios
      h(
        "section",
        { class: "panel panel--docs" },
        h(
          "header",
          { class: "panel__head" },
          h("h4", { class: "panel__title" }, "Documentos obligatorios"),
          h("span", { class: "panel__count" }, `${allValidated} archivos`)
        ),
        h(
          "ul",
          { class: "doc-list" },
          DOCUMENTS.map((doc, i) => {
            const state = docState(doc, i);
            const info = ESTADOS[state];
            const visible = state !== "espera";

            // El documento pendiente se puede pulsar para retomar la subida
            // si el visitante cerró la ventana sin aportarlo.
            const pendiente = state === "pendiente";

            const contenido = [
              h(
                "span",
                { class: "doc__thumb" },
                state === "cargando"
                  ? h("span", { class: "spinner" })
                  : h(DocPreview, { doc, active: visible })
              ),
              h(
                "div",
                { class: "doc__info" },
                h("p", { class: "doc__name" }, visible ? doc.name : doc.label),
                h("p", { class: "doc__meta" }, `${doc.type} • ${doc.size}`),
                h(
                  "p",
                  { class: `doc__state doc__state--${info.tone}` },
                  h(Icon, { name: info.icon, size: 13 }),
                  h("span", null, info.label)
                )
              ),
              pendiente &&
                h(
                  "span",
                  { class: "doc__action" },
                  h(Icon, { name: "upload", size: 15 }),
                  h("span", null, "Subir")
                ),
            ];

            return h(
              "li",
              { key: doc.id, class: `doc ${visible ? "is-in" : ""} doc--${state}` },
              pendiente
                ? h(
                    "button",
                    {
                      type: "button",
                      class: "doc__button",
                      onClick: () => setAskUpload(true),
                      "aria-label": `Subir ${doc.label}`,
                    },
                    contenido
                  )
                : contenido
            );
          })
        )
      ),

      // Extracción LISai + reglas LISux
      h(
        "div",
        { class: "demo__stack" },

        h(
          "section",
          { class: `panel panel--lisai ${stage >= 1 ? "is-active" : ""}` },
          h(
            "header",
            { class: "panel__head" },
            h(
              "div",
              { class: "panel__head-left" },
              h("span", { class: "panel__icon" }, h(Icon, { name: "chip", size: 20 })),
              h(
                "div",
                null,
                h("h4", { class: "panel__title" }, "LISai · Extracción cognitiva"),
                h(
                  "p",
                  { class: "panel__sub" },
                  stage >= 1
                    ? `Analizando documento ${Math.min(fieldsShown + 1, DOCUMENTS.length)} de ${DOCUMENTS.length}`
                    : "En espera de recepción"
                )
              )
            ),
            h(
              "span",
              { class: `chip ${finished ? "chip--done" : "chip--model"}` },
              finished ? `${CASE_STATUS.creado} ${CLAIM.numeroCaso}` : CASE_STATUS.pendiente
            )
          ),

          stage < 1
            ? h(
                "p",
                { class: "panel__empty" },
                "El agente comenzará la extracción cuando los documentos estén validados."
              )
            : h(
                "div",
                { class: "fields" },
                EXTRACTED_FIELDS.map((field, i) => {
                  if (i >= fieldsShown) {
                    return h(
                      "div",
                      { key: field.id, class: "field field--pending" },
                      h("p", { class: "field__label" }, field.label),
                      h("span", { class: "field__skeleton" })
                    );
                  }

                  return h(
                    "div",
                    { key: field.id, class: "field" },
                    h(
                      "div",
                      { class: "field__top" },
                      h("p", { class: "field__label" }, field.label),
                      h("span", { class: "field__conf" }, `${field.confidence}%`)
                    ),
                    h(
                      "p",
                      { class: "field__value u-mono" },
                      field.value,
                      h(Icon, { name: "check", size: 15 })
                    ),
                    h("span", {
                      class: "field__bar",
                      style: { width: `${field.confidence}%` },
                    })
                  );
                })
              )
        ),

        h(
          "section",
          { class: `panel panel--lisux ${stage >= 2 ? "is-active" : ""}` },
          h(
            "header",
            { class: "panel__head" },
            h(
              "div",
              { class: "panel__head-left" },
              h("span", { class: "panel__icon" }, h(Icon, { name: "rules", size: 20 })),
              h("h4", { class: "panel__title" }, "LISux · Motor de reglas")
            ),
            h(
              "span",
              { class: "chip" },
              stage >= 2 ? `${rulesDone}/${RULES.length} evaluadas` : "En espera de LISai"
            )
          ),
          h(
            "ul",
            { class: "rules" },
            RULES.map((rule, i) => {
              const done = stage >= 2 && i < rulesDone;
              return h(
                "li",
                { key: rule.id, class: `rule ${done ? "is-done rule--ok" : ""}` },
                h(
                  "span",
                  { class: "rule__marker" },
                  done ? h(Icon, { name: "check", size: 14 }) : null
                ),
                h(
                  "div",
                  { class: "rule__body" },
                  h("p", { class: "rule__label" }, rule.label),
                  done && h("p", { class: "rule__detail" }, rule.detail)
                ),
                done && h("span", { class: "rule__result" }, rule.resultLabel)
              );
            })
          ),

          // Con todas las reglas validadas, el siniestro queda listo.
          rulesDone === RULES.length &&
            h(
              "p",
              { class: "rules__ready" },
              h(Icon, { name: "check", size: 16 }),
              h("span", null, RULES_READY)
            )
        )
      )
    ),

    // ---------- Solicitud del documento que falta ----------
    h(
      Modal,
      {
        open: askUpload,
        onClose: () => setAskUpload(false),
        title: MISSING_DOC.title,
        tone: "warning",
        icon: "alert",
      },
      h("p", null, MISSING_DOC.text),
      h(
        "div",
        { class: "upload" },
        h(
          "button",
          {
            type: "button",
            class: "upload__drop",
            "data-autofocus": true,
            onClick: uploadReceta,
          },
          h("span", { class: "upload__icon" }, h(Icon, { name: "upload", size: 28 })),
          h("span", { class: "upload__action" }, MISSING_DOC.action),
          h("span", { class: "upload__note" }, MISSING_DOC.note)
        )
      )
    ),

    // ---------- Resolución final ----------
    h(
      Modal,
      {
        open: showDecision,
        onClose: () => setShowDecision(false),
        title: DECISION.title,
        tone: "success",
      },
      h(
        "p",
        { class: "decision__lead" },
        h("span", { class: "decision__check" }, h(Icon, { name: "check", size: 18 })),
        h("span", null, DECISION.summary)
      ),
      h(
        "ul",
        { class: "decision__breakdown" },
        DECISION.breakdown.map((row) =>
          h(
            "li",
            { key: row.label, class: row.total ? "is-total" : "" },
            h("span", null, row.label),
            h("span", { class: "u-mono" }, row.value)
          )
        )
      ),
      h(
        "div",
        { class: "handoff" },
        h("p", { class: "handoff__text" }, DECISION.handoff.text),
        h(
          "button",
          {
            type: "button",
            class: "btn btn--primary btn--lg handoff__btn",
            onClick: () => {
              setShowDecision(false);
              if (onGoToFwa) onGoToFwa();
            },
          },
          h("span", { class: "handoff__strong" }, DECISION.handoff.actionStrong),
          h("span", { class: "handoff__soft" }, DECISION.handoff.actionSoft),
          h(Icon, { name: "arrow", size: 18 })
        )
      )
    ),

    // Audio de narración para reproducir al iniciar simulación
    h("audio", {
      ref: narrationAudioRef,
      src: "assets/voz/narrador.mp3",
      preload: "metadata",
    })
  );
}

/**
 * Vista previa del documento.
 * Reproduce el aspecto de una factura, un informe o una receta escaneada.
 */
function DocPreview({ doc, active }) {
  if (!active) return h(Icon, { name: doc.type === "JPG" ? "image" : "file", size: 20 });

  return h(
    "span",
    { class: `doc-preview doc-preview--${doc.id}` },
    h("span", { class: "doc-preview__head" }),
    h(
      "span",
      { class: "doc-preview__lines" },
      Array.from({ length: 5 }, (unused, i) =>
        h("span", { key: i, style: { width: `${90 - ((i * 23) % 45)}%` } })
      )
    )
  );
}
