# Choques de cascada — Bootstrap 5.3.8 vs CSS propio (S14)

**Proyecto:** Raíz Verde · **Equipo F** · Diseño Web — Semana 14
**Método:** se recorrieron `index.html`, `catalogo.html`, `carrito.html`, `detalle.html`
y `pagos.html` en **375 px, 768 px y 1024 px** con DevTools. Para cada diferencia
visual contra la versión S13 se identificó la regla ganadora (panel *Styles* →
reglas tachadas = perdieron la cascada) y se decidió: **aceptar** el estilo de
Bootstrap o **sobrescribir** en nuestro CSS (que carga DESPUÉS, así que gana).

> Regla de oro aplicada en todas las páginas: el `<link>` de Bootstrap va **antes**
> de `estilos/*.css`. Así, cuando ambos definen la misma propiedad, gana el nuestro.

---

## Choque 1 — La clase `.navbar` choca por nombre con la de Bootstrap
- **Qué pasó:** nuestro `.navbar` artesanal (`position:fixed`, `height:80px`,
  `padding:0 3rem`, `display:flex; justify-content:space-between`) comparte el mismo
  nombre de clase que el componente de Bootstrap. Como nuestro CSS carga después,
  **pisaba** el layout interno del navbar de Bootstrap (toggler descolocado, padding raro).
- **Quién ganaba:** `estilos/menu.css` (cargado de último).
- **Decisión: SOBRESCRIBIR/RETIRAR.** Comentamos el bloque `.navbar { … }` y
  `.navbar.scrolled` en `menu.css` para que mande Bootstrap, y añadimos una sola
  regla `.navbar.bg-success { background-color:#2e7d32 !important; }` para conservar
  el **verde de marca** (Bootstrap pintaría `#198754`).

## Choque 2 — Encabezados (`h3`, `h4`) con otro peso y espaciado
- **Qué pasó:** Bootstrap (Reboot) aplica a todos los títulos `margin-top:0`,
  `margin-bottom:.5rem`, `font-weight:500` y `line-height:1.2`. Los `<h4>` del footer
  y los `<h3>` de la sección "valores" cambiaron sutilmente de peso/espaciado respecto a S13.
- **Quién ganaba:** `bootstrap.min.css` (no teníamos regla propia para esos títulos).
- **Decisión: ACEPTAR.** El resultado es más uniforme y legible; nuestros títulos
  con clase (`.seccion-titulo`, `.tarjeta-nombre`) conservan su tamaño/color porque
  sí tienen regla propia que gana la cascada.

## Choque 3 — Listas del footer aparecían sangradas
- **Qué pasó:** Bootstrap aplica `ul, ol { padding-left:2rem }`. Las listas del footer
  (`.pie ul`), que en S13 no tenían sangría, aparecieron desplazadas a la derecha.
- **Quién ganaba:** `bootstrap.min.css` para `padding-left` (nuestra regla solo fijaba
  `list-style:none`, no el padding).
- **Decisión: SOBRESCRIBIR.** Añadimos `padding-left:0; margin-bottom:0;` a `.pie ul`
  en `menu.css`. Choque resuelto: el footer vuelve a verse como en S13.

## Choque 4 — Enlaces "pelados" se volvían azul Bootstrap
- **Qué pasó:** Bootstrap define `a { color: var(--bs-link-color) }` (azul). Cualquier
  `<a>` sin color propio se teñía de azul. Nuestro `general.css` solo quitaba el subrayado
  (`a{ text-decoration:none }`), no fijaba color.
- **Quién ganaba:** `bootstrap.min.css` para el color de enlaces sin clase.
- **Decisión: ACEPTAR (verificado).** Revisamos que los enlaces visibles del sitio
  llevan clase con color explícito (`.btn-catalogo`, `.btn-detalle`, `.btn-verCatalogo`,
  `.nav-link`, `.pie a{color:white}`), así que ninguno quedó azul. No hizo falta tocar nada.

## Choque 5 — Reset de márgenes del `<body>` y tipografía base
- **Qué pasó:** al conectar Bootstrap, desaparecen los márgenes por defecto del `body`
  y se impone su pila de fuentes del sistema (cambio sutil de tipografía/altura de línea).
- **Quién ganaba:** nuestro `general.css` para la fuente —`body{ font-family:'Segoe UI' }`
  carga después y **gana**, así que la marca tipográfica se mantiene— pero Bootstrap
  gana en los resets de `margin`/`box-sizing` base.
- **Decisión: ACEPTAR.** Es la cascada funcionando; el sitio queda más consistente y
  nuestra fuente de marca sigue intacta.

---

### Resultado del checkpoint (Paso 2)
- Sitio navegable en **375 / 768 / 1024 px SIN scroll horizontal** y sin elementos rotos.
- 5 choques documentados con su decisión (2 sobrescritos, 3 aceptados).
