import {cargarPeliculasSeries, loadDefaultTemplates, loadTemplate, observarRuletas} from "./script.js";

// Función para cargar la película desde un archivo JSON
async function cargarImagen(idPelicula) {
    try {
        // Simular la carga de datos desde un archivo JSON
        let response = await fetch('../json/peliculas.json');
        const peliculas = await response.json();
        response = await fetch('../json/series.json');
        const series = await response.json();

        // Buscar la película con el id especificado
        let pelicula = peliculas.find(p => p.id == idPelicula);
        if(!pelicula) {
            pelicula = series.find(p => p.id == idPelicula);
        }

        if (pelicula) {
            console.log("Película encontrada:", pelicula);
            // Aquí puedes actualizar el contenido de la página con la información de la película
            // Ejemplo: mostrar la información en un div específico
            document.getElementById('Nombre-Pelicula').textContent = pelicula.titulo;
            document.getElementById('Descripcion').textContent = pelicula.sinopsis;
            document.getElementById('CarteleraPerfil').src = pelicula.portada;
        } else {
            console.error("Película no encontrada");
        }
    } catch (error) {
        console.error("Error al cargar las películas:", error);
    }
}


async function initializePage() {
    loadDefaultTemplates();
    loadTemplate('/templates/Imagen_Rotativa.html', 'Ruleta-Similares');
    loadTemplate('/templates/Imagen_Rotativa.html', 'Ruleta-Recomendaciones');
    observarRuletas();

    const urlParams = new URLSearchParams(window.location.search);
    const idPelicula = urlParams.get('idPelicula');

    if (idPelicula) {
        console.log("ID de la película:", idPelicula);
        await cargarImagen(idPelicula); // Llamar a la función para cargar la película
        await cargarPeliculasSeries('imagen-contenedor', 10);
        await cargarPeliculasSeries('imagen-recomendacion', 10);

    } else {
        console.error("No se encontró el idPelicula en la URL");
    }
}


window.onload = async function(){
    await initializePage();
}