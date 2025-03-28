import {
    loadDefaultTemplates,
    loadTemplate,
    asignarIdsACarrusel,
    observarRuletas,
    cargarRecomendaciones,
    cargarPeliculasSeries
} from "./script.js";


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

async function cargarLista() {
    try {
        let respuesta = await fetch('../json/peliculas.json');
        const peliculas = await respuesta.json();
        respuesta = await fetch('../json/series.json');
        const series = await respuesta.json();
        const usuarioLogueado = JSON.parse(localStorage.getItem("usuario_logueado"));
        if (!usuarioLogueado || !usuarioLogueado.lista_vistas) {
            console.log("No hay usuario logueado o la lista de vistas está vacía.");
            return;
        }

        let lista = usuarioLogueado.lista_vistas;
        for (let i = 0; i < lista.length; i++) {
            let contenedor = document.getElementById(`imagen-contenedor-${i+1}`);
            if (!contenedor) {
                console.log(`No se encontró el contenedor imagen-contenedor-${i+1}`);
                continue;
            }
            let pelicula = peliculas.find(p => p.id === Number(lista[i])); // Convertir a número por seguridad
            if (!pelicula) {
                pelicula = series.find(p => p.id === Number(lista[i]));
                if(!pelicula){
                    continue;
                }
            }
            if (pelicula) {
                let img = contenedor.querySelector('img'); // Selecciona la primera imagen dentro del contenedor
                let p = contenedor.querySelector('p');

                if (img) img.src = pelicula.portada;
                if (p) p.textContent = pelicula.sinopsis;
            }
        }
    } catch (error) {
        console.error("Error al cargar la lista de películas:", error);
    }
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

    await cargarDatos();
    // Esperar a que los templates se carguen antes de aplicar estilos
    await loadTemplate('/templates/Imagen_Rotativa.html', 'Ruleta-Similares');
    await loadTemplate('/templates/Imagen_Rotativa.html', 'Ruleta-Recomendaciones');

    await aplicarEstilosDesplazamiento();

    await observarRuletas();
    setTimeout( async () => {
        await cargarLista();
        await cargarPeliculasSeries('imagen-recomendacion', 10);
    })
}






window.onload = async () => initializePage();