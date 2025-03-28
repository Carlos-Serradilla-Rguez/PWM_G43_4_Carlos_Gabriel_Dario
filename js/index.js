import {loadTemplate, cargarPeliculasSeries, loadDefaultTemplates, cargarRecomendaciones, cargarHilo} from "./script.js";

function agregarEventListenerElementos(nombreContenedor, totalElementos) {
    for (let i = 1; i<= totalElementos; i++) {
        const elemento = document.getElementById(`${nombreContenedor}-${i}`);

        if (elemento) {
            elemento.addEventListener('click', async e => {
                e.preventDefault();
                const idPelicula = elemento.getAttribute('data-id');
                window.location.href = './Paginas/Union-DescriptorPeliculas.html?idPelicula=' + idPelicula;
            })
        }
    }
}

async function initializePage() {
    loadDefaultTemplates();
    loadTemplate("/templates/Buscador.html", 'buscador-contenedor');
    await cargarRecomendaciones('/templates/Pelicula_Sinopsis.html', "contenedor-recomendaciones", 'elemento-recomendacion', 3); // Cargar las recomendaciones si es necesario
    await cargarRecomendaciones('/templates/Pelicula_Sinopsis.html', "masvistos-contenedor", 'elemento-masvisto', 5); // Cargar las recomendaciones si es necesario
    loadTemplate('/templates/Blog.html', "mainblog-contenedor"); // Cargar las recomendaciones si es necesario
    await cargarPeliculasSeries('elemento-recomendacion', 3);
    await cargarPeliculasSeries('elemento-masvisto', 5);
    await cargarHilo('mainblog-contenedor', 1);
    agregarEventListenerElementos('elemento-recomendacion', 3);
    agregarEventListenerElementos('elemento-masvisto', 5);
}

window.onload = async function() {
    await initializePage();
}