# LISA Insurtech

Sitio web de LISA Insurtech, con demostraciones interactivas de sus dos
soluciones de inteligencia artificial para la industria aseguradora.

## Contenido

- **Inicio** — propuesta de valor y los tres módulos de la plataforma:
  LISai (lectura y extracción), LISux (motor de reglas) y LISA FWA
  (prevención de fraude).
- **Somos LISA** — reconocimientos, misión, presencia regional y valores.
- **Soluciones** — dos simulaciones que se recorren paso a paso:
  - **LISA clAIms**: liquidación de un siniestro de gastos médicos.
  - **LISA vigIA**: investigación de un caso de fraude documental.
- **Equipo** y **Hablemos**.

Todos los datos de las demostraciones son simulados y no corresponden a
personas ni siniestros reales.

## Desarrollo

El sitio no necesita compilación ni dependencias: es HTML, CSS y JavaScript
con módulos nativos. Preact se incluye en `src/vendor/`.

```bash
node serve.js 5173     # servidor local
```

Y se abre `http://localhost:5173`.

## Versión de un solo archivo

Para compartir el sitio sin servidor:

```bash
node build-artifact.js
```

Genera `lisa-insurtech.html` con los estilos, el código y las imágenes
incrustados.

## Estructura

```
src/
  data/         Todo el contenido textual y los casos de las demostraciones
  components/   Componentes de vista, por sección
  styles/       Hojas de estilo, cargadas en orden desde index.html
  hooks/        Utilidades de scroll y de revelado al desplazar
assets/         Logotipos, retratos del equipo y documentos de los casos
```
