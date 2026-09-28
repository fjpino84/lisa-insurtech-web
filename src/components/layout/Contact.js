import { h, useState } from "../../vendor/preact.js";
import { Icon } from "../shared/Icon.js";
import { useTranslations } from "../../data/i18n.js";

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

// INTERESTS se genera dinámicamente desde las traducciones

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

export function Contact({ language }) {
  const t = useTranslations(language);
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
        h("h2", { class: "contact-success__title" }, t.contact.success_title),
        h(
          "p",
          { class: "contact-success__text" },
          `${language === "es" ? "Gracias, " : "Thank you, "}${values.nombre.split(" ")[0]}. ${language === "es" ? "Nuestro equipo se pondrá en contacto con usted a la brevedad." : "Our team will be in touch with you shortly."}`
        ),
        h(
          "button",
          { type: "button", class: "btn btn--outline", onClick: reset },
          h(Icon, { name: "refresh", size: 15 }),
          h("span", null, t.contact.send_another)
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
      h("p", { class: "u-eyebrow" }, t.contact.form_label),
      h(
        "h1",
        { class: "page__title" },
        language === "es" ? "Redefina sus procesos " : "Redefine your processes ",
        h("span", { class: "u-gradient-text" }, language === "es" ? "con LISA" : "with LISA")
      ),
      h(
        "p",
        { class: "page__lead" },
        language === "es" ? "Cuéntenos sobre su operación y le mostraremos cómo la automatización agéntica puede transformarla." : "Tell us about your operation and we'll show you how agentic automation can transform it."
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
          field("nombre", t.contact.name, "text", { autocomplete: "name" }),
          field("empresa", t.contact.company, "text", { autocomplete: "organization" })
        ),
        h(
          "div",
          { class: "contact__row" },
          field("email", t.contact.email, "email", { autocomplete: "email" }),
          field("telefono", `${t.contact.phone} (${language === "es" ? "opcional" : "optional"})`, "tel", { autocomplete: "tel" })
        ),

        h(
          "p",
          { class: "field-group" },
          h("label", { class: "field-group__label", for: "campo-interes" }, t.contact.interest),
          h(
            "select",
            {
              id: "campo-interes",
              class: "field-group__input",
              value: values.interes,
              onChange: update("interes"),
            },
            t.contact.interests.map((option) =>
              h("option", { key: option.value, value: option.value }, option.label)
            )
          )
        ),

        field("mensaje", language === "es" ? "¿En qué podemos ayudarle?" : "How can we help you?", "textarea", { rows: 5 }),

        status === "error" &&
          h(
            "p",
            { class: "contact__banner", role: "alert" },
            h(Icon, { name: "alert", size: 16 }),
            h("span", null, t.contact.error_banner)
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
            h("span", null, status === "sending" ? t.contact.sending : t.contact.send_message)
          )
        )
      ),

      h(
        "aside",
        { class: "contact__aside" },
        h("h2", { class: "contact__aside-title" }, t.contact.write_us),
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
              h("p", { class: "contact__channel-label" }, t.contact.email_label),
              h(
                "a",
                { class: "contact__channel-value", href: `mailto:${t.contact.email_addr}` },
                t.contact.email_addr
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
              h("p", { class: "contact__channel-label" }, t.contact.whatsapp_label),
              h(
                "a",
                {
                  class: "contact__channel-value",
                  href: t.contact.whatsappLink,
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
                t.contact.whatsapp
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
              h("p", { class: "contact__channel-label" }, t.contact.presence),
              h("p", { class: "contact__channel-value" }, t.contact.presence_text)
            )
          ),
          h(
            "li",
            null,
            h(Icon, { name: "external", size: 18 }),
            h(
              "div",
              null,
              h("p", { class: "contact__channel-label" }, t.contact.linkedin_label),
              h(
                "a",
                {
                  class: "contact__channel-value",
                  href: t.contact.linkedin,
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
                t.contact.linkedin_text
              )
            )
          )
        ),
        h(
          "p",
          { class: "contact__disclaimer" },
          t.contact.disclaimer
        )
      )
    )
  );
}
