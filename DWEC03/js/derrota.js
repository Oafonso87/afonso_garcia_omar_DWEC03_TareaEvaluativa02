const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

if (usuarioActual) {
    const saludo = `Otra vez será, ${usuarioActual.nombre} ${usuarioActual.apellido}`;
    const victorias = localStorage.getItem("victorias") || 0;

    document.getElementById("mensaje-jugador").textContent = saludo;
    document.getElementById("victorias").textContent = `Número de victorias: ${victorias}`;
}

document.addEventListener("DOMContentLoaded", () => {
    const rejugarBoton = document.getElementById("rejugar-boton");
    const salirBoton = document.getElementById("salir-boton");

    // Redirigir a nivel.html al pulsar "Rejugar"
    rejugarBoton.addEventListener("click", () => {
        window.location.href = "nivel.html";
    });

    // Redirigir a index.html al pulsar "Salir"
    salirBoton.addEventListener("click", () => {
        window.location.href = "./../index.html";
    });
});