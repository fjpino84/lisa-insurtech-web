/* Servidor estático mínimo para desarrollo local. No es parte del sitio. */
const http = require("http");
const fs = require("fs");
const path = require("path");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".json": "application/json",
};

const PORT = Number(process.argv[2]) || 5180;
const ROOT = process.cwd();

http
  .createServer((req, res) => {
    const clean = decodeURI(req.url.split("?")[0]);
    let file = path.join(ROOT, clean);
    if (clean === "/" || clean.endsWith("/")) file = path.join(file, "index.html");
    if (!file.startsWith(ROOT)) {
      res.writeHead(403).end("Prohibido");
      return;
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("No encontrado");
        return;
      }
      res.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream" });
      res.end(data);
    });
  })
  .listen(PORT, () => console.log(`LISA -> http://localhost:${PORT}`));
