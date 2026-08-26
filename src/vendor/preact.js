/**
 * Punto de entrada único de la librería de vista.
 *
 * Se utiliza Preact (3 KB) servido de forma local: no hay CDN ni proceso de
 * compilación, por lo que el sitio funciona subiendo la carpeta a cualquier
 * dominio. Ambos módulos comparten una única instancia, ya que
 * `preact.hooks.js` importa de `preact.core.js`.
 *
 * Los componentes se escriben con `h()` en lugar de JSX porque el navegador
 * ejecuta los ficheros directamente, sin transpilación.
 */

export {
  h,
  render,
  Fragment,
  createContext,
  createRef,
  cloneElement,
  toChildArray,
  Component,
  options,
} from "./preact.core.js";

export {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useMemo,
  useCallback,
  useReducer,
  useContext,
  useId,
} from "./preact.hooks.js";
