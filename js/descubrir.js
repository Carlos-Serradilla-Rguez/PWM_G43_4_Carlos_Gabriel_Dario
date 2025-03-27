import {loadDefaultTemplates, loadTemplate,} from "./script.js";

async function cargarDescubrir(containerBaseId) {
    try {
        let response = await fetch('/json/peliculas.json');
        const peliculas = await response.json();
        response = await fetch('/json/series.json');
        const series = await response.json();
        const contenido = [...peliculas, ...series];
        const contenedor = document.getElementById(containerBaseId);
        console.log(contenedor);
        if (contenedor) {
            const itemAleatorio = contenido[Math.floor(Math.random()*contenido.length)];
            const imagen = contenedor.querySelector('img');
            const sinopsis = contenedor.querySelector('.synopsis');
            const titulo = contenedor.querySelector('.titulo');

            contenedor.setAttribute('data_id', itemAleatorio.id)

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
        console.error('Error al cargar titulo:', e);
    }
}

function agregarAListaUsuario(nuevoId) {
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuario_logueado'));  // Obtener el usuario logueado

    if (!usuarioLogueado) {
        console.error("No hay usuario logueado.");
        return;
    }

    // Ahora puedes acceder a 'usuarioLogueado.lista_vistas' y agregar la película
    if (!usuarioLogueado.lista_vistas.includes(nuevoId)) {
        usuarioLogueado.lista_vistas.push(nuevoId);
        // Guardar de nuevo los datos de la sesión actualizada en localStorage
        localStorage.setItem('usuario_logueado', JSON.stringify(usuarioLogueado));
        console.log("Película agregada:", nuevoId);
    } else {
        console.log("La película ya está en la lista.");
    }
}



async function like() {
    const peliculaId = document.getElementById('card').getAttribute('data_id');
    agregarAListaUsuario(peliculaId);

    let usuarios = JSON.parse(localStorage.getItem("usuarios")); // Suponiendo que tienes el array en localStorage
    console.log(usuarios.lista_vistas);
}


async function initializePage() {
    loadDefaultTemplates();
    await cargarDescubrir('card');
    document.getElementById('like').addEventListener('click', async () => {
        await like();

        await cargarDescubrir('card')
    })
}

window.onload = async () => initializePage();