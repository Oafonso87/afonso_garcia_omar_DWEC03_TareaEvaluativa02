const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
const tiempoRestante = localStorage.getItem("tiempoRestante");
const peliculaGanadora = JSON.parse(localStorage.getItem("peliculaSeleccionada"));
let cartel, enlaceIMDB;

if (usuarioActual) {
    const saludo = `Enhorabuena ${usuarioActual.nombre} ${usuarioActual.apellido}`;
    const victorias = localStorage.getItem("victorias") || 0;

    document.getElementById("mensaje-jugador").textContent = saludo;
    document.getElementById("victorias").textContent = `Número de victorias: ${victorias}`;
    document.getElementById("tiempo-restante").textContent = `Te sobraron ${tiempoRestante} segundos.`;
}

if (peliculaGanadora) {   
    
    cartel = document.getElementById("cartel-ganador");
    cartel.src = peliculaGanadora.cartel;
    cartel.alt = peliculaGanadora.titulo_es;
    cartel.style.display = "none";

    enlaceIMDB = document.getElementById("enlace");
    enlaceIMDB.href = peliculaGanadora.enlace;    
}

document.addEventListener("DOMContentLoaded", () => {
    const rejugarBoton = document.getElementById("rejugar-boton");
    const salirBoton = document.getElementById("salir-boton");
    const desplegarBoton = document.getElementById("desplegar-boton");
    

    // Redirigir a nivel.html al pulsar "Rejugar"
    rejugarBoton.addEventListener("click", () => {
        window.location.href = "nivel.html";
    });

    // Redirigir a index.html al pulsar "Salir"
    salirBoton.addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "./../index.html";
    });

    // Evento para desplegar/ocultar el cartel
    desplegarBoton.addEventListener("click", () => {       
        if (cartel.style.display === "none") {
            cartel.style.display = "block";
        } else {
            cartel.style.display = "none";
        }
    });
});