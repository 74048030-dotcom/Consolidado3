/* Contenedor donde se dibuja el carrito en el HTML */
const contenedor = document.getElementById("carrito-contenido");

/* Formateo de moneda usando formato peruano */
const formatearPrecio = precio =>
    new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN"
    }).format(precio);

/* OBTENER carrito desde localStorage */
// Si no existe, devuelve un array vacío
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

/* GUARDAR carrito en localStorage */
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* RENDERIZAR todo el carrito en pantalla */
function renderizarCarrito() {

    const carrito = obtenerCarrito();

    // Si no hay productos
    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="carrito-vacio">
                <h2>Tu carrito está vacío</h2>
                <p>Agrega algunas plantas para comenzar.</p>
            </div>
        `;
        return;
    }

    let total = 0;
    let cantidadProductos = 0;
    let htmlProductos = "";

    // Recorre cada producto del carrito
    carrito.forEach(item => {

        const producto = buscarProductoPorId(item.id);
        // busca info completa del producto

        if (!producto) return;

        const subtotal = producto.precio * item.cantidad;

        total += subtotal;
        cantidadProductos += item.cantidad;

        // HTML de cada producto del carrito
        htmlProductos += `
            <article class="carrito-item">

                <img class="carrito-img"
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                >

                <div class="carrito-info">
                    <h3>${producto.nombre}</h3>
                    <p>${formatearPrecio(producto.precio)}</p>
                </div>

                <!-- Botones de cantidad -->
                <div class="carrito-cantidad">

                    <button class="btn-restar" data-id="${producto.id}">
                        -
                    </button>

                    <span>${item.cantidad}</span>

                    <button class="btn-sumar" data-id="${producto.id}">
                        +
                    </button>

                </div>

                <!-- Subtotal del producto -->
                <div class="carrito-subtotal">
                    ${formatearPrecio(subtotal)}
                </div>

                <!-- Eliminar producto -->
                <button class="btn-eliminar" data-id="${producto.id}">
                    Eliminar
                </button>

            </article>
        `;
    });

    // HTML final del carrito + resumen
    contenedor.innerHTML = `
        <div class="carrito-layout">

            <div class="carrito-productos">
                ${htmlProductos}
            </div>

            <aside class="carrito-resumen">

                <h2>Resumen</h2>

                <p>
                    Productos
                    <strong>${cantidadProductos}</strong>
                </p>

                <p>
                    Total
                    <strong>${formatearPrecio(total)}</strong>
                </p>

                <button class="btn-comprar" id="btn-comprar">
                    Continuar compra
                </button>

                <button id="vaciar-carrito">
                    Vaciar carrito
                </button>

            </aside>

        </div>
    `;
}

/* Render inicial del carrito */
renderizarCarrito();

/* AUMENTAR cantidad */
document.addEventListener("click", e => {

    if (e.target.classList.contains("btn-sumar")) {

        const id = Number(e.target.dataset.id);

        const carrito = obtenerCarrito();

        const producto = carrito.find(p => p.id === id);

        producto.cantidad++;

        guardarCarrito(carrito);

        renderizarCarrito();
        actualizarContadorCarrito();
    }
});

/* DISMINUIR cantidad */
document.addEventListener("click", e => {

    if (e.target.classList.contains("btn-restar")) {

        const id = Number(e.target.dataset.id);

        let carrito = obtenerCarrito();

        const producto = carrito.find(p => p.id === id);

        producto.cantidad--;

        // elimina si cantidad es 0
        carrito = carrito.filter(p => p.cantidad > 0);

        guardarCarrito(carrito);

        renderizarCarrito();
        actualizarContadorCarrito();
    }
});

/* ELIMINAR producto */
document.addEventListener("click", e => {

    if (e.target.classList.contains("btn-eliminar")) {

        const id = Number(e.target.dataset.id);

        const carrito = obtenerCarrito().filter(
            p => p.id !== id
        );

        guardarCarrito(carrito);

        renderizarCarrito();
        actualizarContadorCarrito();
    }
});

/* VACÍAR carrito completo */
document.addEventListener("click", e => {

    if (e.target.id === "vaciar-carrito") {

        localStorage.removeItem("carrito");

        renderizarCarrito();
        actualizarContadorCarrito();
    }
});

/* ACTUALIZAR contador del carrito en el navbar */
function actualizarContadorCarrito() {

    const contador = document.getElementById("contador-carrito");

    if (!contador) return;

    const carrito = obtenerCarrito();

    const total = carrito.reduce(
        (acc, item) => acc + item.cantidad,
        0
    );

    contador.textContent = total;

    // mostrar u ocultar contador
    if (total > 0) {
        contador.classList.add("show");
    } else {
        contador.classList.remove("show");
    }
}

/* IR A PAGOS */
document.addEventListener("click", e => {

    if (e.target.id === "btn-comprar") {

        const carrito = obtenerCarrito();

        if (carrito.length === 0) {
            alert("Tu carrito está vacío");
            return;
        }

        window.location.href = "pagos.html";
    }
});