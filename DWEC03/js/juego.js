document.addEventListener("DOMContentLoaded", async () => {
    const tiempoJuego = parseInt(localStorage.getItem("tiempoJuego")) || 60;
    const imagenElemento = document.getElementById("imagen-pelicula");
    const temporizadorElemento = document.getElementById("temporizador");
    const inputTitulo = document.getElementById("titulo-input");
    const botonAdivinar = document.getElementById("adivinar-boton");
    const botonAnterior = document.getElementById("anterior-imagen");
    const botonSiguiente = document.getElementById("siguiente-imagen");
    const mensajeFallo = document.getElementById("mensaje-Fallo");

    const sonidoError = new Audio("./../images/sonidos/error.wav");
    const sonidoTransicion = new Audio("./../images/sonidos/transicion.wav");
    const sonidoVictoria = new Audio("./../images/sonidos/victoria.mp3");
    const sonidoDerrota = new Audio("./../images/sonidos/perder.wav");

    let tiempoRestante = tiempoJuego;
    let peliculaActual = null;
    let indiceImagenActual = 0;
    let intentosFallidos = 0;
    let peliculas = [];

    // Cargar datos del JSON
    async function cargarPeliculas() {
        try {
            const respuesta = await fetch("../json/peliculas.json");
            if (!respuesta.ok) {
                throw new Error(`Error al cargar el JSON: ${respuesta.status}`);
            }
            peliculas = await respuesta.json();
            console.log("Películas cargadas:", peliculas);
        } catch (error) {
            console.error("Error cargando las películas:", error);
        }
    };

    // Seleccionar una película aleatoria
    function seleccionarPelicula() {
        const randomId = Math.floor(Math.random() * peliculas.length);
        peliculaActual = peliculas[randomId];
        indiceImagenActual = 0;
        localStorage.setItem("peliculaSeleccionada", JSON.stringify(peliculaActual));
        actualizarImagenYPista();
    };

    // Actualizar imagen y pista
    function actualizarImagenYPista() {        
        if (peliculaActual && peliculaActual.imagenes[indiceImagenActual]) {
            imagenElemento.src = peliculaActual.imagenes[indiceImagenActual];
            imagenElemento.alt = peliculaActual.pistas[indiceImagenActual];
            imagenElemento.title = peliculaActual.pistas[indiceImagenActual];
            sonidoTransicion.play();            
        } else {
            console.error("No se pudo cargar la imagen o pista actual.");
        }
    };

    // Cambiar a la siguiente imagen
    function cambiarImagenSiguiente() {
        if (peliculaActual) {
            indiceImagenActual = (indiceImagenActual + 1) % peliculaActual.imagenes.length;
            actualizarImagenYPista();
            // Restar 5 segundos al temporizador
            tiempoRestante -= 5;
            mensajeFallo.textContent = "Has cambiado la imagen, pierdes 5 segundos.";
            if (tiempoRestante < 0) {
                tiempoRestante = 0;
            }
            actualizarTemporizador();
        }
    };

    // Cambiar a la imagen anterior
    function cambiarImagenAnterior() {
        if (peliculaActual) {
            indiceImagenActual =
                (indiceImagenActual - 1 + peliculaActual.imagenes.length) % peliculaActual.imagenes.length;
            actualizarImagenYPista();
        }
    };

    // Validar respuesta
    function validarRespuesta() {
        const respuesta = inputTitulo.value.trim().toUpperCase();        
        if (respuesta === peliculaActual.titulo_es.toUpperCase() || respuesta === peliculaActual.titulo_en.toUpperCase()) {
            sonidoVictoria.play();
            alert("¡Correcto! Has ganado.");
            localStorage.setItem("victorias", (parseInt(localStorage.getItem("victorias")) || 0) + 1);
            localStorage.setItem("tiempoRestante", tiempoRestante);
            window.location.href = "victoria.html";
        } else {
            sonidoError.play();
            tiempoRestante -= 2;
            intentosFallidos++;
            mensajeFallo.textContent = "Respuesta incorrecta, pierdes 2 segundos.";
        }
    };

    // Inicializar el temporizador
    function actualizarTemporizador() {
        temporizadorElemento.textContent = tiempoRestante;

        // Cambiar el color a rojo si quedan 10 segundos o menos
        if (tiempoRestante <= 10) {
            temporizadorElemento.style.color = "red";
        } else {
            temporizadorElemento.style.color = ""; // Restablecer el color por defecto
        }

        if (tiempoRestante <= 0) {
            clearInterval(intervalo);
            sonidoDerrota.play();
            alert("Se acabó el tiempo. ¡Has perdido!");
            window.location.href = "derrota.html";
        }
    };

    const intervalo = setInterval(() => {
        tiempoRestante--;
        actualizarTemporizador();
    }, 1000);

    // Configurar eventos de los botones
    botonSiguiente.addEventListener("click", cambiarImagenSiguiente);
    botonAnterior.addEventListener("click", cambiarImagenAnterior);
    botonAdivinar.addEventListener("click", validarRespuesta);

    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "Enter":
                validarRespuesta();
                break;
            case "ArrowLeft":
                event.preventDefault();
                cambiarImagenAnterior();
                break;
            case "ArrowRight":
                event.preventDefault();
                cambiarImagenSiguiente();
                break;
            default:
                break;
        }
    });    

    // Inicializar el juego
    await cargarPeliculas();
    if (peliculas.length > 0) {
        seleccionarPelicula();
        actualizarTemporizador();
    } else {
        console.error("No se pudieron cargar las películas.");
    }
});