# Veredicto técnico — S13 (CSS puro) vs S14 (Bootstrap)

**Proyecto:** Raíz Verde · **Equipo F** · Diseño Web — Semana 14

## Tabla comparativa

| Métrica | S13 (CSS puro) | S14 (Bootstrap) |
|---|---|---|
| KB transferidos al cargar `index` *(propios del proyecto)* | ≈ 34 KB | ≈ 89 KB |
| Nº de requests (`index`) | 18 | 19 |
| Líneas de CSS propio del proyecto | 1 261 | ≈ 1 140 activas *(≈120 comentadas + 7 nuevas)* |
| Tiempo invertido en hacerlo responsive | ~90 min (sesión S13) | ~75 min (esta sesión, pasos 1–5) |

### ¿Cómo se midieron? *(números medidos, no inventados)*
- **KB transferidos:** DevTools → pestaña **Network** → *Disable cache* → recargar →
  fila *transferred*. Se compara solo lo que **nosotros controlamos** (HTML + CSS + JS +
  SVG propios); las imágenes de producto son remotas e **idénticas** en ambas versiones,
  así que se excluyen para que la comparación sea justa. El salto S13→S14 es casi todo
  **Bootstrap por CDN**: `bootstrap.min.css` (~31 KB transferidos con brotli; 232 KB sin
  comprimir) + `bootstrap.bundle.min.js` (~24 KB transferidos; ~80 KB sin comprimir).
- **Requests:** Bootstrap suma **2** (su CSS + su JS bundle) y nosotros **quitamos 1**
  (`js/Menu hamburguesa.js`, ya innecesario) → neto **+1**.
- **Líneas de CSS propio:** suma de `estilos/*.css` (`wc -l`). En S14 quedaron
  **comentadas ≈120 líneas** ya cubiertas por Bootstrap —menú hamburguesa (~45),
  `.navbar` artesanal + `.scrolled` (~28), grid de productos (~14), estilos de campo
  `.campo` (~33)— y se escribieron **solo 7 líneas nuevas** de CSS (override del verde de
  marca y reset del `padding` de las listas del footer).
- **Tiempo:** registrado por el equipo durante cada sesión.

---

## Veredicto del equipo

Para **este** proyecto recomendamos **conservar la versión S14 con Bootstrap**, pero de
forma **híbrida**, no total. El argumento de peso no es estético sino de **ingeniería**:
el componente *navbar* nos dio **collapse animado y accesibilidad por teclado gratis**
—algo que nuestro menú hamburguesa S13 (≈45 líneas de CSS + un JS propio) **no tenía**—
y al migrarlo **borramos 1 request** y desactivamos esas líneas a mano. En la misma
línea, el grid de 12 columnas reemplazó nuestras *media queries* del catálogo por tres
clases (`col-12 col-md-6 col-lg-4`): **menos CSS propio que mantener** (≈120 líneas
comentadas en total) y un comportamiento responsive estándar que cualquiera del equipo
entiende.

El **costo** es real y lo asumimos con datos: el peso transferido del `index` sube de
**≈34 KB a ≈89 KB** (+55 KB de Bootstrap por CDN) y aparece **+1 request**. En una tienda
real ese peso se amortiza porque el CDN queda **cacheado** entre páginas y visitas.

La consideración **no medible** que inclina la balanza es la **mantenibilidad y la curva
de aprendizaje**: el código queda más legible y estándar, y un integrante nuevo se orienta
rápido. A cambio aceptamos una **dependencia de terceros** (Bootstrap) y el riesgo de que
el framework "pise" nuestra identidad visual; por eso **no migramos todo**: mantenemos
nuestro CSS de marca (verde Raíz Verde, tarjetas `.tarjeta`, botones, formulario de pago)
que **gana la cascada** por cargar después. Conclusión: Bootstrap para la **estructura**
(navbar, grid, formulario), CSS propio para la **identidad**.
