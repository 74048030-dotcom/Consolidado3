# Qué cambiamos al migrar de CSS puro a Bootstrap

**Proyecto:** Raíz Verde · **Equipo F** · Diseño Web — Semana 14
**Rama:** `bootstrap` (la versión S13 con CSS puro sigue intacta en `main` / `grupoffase2`)
**Framework:** Bootstrap 5.3.8 (CDN jsDelivr)

Este documento resume **archivo por archivo** lo que se modificó respecto a la versión
de CSS puro. Los archivos de apoyo del laboratorio son [`choques.md`](choques.md)
(diagnóstico de cascada, Paso 2) y [`veredicto.md`](veredicto.md) (métricas + recomendación, Paso 6).

---

## 1. Resumen de la migración (3 zonas clave)

| Zona | Antes (S13, CSS puro) | Después (S14, Bootstrap) |
|---|---|---|
| **Navbar** | `<header>` artesanal + botón hamburguesa SVG + `js/Menu hamburguesa.js` + ~45 líneas de CSS | Componente `navbar navbar-expand-lg` con `navbar-toggler` + `collapse` (animado y accesible por teclado, sin JS propio) |
| **Catálogo / destacados** | `display:grid` propio en `.grid-productos` con *media queries* (4 / 2 / 1 columnas) | Grid de 12 columnas: `row g-4` + `col-12 col-md-6 col-lg-4` |
| **Formulario de pago** | `.campo` en flex-column + estilos de input propios | `form` en `row g-3` con `form-label` + `form-control` (foco azul de Bootstrap) |

**Idea rectora:** Bootstrap aporta la **estructura** (navbar, grid, formulario);
nuestro CSS conserva la **identidad** (verde de marca, tarjetas, botones). El choque
entre ambos se resuelve con el **orden de los `<link>`**: Bootstrap primero, lo nuestro
después → lo nuestro gana la cascada.

---

## 2. Cambios en los archivos HTML (las 5 páginas)

`index.html`, `catalogo.html`, `carrito.html`, `detalle.html`, `pagos.html`:

- **`<head>`** — se añadió **antes** de nuestro CSS:
  ```html
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
  ```
- **Final del `<body>`** — se añadió el bundle (incluye Popper), necesario para el
  collapse del navbar:
  ```html
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
  ```
- **Navbar** — se reemplazó el `<header>` artesanal por el navbar de Bootstrap
  (`navbar-expand-lg navbar-dark bg-success fixed-top`), con `navbar-brand`,
  `navbar-toggler` (`data-bs-target="#menuPrincipal"`) y `navbar-nav ms-auto`.
  La clase `active` marca la página actual en cada archivo.
- Se **retiró** el `<script src="js/Menu hamburguesa.js">` de todas las páginas
  (ya no hace falta: el toggle lo gestiona Bootstrap).
- `detalle.html`: además se corrigió una etiqueta `</header>` que faltaba.

**Solo en `catalogo.html`:** el contenedor del catálogo pasó de
`<section class="grid-productos">` a `<section class="row g-4">`.

**Solo en `index.html`:** el contenedor de destacados pasó de
`<div class="grid-productos">` a `<div class="row g-4">`.

**Solo en `pagos.html`:** el `<form>` pasó a `class="row g-3"` y cada campo se envolvió
en columnas (`col-12 col-md-6` para nombre/email/teléfono/dirección/fecha; `col-12` para
notas y botón), con `form-label` y `form-control`. **Se conservaron `id`, `name` y los
`<span class="campo-error">`** para que la validación de `js/pagos.js` siga funcionando
sin cambios.

---

## 3. Cambios en el CSS propio (`estilos/`)

Nada se borró: lo migrado se **comentó** para poder compararlo.

- **`estilos/menu.css`**
  - Comentado el bloque `.navbar { … }` artesanal y `.navbar.scrolled` (chocaban con la
    clase `.navbar` de Bootstrap por mismo nombre).
  - Comentado todo el **sistema de menú hamburguesa** (`.hamburger`, líneas `.hb-*`,
    animación a "X" y el dropdown móvil de `.nav-links`) — ~45 líneas.
  - **Añadido** `.navbar.bg-success { background-color:#2e7d32 !important; }` para mantener
    el verde de marca.
  - **Añadido** en `.pie ul` → `padding-left:0; margin-bottom:0;` (reset del sangrado que
    Bootstrap aplica a todo `<ul>`).
  - Se conservan: marca/logo, ícono y contador del carrito, footer.
- **`estilos/productos.css`**
  - Comentado `.grid-productos` (grid propio) y los `grid-template-columns` de sus
    *media queries* (migrados al grid de Bootstrap).
  - Se conservan los estilos visuales de la tarjeta (`.tarjeta`, imagen, botones, etc.).
- **`estilos/pagos.css`**
  - Comentado el bloque `.campo` (layout y estilos de input), migrado a `form-control`/`form-label`.
  - Se conservan los estados de validación (`.campo-error`, `input.error`, `input.correcto`),
    los avisos y el botón `.btn-confirmar` (identidad).

Los demás CSS (`general.css`, `index.css`, `catalogo.css`, `detalle.css`, `carrito.css`)
**no se tocaron**.

---

## 4. Cambios en el JavaScript (`js/`)

- **`js/catalogo.js`** y **`js/inicio.js`** — las tarjetas que se inyectan por JS ahora se
  envuelven en una columna Bootstrap:
  ```html
  <div class="col-12 col-md-6 col-lg-4">
    <article class="tarjeta"> … </article>
  </div>
  ```
  y a la imagen se le añadió `img-fluid`. La lógica (filtros, búsqueda, formato de precio)
  no cambió.
- **`js/Menu hamburguesa.js`** — quedó **sin uso** (se retiró de los `<script>`).
  El archivo se mantiene en el repo por historial; ya no participa.
- **`js/carrito.js`**, `carrito-pagina.js`, `pagos.js`, `detalle.js`, `productos.js` —
  **sin cambios de lógica**. El contador del carrito sigue funcionando porque conservamos
  el `id="contador-carrito"` y la clase `.show` dentro del nuevo navbar.

---

## 5. Lo que NO cambió (a propósito)

- La identidad visual: verde Raíz Verde, tarjetas `.tarjeta`, hero animado, botones,
  tarjeta del formulario.
- El comportamiento de la app: carrito (localStorage), búsqueda/filtros del catálogo,
  validación del checkout, página de detalle.
- El `meta viewport` (ya estaba en las 5 páginas).

---

## 6. Cómo verificarlo

1. Abrir cualquier página → la tipografía/espaciados cambian sutilmente (Bootstrap activo).
2. `< 992 px`: aparece el botón ☰ y el menú se despliega animado; navegable con **Tab**.
3. Catálogo: **1 / 2 / 3 columnas** según el ancho, sin scroll horizontal.
4. `pagos.html`: en `≥768 px` los campos se acomodan en dos columnas; en móvil se apilan;
   al enfocar un campo aparece el resplandor azul de Bootstrap.
5. DevTools → Network → *Disable cache*: ver el peso/requests que reporta `veredicto.md`.
