import {
    cargarRecomendaciones,
    loadDefaultTemplates,
    loadTemplate,
    moverElementosFiltro
} from "./script.js";

// Agrega los listeners a los elementos de hilo para navegar a su vista de comentarios
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

// Cargar los comentarios de un hilo específico por ID
async function cargarHiloConId(idBlog, containerBaseId) {
    try {
        const response = await fetch('../json/foro.json');
        let data = await response.json();

        const extra = JSON.parse(localStorage.getItem('foro_extra')) || [];
        data = data.concat(extra);

        const foro = data.find(f => f.id === parseInt(idBlog));
        if (!foro) {
            console.error('No se encontró el foro con el ID proporcionado.');
            return;
        }

        const comentarios = foro.comentarios;
        let contenedor, comentario, title, contenido;

        for (let i = 0; i < comentarios.length; i++) {
            contenedor = document.getElementById(`${containerBaseId}-${i + 1}`);
            if (!contenedor) {
                console.log(`No se encontró el contenedor con id ${containerBaseId}-${i + 1}`);
                break;
            }

            comentario = comentarios[i];
            title = contenedor.querySelector('#text-1');
            contenido = contenedor.querySelector('#text-2');

            if (title && contenido) {
                title.textContent = comentario.usuario;
                contenido.textContent = comentario.comentario;
                contenedor.setAttribute('data-id', comentario.id_comentario);
            }
        }
    } catch (error) {
        console.error('Error al cargar contenido: ', error);
    }
}

// Cargar todos los hilos (base + nuevos)
export async function cargarHilo(containerBaseId, cantidad) {
    try {
        const response = await fetch('../json/foro.json');
        let base = await response.json();

        const extra = JSON.parse(localStorage.getItem('foro_extra')) || [];

        const data = base.concat(extra);

        const contenedorPadre = document.getElementById('hilos-contenedor');
        contenedorPadre.innerHTML = '';

        data.forEach((foro, index) => {
            if (index >= cantidad) return;

            const hilo = document.createElement('div');
            hilo.className = 'elemento-Hilo';
            hilo.id = `${containerBaseId}-${index + 1}`;
            hilo.setAttribute('data-id', foro.id);

            hilo.innerHTML = `
              <div class="centrado">${foro.titulo}</div>
              <div class="centrado">${foro.contenido}</div>
              <div class="centrado">Ver comentarios</div>
            `;

            contenedorPadre.appendChild(hilo);
        });

        agregarEventListenerElementos(containerBaseId, Math.min(data.length, cantidad));
    } catch (error) {
        console.error("Error al cargar hilos:", error);
    }
}

// Botón para crear nuevo hilo
function configurarFormularioNuevoHilo() {
    const botonCrear = document.querySelector('#Confirmacion button');
    if (!botonCrear) return;

    botonCrear.addEventListener('click', () => {
        const titulo = document.getElementById('Nombre').value.trim();
        const contenido = document.getElementById('Descripcion-hilo').value.trim();

        if (!titulo || !contenido) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        let foro = JSON.parse(localStorage.getItem('foro_extra')) || [];

        const nuevoHilo = {
            id: Date.now(),
            titulo: titulo,
            contenido: contenido,
            comentarios: []
        };

        foro.push(nuevoHilo);
        localStorage.setItem('foro_extra', JSON.stringify(foro));

        window.location.href = '../Paginas/Union-Blog.html';
    });
}

// Botón para añadir comentario al hilo actual
function configurarFormularioComentario(idBlog) {
    const boton = document.querySelector('#Confirmacion button');
    if (!boton) return;

    boton.addEventListener('click', () => {
        const texto = document.getElementById('Comentario-hilo').value.trim();
        if (!texto) {
            alert("El comentario no puede estar vacío.");
            return;
        }

        const extra = JSON.parse(localStorage.getItem('foro_extra')) || [];
        const response = fetch('../json/foro.json');
        response.then(res => res.json()).then(base => {
            let data = base.concat(extra);
            const foro = data.find(f => f.id === parseInt(idBlog));
            if (!foro) {
                alert("No se encontró el hilo para comentar.");
                return;
            }

            const nuevoComentario = {
                id_comentario: Date.now(),
                usuario: "Usuario Anónimo",
                comentario: texto,
                fecha: new Date().toISOString().split('T')[0]
            };

            foro.comentarios.push(nuevoComentario);

            // Solo guardar los hilos que son parte de foro_extra
            const nuevosExtra = data.filter(f => extra.some(e => e.id === f.id));
            localStorage.setItem('foro_extra', JSON.stringify(nuevosExtra));

            location.reload();
        });
    });
}

// Recargar al hacer clic en botones de paginación
function addEventListenerBotonesPagina() {
    const botones = document.querySelectorAll('.boton');
    botones.forEach(boton => {
        boton.addEventListener('click', () => location.reload());
    });
}

// Inicialización de la página
async function initializePage() {
    loadDefaultTemplates();
    loadTemplate("../templates/Buscador.html", 'buscador-contenedor');
    await cargarRecomendaciones('../templates/Contenedor_filtro.html', "template-filtros", 'contenedor-filtro', 1);
    await cargarRecomendaciones('../templates/Label.html', "contenedor-filtro-1", 'elemento-filtro', 5);
    moverElementosFiltro();
    addEventListenerBotonesPagina();

    const urlParams = new URLSearchParams(window.location.search);
    const idBlog = urlParams.get('idBlog');

    if (idBlog) {
        await cargarRecomendaciones('../templates/Comentario.html', "placeholder", 'CrearComentario', 1);
        await cargarRecomendaciones('../templates/Blog.html', 'hilos-contenedor', 'elemento_blog', 5);
        await cargarHiloConId(idBlog, 'elemento_blog');
        setTimeout(() => configurarFormularioComentario(idBlog), 300);
    } else {
        await cargarRecomendaciones('../templates/NuevoHilo.html', "placeholder", 'CrearAdd', 1);
        await cargarRecomendaciones('../templates/Blog.html', 'hilos-contenedor', 'elemento_blog', 5);
        await cargarHilo('elemento_blog', 5);
        setTimeout(configurarFormularioNuevoHilo, 300);
        agregarEventListenerElementos('elemento_blog', 5);
    }
}

window.onload = async () => initializePage();
