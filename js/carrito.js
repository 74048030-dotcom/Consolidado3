/* OBTENER carrito desde localStorage */
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
    // Si no existe carrito, devuelve un array vacío
}

/* GUARDAR carrito en localStorage */
function guardarCarrito(carrito) {
    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );
    // Convierte el array a texto para poder guardarlo
}

/* ACTUALIZAR contador del carrito en el navbar */
function actualizarContadorCarrito() {

    const contador =
        document.getElementById("contador-carrito");

    // Si no existe el contador en el HTML, no hace nada
    if (!contador) return;

    const carrito = obtenerCarrito();

    // Suma total de productos (no solo items)
    const total = carrito.reduce(
        (acc, item) => acc + item.cantidad,
        0
    );

    contador.textContent = total;

    // Mostrar u ocultar badge del carrito
    if (total > 0) {
        contador.classList.add("show");
    } else {
        contador.classList.remove("show");
    }
}

/* AGREGAR producto al carrito */
function agregarAlCarrito(id) {

    const carrito = obtenerCarrito();

    // Busca si el producto ya existe en el carrito
    const itemExistente = carrito.find(
        item => item.id === id
    );

    if (itemExistente) {
        // Si ya existe, aumenta cantidad
        itemExistente.cantidad++;
    } else {
        // Si no existe, lo agrega por primera vez
        carrito.push({
            id,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);

    actualizarContadorCarrito();
}

/* EVENTO GLOBAL para botones "Agregar" */
document.addEventListener("click", e => {

    if (e.target.matches(".btn-agregar")) {

        const id = Number(
            e.target.dataset.agregar
        );
        // obtiene el id desde data-agregar

        agregarAlCarrito(id);
    }
});

/* Cuando carga la página */
document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
});