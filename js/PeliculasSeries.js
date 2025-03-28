import {
    cargarPeliculasSeries,
    cargarRecomendaciones,
    loadDefaultTemplates,
    loadTemplate,
    moverElementosFiltro
} from "./script.js";


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
    await cargarRecomendaciones('../templates/Contenedor_filtro.html', "template-filtros", 'contenedor-filtro', 1);
    await cargarRecomendaciones('../templates/Label.html', "contenedor-filtro-1", 'elemento-filtro', 5);
    await cargarPeliculasSeries('elementos_peliculas', 20);
    addEventListenerBotonesPagina();
    moverElementosFiltro()
}




window.onload = async () => initializePage();