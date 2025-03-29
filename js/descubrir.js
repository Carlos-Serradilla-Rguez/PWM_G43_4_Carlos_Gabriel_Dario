import { loadDefaultTemplates, loadTemplate } from "./script.js";

async function cargarDescubrir(containerBaseId, excluirId = null) {
    try {
        let response = await fetch('/json/peliculas.json');
        const peliculas = await response.json();
        response = await fetch('/json/series.json');
        const series = await response.json();

        let contenido = [...peliculas, ...series];

        // Excluir la película actual si se indica
        if (excluirId) {
            contenido = contenido.filter(item => item.id != excluirId);
        }

        const contenedor = document.getElementById(containerBaseId);
        if (contenedor && contenido.length > 0) {
            const itemAleatorio = contenido[Math.floor(Math.random() * contenido.length)];
            const imagen = contenedor.querySelector('img');
            const sinopsis = contenedor.querySelector('.synopsis');
            const titulo = contenedor.querySelector('.titulo');

            contenedor.setAttribute('data_id', itemAleatorio.id);

            if (imagen) {
                imagen.src = itemAleatorio.portada;
                imagen.alt = itemAleatorio.titulo;
            }

            if (sinopsis) {
                sinopsis.textContent = itemAleatorio.sinopsis;
            }

            if (titulo) {
                titulo.textContent = itemAleatorio.titulo;
            }
        }
    } catch (e) {
        console.error('Error al cargar título:', e);
    }
}

function agregarAListaUsuario(nuevoId) {
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuario_logueado'));

    if (!usuarioLogueado) {
        console.error("No hay usuario logueado.");
        return;
    }

    if (!usuarioLogueado.lista_vistas.includes(nuevoId)) {
        usuarioLogueado.lista_vistas.push(nuevoId);
        localStorage.setItem('usuario_logueado', JSON.stringify(usuarioLogueado));
        console.log("Película agregada:", nuevoId);
    } else {
        console.log("La película ya está en la lista.");
    }
}

async function like() {
    const peliculaId = document.getElementById('card').getAttribute('data_id');
    agregarAListaUsuario(peliculaId);
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    console.log(usuarios?.lista_vistas);
}

async function initializePage() {
    loadDefaultTemplates();
    await cargarDescubrir('card');

    document.getElementById('like').addEventListener('click', async () => {
        const peliculaId = document.getElementById('card').getAttribute('data_id');
        await like();
        await cargarDescubrir('card', peliculaId);
    });

    document.querySelector('.dislike').addEventListener('click', async () => {
        const peliculaId = document.getElementById('card').getAttribute('data_id');
        await cargarDescubrir('card', peliculaId);
    });
}

window.onload = async () => initializePage();
