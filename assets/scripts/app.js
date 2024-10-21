// NAVBAR COLLAPSE
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
  
    // Cerrar la barra de navegación al hacer clic en un elemento nav-link, excepto dropdown-toggle
    document.querySelectorAll('.nav-item:not(.dropdown) .nav-link').forEach(function(element) {
      element.addEventListener('click', function() {
        if (navbarCollapse.classList.contains('show')) {
          navbarToggler.click();
        }
      });
    });
  
    // Manejar el clic en los elementos del menú desplegable
    const dropdown = document.querySelector('.nav-item.dropdown');
    dropdown.addEventListener('click', function(event) {
      // Evitar que el menú desplegable se cierre al hacer clic en el toggle
      if (event.target.classList.contains('dropdown-toggle')) {
        this.classList.toggle('open');
      } else {
        // Cerrar todo si se hace clic en un elemento del menú desplegable
        if (navbarCollapse.classList.contains('show')) {
          navbarToggler.click();
        }
      }
    });
  });