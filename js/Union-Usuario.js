import {loadDefaultTemplates, loadTemplate} from "./script.js";


async function cargarDatos() {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuario_logueado"));
    let nombre = document.getElementById("nombre");
    if(nombre) {
        nombre.textContent = usuarioLogueado.nombre;
    }

    let descripcion = document.getElementById("descripcion");
    if(descripcion) {
        descripcion.textContent = "";
    }

    document.getElementById("cerrar").addEventListener("click", () => {
        localStorage.clear();
        window.location.href = window.location.href;
    })
}


async function initializePage() {
    if(localStorage.getItem("usuario_logueado")) {
        console.log(localStorage.getItem("usuario_logueado"));
    } else {
        window.location.href = "../Paginas/Union-LogIn.html"
    }
    loadDefaultTemplates();
    loadTemplate('/templates/Imagen_Rotativa.html', 'Ruleta-Similares');
    loadTemplate('/templates/Imagen_Rotativa.html', 'Ruleta-Recomendaciones');
    await cargarDatos();
}


window.onload = async () => initializePage();