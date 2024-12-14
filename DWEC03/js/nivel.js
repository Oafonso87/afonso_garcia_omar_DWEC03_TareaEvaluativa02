const principianteBoton = document.getElementById("principiante-boton");
const intermedioBoton = document.getElementById("inetermedio-boton");
const avanzadoBoton = document.getElementById("avanzado-boton");
const cuentaAtrasDiv = document.getElementById("cuenta-atras");
const body = document.body;

function redirigirTiempo (tiempo) {
    // Almacenar el tiempo en localStorage
    localStorage.setItem("tiempoJuego", tiempo);

    // Redirigir a la página del juego
    window.location.href = "juego.html";
};

// Función para mostrar el div y cambiar el color del body
function mostrarEfecto () {
    cuentaAtrasDiv.style.display = "block";
    body.classList.add("cambio-color");
};

// Función para ocultar el div y restaurar el color del fondo
function ocultarEfecto () {
    cuentaAtrasDiv.style.display = "none";
    body.classList.remove("cambio-color");
};

document.addEventListener("DOMContentLoaded", () => {    
    
    principianteBoton.addEventListener("mouseover", mostrarEfecto);
    principianteBoton.addEventListener("mouseout", ocultarEfecto);
    intermedioBoton.addEventListener("mouseover", mostrarEfecto);
    intermedioBoton.addEventListener("mouseout", ocultarEfecto);
    avanzadoBoton.addEventListener("mouseover", mostrarEfecto);
    avanzadoBoton.addEventListener("mouseout", ocultarEfecto);

    principianteBoton.addEventListener("click", () => redirigirTiempo(60));
    intermedioBoton.addEventListener("click", () => redirigirTiempo(45));
    avanzadoBoton.addEventListener("click", () => redirigirTiempo(30));

});



