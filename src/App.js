import { h, useState, useEffect, useCallback } from "./vendor/preact.js";
import { TopBar } from "./components/layout/TopBar.js";
import { Footer } from "./components/layout/Footer.js";
import { Hero } from "./components/home/Hero.js";
import { Pillars, Modules } from "./components/home/Pillars.js";
import { SolutionsPreview, Closing } from "./components/home/SolutionsPreview.js";
import { Testimonials } from "./components/home/Testimonials.js";
import { SolutionsPage } from "./components/solutions/SolutionsPage.js";
import { AboutPage, TeamPage } from "./components/layout/Placeholder.js";
import { Contact } from "./components/layout/Contact.js";
import { Modal } from "./components/shared/Modal.js";
import { Icon } from "./components/shared/Icon.js";
import { useTranslations } from "./data/i18n.js";

/** Secciones válidas del sitio. */
const ROUTES = ["inicio", "somos", "soluciones", "equipo", "hablemos"];

/** Lee la sección actual desde el hash de la URL. */
function readHash() {
  const raw = window.location.hash.replace("#", "").trim();
  return ROUTES.includes(raw) ? raw : "inicio";
}

export function App() {
  const [route, setRoute] = useState(readHash);
  const [demoTarget, setDemoTarget] = useState("claims");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("lisa_language") || "es";
  });
  const t = useTranslations(language);
  // Opción del menú resaltada; puede diferir de la ruta cuando una sección
  // vive dentro de la portada, como la presentación de soluciones.
  const [menuActive, setMenuActive] = useState(readHash);

  // Guardar idioma en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem("lisa_language", language);
    document.documentElement.lang = language;
  }, [language]);

  /**
   * Navega a una sección y sincroniza el hash.
   *
   * Desde el menú, "Soluciones" lleva a la presentación de los dos productos
   * en la portada; a la demostración se entra desde sus tarjetas.
   */
  const navigate = useCallback((id, options = {}) => {
    const target = ROUTES.includes(id) ? id : "inicio";
    if (options.demo) setDemoTarget(options.demo);

    const aPortada = target === "soluciones" && !options.demo;
    setRoute(aPortada ? "inicio" : target);
    setMenuActive(target);
    setMenuOpen(false);

    const hash = aPortada ? "#soluciones-preview" : `#${target}`;
    if (window.location.hash !== hash) {
      window.history.pushState(null, "", hash);
    }

    if (aPortada) {
      // Se espera al repintado para medir la posición de las tarjetas.
      window.setTimeout(() => {
        const seccion = document.getElementById("soluciones-preview");
        if (!seccion) return;
        const styles = getComputedStyle(document.documentElement);
        const barra = parseFloat(styles.getPropertyValue("--h-topbar")) || 9.6;
        const raiz = parseFloat(styles.fontSize) || 10;
        const top = seccion.getBoundingClientRect().top + window.scrollY - barra * raiz - 24;
        window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
      }, 90);
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Sincronizar con los botones atrás/adelante del navegador.
  useEffect(() => {
    const onHashChange = () => {
      const next = readHash();
      setRoute(next);
      setMenuActive(next);
    };
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onHashChange);
    };
  }, []);

  // La sección activa se marca en el documento: los estilos la usan para
  // reservar el espacio de la barra fija de las demostraciones.
  useEffect(() => {
    document.body.dataset.route = route;
  }, [route]);

  // Cada sección se muestra desde arriba, también al abrir una URL con hash:
  // el navegador ancla al elemento y dejaría el inicio bajo el menú fijo.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  // Sombra de la barra superior al hacer scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** Abre la demostración de un producto concreto. */
  const openDemo = useCallback(
    (id) => {
      navigate("soluciones", { demo: id });
    },
    [navigate]
  );

  return h(
    "div",
    { class: "app" },

    // El menú superior se mantiene en todas las secciones.
    h(TopBar, {
      current: menuActive,
      onNavigate: navigate,
      scrolled,
      menuOpen,
      onToggleMenu: () => setMenuOpen((v) => !v),
      language,
      onLanguageChange: () => setLanguage((l) => (l === "es" ? "en" : "es")),
    }),

    h(
      "main",
      { class: "main", id: "contenido" },

      route === "inicio" &&
        h(
          "div",
          { class: "view" },
          h(Hero, { onDemo: () => setModalOpen(true), language }),
          h(Pillars, { language }),
          h(SolutionsPreview, { onOpenDemo: openDemo, language }),
          h(Modules, { language }),
          h(Testimonials, { language }),
          h(Closing, { onNavigate: navigate, language })
        ),

      route === "somos" && h("div", { class: "view view--inner", key: `somos-${language}` }, h(AboutPage, { language })),

      route === "soluciones" &&
        h("div", { class: "view view--inner", key: `soluciones-${language}` }, h(SolutionsPage, { initial: demoTarget, language })),

      route === "equipo" && h("div", { class: "view view--inner", key: `equipo-${language}` }, h(TeamPage, { language })),

      route === "hablemos" && h("div", { class: "view view--inner", key: `hablemos-${language}` }, h(Contact, { language }))
    ),

    h(Footer, { onNavigate: navigate }),

    // Ventana para elegir qué solución se quiere conocer.
    h(
      Modal,
      {
        open: modalOpen,
        onClose: () => setModalOpen(false),
        title: t.demo.title,
      },
      h(
        "p",
        null,
        t.demo.intro
      ),

      h("p", { class: "modal__prompt" }, t.demo.prompt),

      // Cada opción entra directamente en su demostración.
      h(
        "ul",
        { class: "modal__choices" },
        h(
          "li",
          null,
          h(
            "button",
            {
              type: "button",
              class: "choice choice--cyan",
              "data-autofocus": true,
              onClick: () => {
                setModalOpen(false);
                openDemo("claims");
              },
            },
            h("span", { class: "choice__icon" }, h(Icon, { name: "chip", size: 22 })),
            h(
              "span",
              { class: "choice__text" },
              h("span", { class: "choice__name" }, "LISA Claims"),
              h("span", { class: "choice__desc" }, t.solutions[0].tagline)
            ),
            h(Icon, { name: "arrow", size: 18, className: "choice__arrow" })
          )
        ),
        h(
          "li",
          null,
          h(
            "button",
            {
              type: "button",
              class: "choice choice--danger",
              onClick: () => {
                setModalOpen(false);
                openDemo("fwa");
              },
            },
            h("span", { class: "choice__icon" }, h(Icon, { name: "scan", size: 22 })),
            h(
              "span",
              { class: "choice__text" },
              h("span", { class: "choice__name" }, "LISA vigIA"),
              h("span", { class: "choice__desc" }, t.solutions[1].tagline)
            ),
            h(Icon, { name: "arrow", size: 18, className: "choice__arrow" })
          )
        )
      ),

      h(
        "p",
        { class: "modal__note" },
        t.demo.note
      )
    )
  );
}
