// Mostrar los primeros 4 productos como destacados
// (esto sirve para la sección "destacados" del inicio)

const contenedor = document.getElementById("destacados");
// Busca en el HTML el elemento con id="destacados"
// ahí se van a insertar los productos

// Función para dar formato al precio
const formatearPrecio = precio =>
    new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN"
    }).format(precio);

// PRODUCTOS es un array (probablemente en otro archivo)
// slice(0, 4) = toma solo los primeros 4 productos
PRODUCTOS.slice(0, 4).forEach(producto => {

    // Por cada producto, se agrega una tarjeta al HTML
    // Cada tarjeta va en su columna de Bootstrap (col-12 / col-md-6 / col-lg-4)
    contenedor.innerHTML += `
      <div class="col-12 col-md-6 col-lg-4">
        <article class="tarjeta">

          <!-- Link a la página de detalle del producto -->
          <a href="detalle.html?id=${producto.id}">
            <img class="tarjeta-img img-fluid" src="${producto.imagen}" alt="${producto.nombre}">
          </a>

          <div class="tarjeta-cuerpo">

            <!-- Categoría del producto -->
            <span class="tarjeta-categoria">${producto.categoria}</span>

            <!-- Nombre del producto -->
            <h3 class="tarjeta-nombre">${producto.nombre}</h3>

            <!-- Precio formateado -->
            <span class="tarjeta-precio">${formatearPrecio(producto.precio)}</span>

            <div class="tarjeta-acciones">

              <!-- Botón para ir a detalle -->
              <a class="btn-detalle" href="detalle.html?id=${producto.id}">
                Ver
              </a>

              <!-- Botón para agregar al carrito -->
              <!-- data-agregar guarda el id del producto -->
              <button class="btn-agregar" data-agregar="${producto.id}">
                Agregar
              </button>

            </div>
          </div>
        </article>
      </div>
    `;
});