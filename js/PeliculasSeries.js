import {cargarPeliculasSeries, cargarRecomendaciones, loadDefaultTemplates, loadTemplate} from "./script.js";


function addEventListenerBotonesPagina() {
    const botones = document.querySelectorAll('.boton');
    botones.forEach(botones => {
        botones.addEventListener('click', async e => {
            location.reload();
        })
    })
}


async function initializePage() {
    loadDefaultTemplates();

    loadTemplate("/templates/Buscador.html", 'buscador-contenedor');
    await cargarRecomendaciones('/templates/Pelicula_Sinopsis.html', "contenedor-peliculas", 'elementos_peliculas', 20); // Cargar las recomendaciones si es necesario
    /*loadTemplate('../templates/Contenedor_filtro.html', 'template-ajustes');*/
    await cargarRecomendaciones('/templates/Contenedor_filtro.html', "template-ajustes", 'contenedor-filtro', 1); // Cargar las recomendaciones si es necesario
    await cargarRecomendaciones('/templates/Label.html', "contenedor-filtro", 'elemento-filtro', 5); // Cargar las recomendaciones si es necesario
    await cargarPeliculasSeries('elementos_peliculas', 20);
    addEventListenerBotonesPagina();
}


window.onload = async () => initializePage();