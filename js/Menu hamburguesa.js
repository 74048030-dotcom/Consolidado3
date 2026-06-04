// Selecciona el botón del menú hamburguesa desde el HTML
const hamburger = document.getElementById("hamburger");

// Selecciona el contenedor de los links de navegación
const navLinks = document.getElementById("navLinks");

// Cuando el usuario hace click en el botón hamburguesa...
hamburger.addEventListener("click", () => {

  // Alterna la clase "active" en el botón
  // Si no la tiene, la agrega; si la tiene, la quita
  hamburger.classList.toggle("active");

  // Alterna la clase "active" en el menú de navegación
  // Esto muestra u oculta los links en móvil
  navLinks.classList.toggle("active");
});