// URL del archivo JSON
const usuarios_json = "./json/usuarios.json";

// Variable global para almacenar los usuarios cargados
let usuarios = [];

// Función para cargar el JSON y almacenarlo en LocalStorage
async function leerUsuarios() {
    try {        
        const response = await fetch(usuarios_json);
        if (!response.ok) throw new Error("Error al cargar usuarios.json");
        usuarios = await response.json();
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    } catch (error) {
        console.error(error);
    }
}

// Función para reproducir sonido
function reproducirSonidoError() {
    const audio = new Audio("images/sonidos/error.wav");
    audio.play();
}

// Función para validar el formulario
function validarLogin(event) {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const mensajeError = document.getElementById("mensaje-Error");

    // Validación de contraseña alfanumérica
    const passwordRegex = /^[a-zA-Z0-9]+$/;
    if (!passwordRegex.test(password)) {
        mensajeError.textContent = "La contraseña debe ser alfanumérica.";
        reproducirSonidoError();
        return;
    }

    // Recuperación de usuarios desde LocalStorage
    const usuariosAlmacenados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioValido = usuariosAlmacenados.find(
        user => user.usuario === username && user.contraseña === password
    );

    if (usuarioValido) {
        const usuarioActual = {
            nombre: usuarioValido.nombre,
            apellido: usuarioValido.apellido
        };
        localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));        
        window.location.href = "html/nivel.html";
    } else {
        mensajeError.textContent = "Usuario o contraseña incorrectos.";
        reproducirSonidoError();
    }
}

// Asignar eventos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    leerUsuarios();
    
    const loginBoton = document.getElementById("login-boton");
    loginBoton.addEventListener("click", validarLogin);

    const loginTecla = document.getElementById("login-form");
    loginTecla.addEventListener("keypress", (evento) => {
        if (evento.key === "Enter") {
            evento.preventDefault();
            validarLogin();
        }
    });

    const passwordInput = document.getElementById("password");
    // Mostrar la contraseña al pasar el ratón por encima
    passwordInput.addEventListener("mouseover", () => {
        passwordInput.type = "text";
    });
    // Ocultar la contraseña al quitar el ratón
    passwordInput.addEventListener("mouseout", () => {
        passwordInput.type = "password";
    });
});