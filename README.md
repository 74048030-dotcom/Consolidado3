# 📘 Consolidado 3

## 👥 Integrantes del Equipo

| N.° | Apellidos y Nombres |
|---:|---|
| 1 | **CRISTIAN JOSUE MULLISACA GUZMAN** |
| 2 | **FRANK ABEL CHAMBI CONDORI** |
| 3 | **GONZALO ANDY MALLMA CASTILLO** |
---

> **Trabajo grupal correspondiente al Consolidado 3.**

# 🌿 Raíz Verde · Vivero Urbano

Primer avance (30 %) del proyecto de **Comercio Electrónico** — Diseño Web (NRC 33061).
Tienda online de un vivero urbano: plantas de interior, suculentas, exterior y accesorios,
con carrito de compras funcional. Construida con **HTML5 + CSS3 + JavaScript puro**
(sin frameworks, librerías ni CDN de terceros, salvo Google Fonts).

## Identidad de marca
- **Negocio:** Raíz Verde, vivero urbano con entrega a domicilio en Lima.
- **Público:** personas que quieren decorar su hogar con plantas y necesitan asesoría.
- **Paleta (variables CSS):** verde hoja `--color-primary`, terracota `--color-secondary`,
  lavanda `--color-acento`. Tipografías: Poppins (títulos) y Nunito Sans (texto).

## Estructura de carpetas
```
/                 index.html  (Home)
/css              estilos.css        → estilos globales, variables, animaciones, media queries
/js               productos.js       → array de objetos (datos del catálogo)
                  utiles.js          → rutas, formato de precio y generador de tarjetas
                  carrito.js         → lógica del carrito + localStorage + contador del ícono
                  inicio.js          → destacados de la Home
                  catalogo.js        → render del catálogo + búsqueda + filtro
                  detalle.js         → vista de detalle (lee ?id= de la URL)
                  carrito-pagina.js  → render e interacción de la página del carrito
                  contacto.js        → validación del formulario de pedido
/img              logo + ilustraciones SVG de cada producto
/pages            catalogo.html · detalle.html · carrito.html · contacto.html
/ejemplo-vitrina  archivos de ejemplo entregados (referencia de estilo)
```

## Cómo probarlo
Abrir `index.html` en el navegador. Para evitar restricciones de rutas, se recomienda
un servidor local simple:
```bash
python3 -m http.server 8000
# luego abrir http://localhost:8000
```

## Cómo cumple la Lista de Cotejo (Parte A)
1. **HTML5 semántico:** `header`, `nav`, `main`, `section`, `article`, `aside`, `footer` en todas las páginas; `alt` en todas las imágenes.
2. **Responsivo Flexbox/Grid:** layout con Grid y Flexbox; media queries propias en 768px y 480px.
3. **CSS avanzado:** variables CSS para la paleta; `@keyframes` (banner flotante, badge) y transiciones en botones y tarjetas.
4. **Catálogo dinámico:** 9 productos en `PRODUCTOS` (array de objetos, 6 propiedades) renderizados con JS; el HTML del catálogo no está codificado.
5. **Manipulación del DOM:** creación dinámica de tarjetas, detalle y líneas del carrito (innerHTML/createElement), sin recargar la página.
6. **Carrito + localStorage:** agregar, eliminar y actualizar cantidades; subtotal y total en vivo; persiste entre páginas; contador en el ícono siempre visible.
7. **Eventos (≥3 tipos):** `click`, `input`, `change`, `submit`, `blur`, `DOMContentLoaded`.
8. **Formulario validado por JS:** pre-checkout con reglas en JavaScript y mensajes de error por campo + retroalimentación visual.
9. **Organización del código:** HTML/CSS/JS separados en carpetas; funciones comentadas y nombres descriptivos.
10. **Identidad y creatividad:** marca propia, logo SVG, banner animado, filtro de catálogo y badge dinámico del carrito.

## Entregables
- **ZIP:** `DW_GF_CHAMBI_S12.zip` con esta estructura de carpetas.
- **URL desplegada:** GitHub Pages o Netlify (subir la raíz del proyecto).