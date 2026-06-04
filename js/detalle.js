/* Contenedor donde se mostrará el detalle del producto */
const contenedor = document.getElementById("detalle");

// FORMATEO DEL PRECIO
function formatearPrecio(precio) {
  return `S/ ${precio.toFixed(2)}`;
// Convierte el número a formato moneda (ej: 10 → S/ 10.00)
}

// Obtener parámetros de la URL
// Ejemplo: detalle.html?id=3
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
// Extrae el valor del "id" desde la URL

// Buscar producto en el array PRODUCTOS (función del otro archivo)
const producto = buscarProductoPorId(id);

// Si no se encuentra el producto
if (!producto) {
  contenedor.innerHTML = `
    <p class="detalle-error">
      Producto no encontrado 
    </p>
    <a href="catalogo.html">Volver al catálogo</a>
  `;
} else {

  // Si el producto existe, se renderiza toda la vista
  contenedor.innerHTML = `
    <div class="detalle-media">
      <img src="${producto.imagen}" alt="${producto.nombre}">
    </div>

    <div class="detalle-info">

      <!-- Link para volver -->
      <a class="detalle-volver" href="catalogo.html">← Volver al catálogo</a>

      <!-- Categoría -->
      <p class="detalle-categoria">${producto.categoria}</p>

      <!-- Nombre -->
      <h1 class="detalle-nombre">${producto.nombre}</h1>

      <!-- Precio -->
      <p class="detalle-precio">${formatearPrecio(producto.precio)}</p>

      <!-- Descripción -->
      <p class="detalle-desc">${producto.descripcion}</p>

      <!-- Botón agregar al carrito -->
      <button 
        class="btn btn--primario btn--bloque" 
        id="btn-agregar-detalle" 
        data-agregar="${producto.id}">
        Agregar al carrito
      </button>

    </div>
  `;
}

/* EVENTO GLOBAL (delegación de eventos) */
// Escucha clicks en toda la página
document.addEventListener("click", e => {

    // Si el click fue en el botón de agregar del detalle
    if (e.target.id === "btn-agregar-detalle") {

        const id = Number(
            e.target.dataset.agregar
        );
        // obtiene el id del atributo data-agregar

        agregarAlCarrito(id);
        // llama a la función del carrito (en otro archivo)
    }
});