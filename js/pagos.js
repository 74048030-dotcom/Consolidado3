/* FORMULARIO de checkout */
const formulario = document.getElementById("form-checkout");

/* Contenedor de mensajes (error o éxito) */
const aviso = document.getElementById("aviso");


/* ====== FUNCIONES VISUALES DE VALIDACIÓN ====== */

// Muestra error en un input
function mostrarError(input, mensaje) {

    const campo = input.parentElement;
    const error = campo.querySelector(".campo-error");

    input.classList.remove("correcto");
    input.classList.add("error");

    error.textContent = mensaje;
}

// Marca input como correcto
function mostrarCorrecto(input) {

    const campo = input.parentElement;
    const error = campo.querySelector(".campo-error");

    input.classList.remove("error");
    input.classList.add("correcto");

    error.textContent = "";
}


/* ====== VALIDACIONES ====== */

// Validar nombre
function validarNombre() {

    const nombre = document.getElementById("nombre");

    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (nombre.value.trim().length < 3) {
        mostrarError(nombre, "Ingrese un nombre válido (mínimo 3 caracteres)");
        return false;
    }

    if (!regex.test(nombre.value.trim())) {
        mostrarError(nombre, "El nombre no puede contener números ni caracteres especiales");
        return false;
    }

    mostrarCorrecto(nombre);
    return true;
}


// Validar email
function validarEmail() {

    const email = document.getElementById("email");

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email.value.trim())) {
        mostrarError(email, "Ingrese un correo electrónico válido");
        return false;
    }

    mostrarCorrecto(email);
    return true;
}


// Validar teléfono (Perú: empieza con 9 y tiene 9 dígitos)
function validarTelefono() {

    const telefono = document.getElementById("telefono");

    const regex = /^9\d{8}$/;

    if (!regex.test(telefono.value.trim())) {
        mostrarError(
            telefono,
            "El teléfono debe tener 9 dígitos y comenzar con 9"
        );
        return false;
    }

    mostrarCorrecto(telefono);
    return true;
}


// Validar dirección
function validarDireccion() {

    const direccion = document.getElementById("direccion");

    if (direccion.value.trim().length < 10) {
        mostrarError(
            direccion,
            "Ingrese una dirección más detallada"
        );
        return false;
    }

    mostrarCorrecto(direccion);
    return true;
}


// Validar fecha de entrega
function validarFecha() {

    const fecha = document.getElementById("fecha");

    if (!fecha.value) {
        mostrarError(fecha, "Seleccione una fecha de entrega");
        return false;
    }

    const hoy = new Date();
    hoy.setHours(0,0,0,0);

    const fechaElegida = new Date(fecha.value);

    if (fechaElegida < hoy) {
        mostrarError(
            fecha,
            "La fecha no puede ser anterior a hoy"
        );
        return false;
    }

    mostrarCorrecto(fecha);
    return true;
}


/* ====== VALIDACIÓN EN TIEMPO REAL ====== */

// Cuando el usuario sale del input (blur)
document.getElementById("nombre")
    .addEventListener("blur", validarNombre);

document.getElementById("email")
    .addEventListener("blur", validarEmail);

document.getElementById("telefono")
    .addEventListener("blur", validarTelefono);

document.getElementById("direccion")
    .addEventListener("blur", validarDireccion);

// Cuando cambia la fecha
document.getElementById("fecha")
    .addEventListener("change", validarFecha);


/* ====== ENVÍO DEL FORMULARIO ====== */

formulario.addEventListener("submit", e => {

    e.preventDefault(); // evita recargar la página

    aviso.innerHTML = ""; // limpia mensajes

    // valida todos los campos
    const esValido =
        validarNombre() &&
        validarEmail() &&
        validarTelefono() &&
        validarDireccion() &&
        validarFecha();

    // si algo falla
    if (!esValido) {
        aviso.innerHTML = `
            <div class="aviso-error">
                Corrige los campos marcados antes de continuar.
            </div>
        `;
        return;
    }

    // obtiene carrito desde localStorage
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // si carrito vacío
    if (carrito.length === 0) {
        aviso.innerHTML = `
            <div class="aviso-error">
                Tu carrito está vacío.
            </div>
        `;
        return;
    }

    // SIMULACIÓN DE COMPRA EXITOSA
    localStorage.removeItem("carrito");

    // reinicia contador del carrito
    const contador = document.getElementById("contador-carrito");
    if (contador) {
        contador.textContent = "0";
        contador.classList.remove("show");
    }

    // mensaje de éxito
    aviso.innerHTML = `
        <div class="aviso-exito">
            ¡Pedido confirmado con éxito!<br>
            Nos contactaremos contigo pronto para la entrega.
        </div>
    `;

    // limpia formulario
    formulario.reset();

    // quita estilos de validación
    document.querySelectorAll(".correcto")
        .forEach(el => el.classList.remove("correcto"));
});