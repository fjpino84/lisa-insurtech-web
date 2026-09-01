/**
 * Genera una versión autocontenida del sitio en un único fichero HTML.
 *
 * Inserta los estilos, la librería de vista y todos los módulos en línea, y
 * sustituye las rutas de las imágenes por data URI. Sirve para previsualizar
 * o compartir el sitio sin servidor. No forma parte del sitio publicado.
 *
 * Uso: node build-artifact.js [ruta-de-salida]
 */

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const OUT = process.argv[2] || path.join(ROOT, "lisa-insurtech.html");

/* --- 1. Estilos, en el mismo orden que index.html --- */
const STYLES = ["tokens", "base", "layout", "components", "home", "demos", "vigia", "visuals", "charts", "compact", "responsive"];
const css = STYLES.map((name) =>
  fs.readFileSync(path.join(ROOT, "src/styles", `${name}.css`), "utf8")
).join("\n\n");

/* --- 2. Preact: convertir los módulos ESM en expresiones autoejecutadas --- */
function splitExports(source) {
  const match = source.match(/export\{([^}]*)\}/);
  if (!match) return { body: source, names: [] };

  const names = match[1].split(",").map((pair) => {
    const [local, exported] = pair.split(" as ").map((s) => s.trim());
    return { local, exported: exported || local };
  });

  return { body: source.replace(/export\{[^}]*\}\s*;?/, ""), names };
}

const core = splitExports(fs.readFileSync(path.join(ROOT, "src/vendor/preact.core.js"), "utf8"));
const hooks = splitExports(fs.readFileSync(path.join(ROOT, "src/vendor/preact.hooks.js"), "utf8"));

// hooks importa `options` del núcleo: se resuelve contra el objeto ya creado.
const hooksBody = hooks.body.replace(
  /import\{([^}]*)\}from"\.\/preact\.core\.js";?/,
  (unused, inner) => {
    const pairs = inner.split(",").map((pair) => {
      const [imported, local] = pair.split(" as ").map((s) => s.trim());
      return `${imported}: ${local || imported}`;
    });
    return `const {${pairs.join(", ")}} = __P;`;
  }
);

const toObject = (names) => names.map((n) => `${n.exported}:${n.local}`).join(",");

const vendor =
  `const __P=(function(){${core.body}\nreturn {${toObject(core.names)}};})();\n` +
  `const __H=(function(){${hooksBody}\nreturn {${toObject(hooks.names)}};})();\n` +
  `const {h, render, Fragment} = __P;\n` +
  `const {useState, useEffect, useRef, useMemo, useCallback, useLayoutEffect} = __H;\n`;

/* --- 3. Módulos de la aplicación, en orden de dependencia --- */
const MODULES = [
  "src/data/content.js",
  "src/data/claimsDemo.js",
  "src/data/fwaDemo.js",
  "src/hooks/useReveal.js",
  "src/hooks/useScrollTo.js",
  "src/components/shared/Icon.js",
  "src/components/shared/AudioPlayer.js",
  "src/components/shared/SolutionName.js",
  "src/components/shared/ModuleMark.js",
  "src/components/shared/Flag.js",
  "src/components/shared/Logo.js",
  "src/components/shared/Modal.js",
  "src/components/shared/NeuralField.js",
  "src/components/layout/TopBar.js",
  "src/components/layout/Footer.js",
  "src/components/layout/Champions.js",
  "src/components/layout/Values.js",
  "src/components/layout/About.js",
  "src/components/layout/Team.js",
  "src/components/layout/Placeholder.js",
  "src/components/layout/Contact.js",
  "src/components/home/Hero.js",
  "src/components/home/ModuleVisuals.js",
  "src/components/home/Pillars.js",
  "src/components/home/SolutionsPreview.js",
  "src/components/home/Testimonials.js",
  "src/components/solutions/DemoHeader.js",
  "src/components/solutions/PatternCharts.js",
  "src/components/solutions/ClaimsDemo.js",
  "src/components/solutions/FwaDemo.js",
  "src/components/solutions/SolutionsPage.js",
  "src/App.js",
];

const stripModuleSyntax = (source) =>
  source
    .replace(/^\s*import\s*\{[\s\S]*?\}\s*from\s*[^;]*;\s*$/gm, "")
    .replace(/^\s*import\s+[^;]*?;\s*$/gm, "")
    .replace(/^\s*export\s+(function|const|let|class)/gm, "$1");

let app = MODULES.map((file) => {
  const source = stripModuleSyntax(fs.readFileSync(path.join(ROOT, file), "utf8"));
  return `\n/* ==== ${file} ==== */\n${source}\n`;
}).join("");

/* --- 4. Imágenes como data URI --- */
/** Tipo de contenido según la extensión del archivo. */
const MIME_IMAGEN = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".m4a": "audio/mp4",
  ".ogg": "audio/ogg",
};

const dataUri = (file) => {
  const tipo = MIME_IMAGEN[path.extname(file).toLowerCase()];
  if (!tipo) throw new Error(`Tipo de imagen no admitido: ${file}`);
  return `data:${tipo};base64,` + fs.readFileSync(path.join(ROOT, file)).toString("base64");
};

const IMAGES = [
  "assets/logo/lisa-logo.png",
  "assets/logo/lisa-isotipo.png",
  "assets/casos/boleta-4761.png",
  "assets/premios/zic-esteban.jpg",
  "assets/marcas/zurich.png",
  "assets/marcas/iso.jpg",
  "assets/equipo/esteban.jpg",
  "assets/equipo/loreto.jpg",
  "assets/equipo/francisco.jpg",
  "assets/equipo/luis.jpg",
  "assets/equipo/diego.jpg",
  "assets/equipo/juan.jpg",
  "assets/equipo/rodrigo.jpg",
  "assets/equipo/marie.jpg",
  "assets/equipo/nicolas.jpg",
];

IMAGES.forEach((file) => {
  const pattern = new RegExp(`["']${file.replace(/[/.]/g, "\\$&")}["']`, "g");
  app = app.replace(pattern, JSON.stringify(dataUri(file)));
});

/* --- 5. Comprobaciones antes de escribir --- */
const leftovers = app.match(/^\s*(import|export)\s/gm);
if (leftovers) {
  console.error(`Error: quedan ${leftovers.length} sentencias de módulo sin resolver.`);
  process.exit(1);
}

if (/assets\/(logo|casos|premios)\//.test(app)) {
  console.error("Error: quedan rutas de imagen sin convertir a data URI.");
  process.exit(1);
}

/* --- 6. Ensamblar el documento --- */
const html = [
  "<title>LISA Insurtech</title>",
  '<link rel="preconnect" href="https://fonts.googleapis.com">',
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  '<link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">',
  `<style>\n${css}\n</style>`,
  '<a class="skip-link" href="#contenido">Saltar al contenido</a>',
  '<div id="app"></div>',
  `<script>\n${vendor}\n${app}\nrender(h(App), document.getElementById("app"));\n</` + "script>",
].join("\n");

fs.writeFileSync(OUT, html);
console.log(`Generado ${path.basename(OUT)} · ${(html.length / 1024).toFixed(1)} KB`);
