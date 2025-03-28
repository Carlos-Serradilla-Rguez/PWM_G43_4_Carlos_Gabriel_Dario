import {loadDefaultTemplates, loadTemplate, observarRuletas} from "./script.js";


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

async function aplicarEstilosDesplazamiento() {
    setTimeout(() => {
        const containers = document.querySelectorAll(".gallery-container");
        console.log("Containers encontrados:", containers);
        containers.forEach(container => {
            container.style.overflowX = "auto";
            container.style.scrollSnapType = "x mandatory";
            container.scrollLeft = 0; // Restablece el scroll a la posición inicial

            // Forzar redibujado
            container.style.display = "none";
            void container.offsetWidth; // Hack para forzar el re-render
            container.style.display = "flex";

            console.log("✅ Se aplicaron estilos de desplazamiento.");
        });
    }, 100);
}

async function initializePage() {
    if (!localStorage.getItem("usuario_logueado")) {
        window.location.href = "../Paginas/Union-LogIn.html";
        return;
    }

    console.log(localStorage.getItem("usuario_logueado"));

    loadDefaultTemplates();

    // Esperar a que los templates se carguen antes de aplicar estilos
    await loadTemplate('/templates/Imagen_Rotativa.html', 'Ruleta-Similares');
    await loadTemplate('/templates/Imagen_Rotativa.html', 'Ruleta-Recomendaciones');

    // Ahora aplicamos los estilos de desplazamiento
    aplicarEstilosDesplazamiento();

    asignarIdsACarrusel();

    observarRuletas();
    await cargarDatos();
}






window.onload = async () => initializePage();