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

async function cargarActores(idPelicula) {
    try {
        // Obtener los datos
        let response = await fetch('../json/peliculas.json');
        const peliculas = await response.json();
        response = await fetch('../json/series.json');
        const series = await response.json();
        response = await fetch('../json/actores.json');
        const lista_actores = await response.json();

        // Buscar la película o serie por id
        let pelicula = peliculas.find(p => p.id == idPelicula);
        if (!pelicula) {
            pelicula = series.find(p => p.id == idPelicula);
            if (!pelicula) {
                console.log("Error en el número de la pelicula");
                return;
            }
        }

        // Obtener los actores de la película o serie
        const actores = pelicula.actores;

        // Iterar sobre los actores para mostrarlos en los contenedores
        for (let i = 0; i < actores.length; i++) { // Usamos `i` sin el `-1` porque ya es un índice base 0
            let contenedor = document.getElementById(`imagen-contenedor-${i + 1}`);
            if (contenedor) {
                let actorId = actores[i]; // Aquí debería ser el ID del actor
                let actorActual = lista_actores.find(p => p.id == actorId);

                if (actorActual) {
                    // Actualizar la imagen y el nombre
                    let img = contenedor.querySelector('img');
                    let nombre = contenedor.querySelector('.synopsis');
                    if (img) {
                        img.src = actorActual.foto;
                        img.alt = actorActual.nombre;
                    }
                    if (nombre) {
                        nombre.textContent = actorActual.nombre;
                    }
                }
            }
        }
    } catch (e) {
        console.log("Error: ", e);
    }
}

function agregarEventListenerElementos(nombreContenedor, totalElementos) {
    for (let i = 1; i<= totalElementos; i++) {
        const elemento = document.getElementById(`${nombreContenedor}-${i}`);

        if (elemento) {
            console.log(elemento)
            elemento.addEventListener('click', async e => {
                e.preventDefault();
                const idPelicula = elemento.getAttribute('data-id');
                window.location.href = '../Paginas/Union-DescriptorPeliculas.html?idPelicula=' + idPelicula;
            })
        } else {
            console.log(elemento, " no se ha podido encontrar", nombreContenedor);
        }
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
        await cargarActores(idPelicula);
        await cargarPeliculasSeries('imagen-recomendacion', 10);
        agregarEventListenerElementos('imagen-recomendacion', 10);
    } else {
        console.error("No se encontró el idPelicula en la URL");
    }
}


window.onload = async function(){
    await initializePage();
}