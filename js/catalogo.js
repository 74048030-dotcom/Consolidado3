/* Referencias a elementos del DOM (HTML) */
const grid = document.getElementById("grid-catalogo"); // contenedor de productos
const inputBuscar = document.getElementById("buscar"); // input de búsqueda
const selectCategoria = document.getElementById("filtro-categoria"); // filtro por categoría
const conteo = document.getElementById("conteo"); // muestra cantidad de productos

/* Validación: si no existen estos elementos, no ejecuta el código */
if (grid && inputBuscar && selectCategoria && conteo) {

  /* Copia de productos para poder filtrarlos sin modificar el original */
  let productosFiltrados = [...PRODUCTOS];

const formatearPrecio = precio =>
    new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN"
    }).format(precio);

  /* Renderiza productos en pantalla */
  function renderProductos(lista) {

    grid.innerHTML = ""; // limpia el catálogo antes de renderizar

    /* Si no hay productos */
    if (lista.length === 0) {
      grid.innerHTML = `<p class="vacio">No se encontraron productos</p>`;
      conteo.textContent = "0 productos";
      return;
    }

    /* Recorre cada producto y lo pinta en HTML */
    lista.forEach(producto => {
      grid.innerHTML += `
        <article class="tarjeta">

          <!-- Link a detalle del producto -->
          <a href="detalle.html?id=${producto.id}">
            <img class="tarjeta-img" src="${producto.imagen}" alt="${producto.nombre}">
          </a>

          <div class="tarjeta-cuerpo">

            <!-- Categoría -->
            <span class="tarjeta-categoria">${producto.categoria}</span>

            <!-- Nombre -->
            <h3 class="tarjeta-nombre">${producto.nombre}</h3>

            <!-- Precio -->
            <span class="tarjeta-precio">${formatearPrecio(producto.precio)}</span>

            <div class="tarjeta-acciones">

              <!-- Ver detalle -->
              <a class="btn-detalle" href="detalle.html?id=${producto.id}">
                Ver
              </a>

              <!-- Botón agregar al carrito -->
              <button class="btn-agregar" data-agregar="${producto.id}">
                Agregar
              </button>

            </div>
          </div>
        </article>
      `;
    });

    /* Actualiza contador de productos */
    conteo.textContent = `${lista.length} productos`;
  }

  /* Aplica filtros de búsqueda + categoría */
  function aplicarFiltros() {

    const texto = inputBuscar.value.toLowerCase(); // texto ingresado
    const categoria = selectCategoria.value; // categoría seleccionada

    productosFiltrados = PRODUCTOS.filter(p => {

      /* Busca coincidencia por palabras */
      const coincideTexto = p.nombre
        .toLowerCase()
        .split(" ")
        .some(palabra => palabra.startsWith(texto));

      /* Filtra por categoría */
      const coincideCategoria =
        categoria === "" || p.categoria === categoria;

      return coincideTexto && coincideCategoria;
    });

    /* Vuelve a renderizar con los filtros aplicados */
    renderProductos(productosFiltrados);
  }

  /* Carga categorías dinámicamente en el select */
  function cargarCategorias() {

    const categorias = [...new Set(PRODUCTOS.map(p => p.categoria))];
    // Set elimina duplicados

    categorias.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;

      // Capitaliza primera letra
      option.textContent =
        cat.charAt(0).toUpperCase() + cat.slice(1);

      selectCategoria.appendChild(option);
    });
  }

  /* Eventos */
  inputBuscar.addEventListener("input", aplicarFiltros);
  selectCategoria.addEventListener("change", aplicarFiltros);

  /* Inicialización */
  cargarCategorias();        // llena el select
  renderProductos(PRODUCTOS); // muestra todos los productos
}