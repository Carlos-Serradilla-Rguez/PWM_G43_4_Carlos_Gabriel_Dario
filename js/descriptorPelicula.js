import { cargarPeliculasSeries, loadDefaultTemplates, loadTemplate, observarRuletas } from "./script.js";

// Función para cargar la película desde un archivo JSON
async function cargarImagen(idPelicula) {
    try {
        let response = await fetch('../json/peliculas.json');
        const peliculas = await response.json();
        response = await fetch('../json/series.json');
        const series = await response.json();

        let pelicula = peliculas.find(p => p.id == idPelicula);
        if (!pelicula) {
            pelicula = series.find(p => p.id == idPelicula);
        }

        if (pelicula) {
            console.log("Película encontrada:", pelicula);
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
        let response = await fetch('../json/peliculas.json');
        const peliculas = await response.json();
        response = await fetch('../json/series.json');
        const series = await response.json();
        response = await fetch('../json/actores.json');
        const lista_actores = await response.json();

        let pelicula = peliculas.find(p => p.id == idPelicula) || series.find(p => p.id == idPelicula);
        if (!pelicula) {
            console.log("Error en el número de la película");
            return;
        }

        const actores = pelicula.actores;

        for (let i = 0; i < actores.length; i++) {
            let contenedor = document.getElementById(`imagen-contenedor-${i + 1}`);
            if (contenedor) {
                let actorId = actores[i];
                let actorActual = lista_actores.find(p => p.id == actorId);

                if (actorActual) {
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
    for (let i = 1; i <= totalElementos; i++) {
        const elemento = document.getElementById(`${nombreContenedor}-${i}`);

        if (elemento) {
            console.log(elemento);
            elemento.addEventListener('click', async e => {
                e.preventDefault();
                const idPelicula = elemento.getAttribute('data-id');
                window.location.href = '../Paginas/Union-DescriptorPeliculas.html?idPelicula=' + idPelicula;
            });
        } else {
            console.log(elemento, " no se ha podido encontrar", nombreContenedor);
        }
    }
}
export { agregarEventListenerElementos };

async function initializePage() {
    loadDefaultTemplates();
    loadTemplate('/templates/Imagen_Rotativa.html', 'Ruleta-Similares');
    loadTemplate('/templates/Imagen_Rotativa.html', 'Ruleta-Recomendaciones');
    observarRuletas();

    const urlParams = new URLSearchParams(window.location.search);
    const idPelicula = urlParams.get('idPelicula');

    if (idPelicula) {
        console.log("ID de la película:", idPelicula);
        await cargarImagen(idPelicula);
        await cargarActores(idPelicula);
        await cargarPeliculasSeries('imagen-recomendacion', 10);
        agregarEventListenerElementos('imagen-recomendacion', 10);


        const botonAñadir = document.getElementById('Añadir');
        if (botonAñadir) {
            botonAñadir.addEventListener('click', () => {
                const usuario = JSON.parse(localStorage.getItem("usuario_logueado"));
                if (!usuario) {
                    alert("Debes iniciar sesión para añadir a tu lista.");
                    return;
                }

                if (!usuario.lista_vistas) {
                    usuario.lista_vistas = [];
                }

                if (!usuario.lista_vistas.includes(idPelicula)) {
                    usuario.lista_vistas.push(idPelicula);
                    localStorage.setItem("usuario_logueado", JSON.stringify(usuario));
                    alert("Película/Serie añadida a tu lista.");
                } else {
                    alert("Ya está en tu lista.");
                }
            });
        }

    } else {
        console.error("No se encontró el idPelicula en la URL");
    }
}

window.onload = async function () {
    await initializePage();
};

