import {cargarRecomendaciones, loadDefaultTemplates, loadTemplate, cargarHilo} from "./script.js";

function agregarEventListenerElementos(nombreContenedor, totalElementos) {
    for (let i = 1; i <= totalElementos; i++) {
        const elemento = document.getElementById(`${nombreContenedor}-${i}`);

        if (elemento) {
            elemento.addEventListener('click', async e => {
                e.preventDefault();
                const idBlog = elemento.getAttribute('data-id');
                window.location.href = '../Paginas/Union-Blog.html?idBlog=' + idBlog;
            });
        }
    }
}

async function cargarHiloConId(idBlog, containerBaseId) {
    try {
        const response = await fetch('../json/foro.json');
        const data = await response.json();

        console.log(data);
        console.log(idBlog);
        console.log(data[0].id)

        const foro = data.find(f => f.id === parseInt(idBlog)); // Buscar el foro con el ID
        if (!foro) {
            console.error('No se encontró el foro con el ID proporcionado.');
            return;
        }

        const comentarios = foro.comentarios; // Acceder a los comentarios del foro
        let contenedor;
        let comentario;
        let title;
        let contenido;

        // Iterar solo hasta el número de comentarios disponibles
        for (let i = 0; i < comentarios.length; i++) {
            contenedor = document.getElementById(`${containerBaseId}-${i + 1}`);
            if (!contenedor) {
                console.log(`No se encontró el contenedor con id ${containerBaseId}-${i + 1}`);
                break; // Detener la ejecución si no se encuentra el contenedor
            }

            comentario = comentarios[i];

            // Obtener los elementos para mostrar el comentario
            title = contenedor.querySelector('#text-1');
            contenido = contenedor.querySelector('#text-2');

            if (title && contenido) {
                title.textContent = comentario.usuario; // Mostrar el nombre del usuario
                contenido.textContent = comentario.comentario; // Mostrar el comentario
                contenedor.setAttribute('data-id', comentario.id_comentario); // Establecer el data-id del contenedor
            }
        }
    } catch (error) {
        console.error('Error al cargar contenido: ', error);
    }
}

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
    loadTemplate("../templates/Buscador.html", 'buscador-contenedor');
    await cargarRecomendaciones('../templates/Contenedor_filtro.html', "template-filtros", 'contenedor-filtro', 1);
    await cargarRecomendaciones('../templates/Label.html', "contenedor-filtro-1", 'elemento-filtro', 5);
    await cargarRecomendaciones('../templates/NuevoHilo.html', "placeholder", 'CrearAdd', 1);
    addEventListenerBotonesPagina();

    const urlParams = new URLSearchParams(window.location.search);
    const idBlog = urlParams.get('idBlog'); // Cambiado 'idPelicula' a 'idBlog'

    if (idBlog) {
        await cargarRecomendaciones('../templates/Blog.html', 'hilos-contenedor', 'elemento_blog', 5);
        await cargarHiloConId(idBlog, 'elemento_blog');
    } else {
        await cargarRecomendaciones('../templates/Blog.html', 'hilos-contenedor', 'elemento_blog', 5);
        await cargarHilo('elemento_blog', 5);
        agregarEventListenerElementos('elemento_blog', 5); // Se pasan los parámetros correctos aquí
    }
}

window.onload = async () => initializePage();

