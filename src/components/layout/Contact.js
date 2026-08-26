import { h, useState } from "../../vendor/preact.js";
import { Icon } from "../shared/Icon.js";
import { CONTACT } from "../../data/content.js";

/**
 * Formulario de contacto "Hablemos".
 *
 * La validación y todo el feedback son visuales en el DOM: no se utilizan
 * alert, confirm ni prompt. El envío se simula, ya que no hay backend.
 */

const INITIAL = {
  nombre: "",
  empresa: "",
  email: "",
  telefono: "",
  interes: "claims",
  mensaje: "",
};

const INTERESTS = [
  { value: "claims", label: "LISA Claims · Liquidación de siniestros" },
  { value: "fwa", label: "LISA vigIA · Prevención de fraude" },
  { value: "ambos", label: "Ambas soluciones" },
  { value: "otro", label: "Otra consulta" },
];

/** Valida los campos y devuelve un objeto de errores. */
function validate(values) {
  const errors = {};

  if (!values.nombre.trim()) {
    errors.nombre = "Indique su nombre.";
  }

  if (!values.email.trim()) {
    errors.email = "Indique un correo de contacto.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "El formato del correo no es válido.";
  }

  if (!values.empresa.trim()) {
    errors.empresa = "Indique la compañía.";
  }

  if (values.mensaje.trim().length < 12) {
    errors.mensaje = "Cuéntenos brevemente su necesidad (mínimo 12 caracteres).";
  }

  return errors;
}

export function Contact() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const update = (field) => (event) => {
    const { value } = event.currentTarget;
    setValues((prev) => ({ ...prev, [field]: value }));
    // Limpiar el error del campo en cuanto el usuario corrige.
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus("error");
      // Llevar el foco al primer campo con error.
      const first = document.getElementById(`campo-${Object.keys(found)[0]}`);
      first?.focus();
      return;
    }

    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 1100);
  };

  const reset = (event) => {
    event.preventDefault();
    setValues(INITIAL);
    setErrors({});
    setStatus("idle");
  };

  const field = (name, label, type = "text", extra = {}) =>
    h(
      "p",
      { class: `field-group ${errors[name] ? "has-error" : ""}` },
      h("label", { class: "field-group__label", for: `campo-${name}` }, label),
      h(
        type === "textarea" ? "textarea" : "input",
        {
          id: `campo-${name}`,
          name,
          class: "field-group__input",
          type: type === "textarea" ? undefined : type,
          value: values[name],
          onInput: update(name),
          "aria-invalid": errors[name] ? "true" : "false",
          "aria-describedby": errors[name] ? `error-${name}` : undefined,
          ...extra,
        }
      ),
      errors[name] &&
        h(
          "span",
          { class: "field-group__error", id: `error-${name}`, role: "alert" },
          h(Icon, { name: "alert", size: 13 }),
          h("span", null, errors[name])
        )
    );

  if (status === "sent") {
    return h(
      "section",
      { class: "page page--contact", id: "hablemos" },
      h(
        "div",
        { class: "contact-success" },
        h("span", { class: "contact-success__icon" }, h(Icon, { name: "check", size: 34 })),
        h("h2", { class: "contact-success__title" }, "Mensaje recibido"),
        h(
          "p",
          { class: "contact-success__text" },
          `Gracias, ${values.nombre.split(" ")[0]}. Nuestro equipo se pondrá en contacto con usted a la brevedad.`
        ),
        h(
          "button",
          { type: "button", class: "btn btn--outline", onClick: reset },
          h(Icon, { name: "refresh", size: 15 }),
          h("span", null, "Enviar otra consulta")
        )
      )
    );
  }

  return h(
    "section",
    { class: "page page--contact", id: "hablemos" },
    h(
      "header",
      { class: "page__head" },
      h("p", { class: "u-eyebrow" }, "Hablemos"),
      h(
        "h1",
        { class: "page__title" },
        "Redefina sus procesos ",
        h("span", { class: "u-gradient-text" }, "con LISA")
      ),
      h(
        "p",
        { class: "page__lead" },
        "Cuéntenos sobre su operación y le mostraremos cómo la automatización agéntica puede transformarla."
      )
    ),

    h(
      "div",
      { class: "contact" },
      h(
        "form",
        { class: "contact__form", onSubmit, noValidate: true },
        h(
          "div",
          { class: "contact__row" },
          field("nombre", "Nombre y apellidos", "text", { autocomplete: "name" }),
          field("empresa", "Compañía", "text", { autocomplete: "organization" })
        ),
        h(
          "div",
          { class: "contact__row" },
          field("email", "Correo corporativo", "email", { autocomplete: "email" }),
          field("telefono", "Teléfono (opcional)", "tel", { autocomplete: "tel" })
        ),

        h(
          "p",
          { class: "field-group" },
          h("label", { class: "field-group__label", for: "campo-interes" }, "Solución de interés"),
          h(
            "select",
            {
              id: "campo-interes",
              class: "field-group__input",
              value: values.interes,
              onChange: update("interes"),
            },
            INTERESTS.map((option) =>
              h("option", { key: option.value, value: option.value }, option.label)
            )
          )
        ),

        field("mensaje", "¿En qué podemos ayudarle?", "textarea", { rows: 5 }),

        status === "error" &&
          h(
            "p",
            { class: "contact__banner", role: "alert" },
            h(Icon, { name: "alert", size: 16 }),
            h("span", null, "Revise los campos marcados antes de enviar.")
          ),

        h(
          "div",
          { class: "contact__actions" },
          h(
            "button",
            {
              type: "submit",
              class: "btn btn--primary btn--lg",
              disabled: status === "sending",
            },
            status === "sending"
              ? h("span", { class: "spinner" })
              : h(Icon, { name: "send", size: 17 }),
            h("span", null, status === "sending" ? "Enviando…" : "Enviar mensaje")
          )
        )
      ),

      h(
        "aside",
        { class: "contact__aside" },
        h("h2", { class: "contact__aside-title" }, "¿Prefiere escribirnos?"),
        h(
          "ul",
          { class: "contact__channels" },
          h(
            "li",
            null,
            h(Icon, { name: "mail", size: 18 }),
            h(
              "div",
              null,
              h("p", { class: "contact__channel-label" }, "Correo"),
              h(
                "a",
                { class: "contact__channel-value", href: `mailto:${CONTACT.email}` },
                CONTACT.email
              )
            )
          ),
          h(
            "li",
            null,
            h(Icon, { name: "chat", size: 18 }),
            h(
              "div",
              null,
              h("p", { class: "contact__channel-label" }, "WhatsApp"),
              h(
                "a",
                {
                  class: "contact__channel-value",
                  href: CONTACT.whatsappLink,
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
                CONTACT.whatsapp
              )
            )
          ),
          h(
            "li",
            null,
            h(Icon, { name: "globe", size: 18 }),
            h(
              "div",
              null,
              h("p", { class: "contact__channel-label" }, "Presencia"),
              h("p", { class: "contact__channel-value" }, "México · Perú · Chile · Argentina")
            )
          ),
          h(
            "li",
            null,
            h(Icon, { name: "external", size: 18 }),
            h(
              "div",
              null,
              h("p", { class: "contact__channel-label" }, "LinkedIn"),
              h(
                "a",
                {
                  class: "contact__channel-value",
                  href: CONTACT.linkedin,
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
                "LISA Insurtech"
              )
            )
          )
        ),
        h(
          "p",
          { class: "contact__disclaimer" },
          "Este formulario es una demostración: los datos no se envían a ningún servidor."
        )
      )
    )
  );
}
