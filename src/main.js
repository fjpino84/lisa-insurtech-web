import { h, render } from "./vendor/preact.js";
import { App } from "./App.js";

/** Punto de entrada de la aplicación. */
const root = document.getElementById("app");

if (root) {
  render(h(App), root);
}
