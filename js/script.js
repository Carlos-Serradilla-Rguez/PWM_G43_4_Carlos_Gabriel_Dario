// Función para cargar un archivo HTML en un contenedor específico
function loadTemplate(templatePath, containerId) {
    fetch(templatePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
        })
        .catch(error => console.error('Error al cargar el template:', error));
}

// Función para cargar dinámicamente elementos con el template Pelicula_Sinopsis.html
async function cargarRecomendaciones(template, nombre_contenedor, nombre_clase, cantidad) {
    try {
        const response = await fetch(template);
        const templateHTML = await response.text();

        const contenedor = document.getElementById(nombre_contenedor);
        const elementoExistente = contenedor.lastElementChild;
        for (let i = 0; i < cantidad; i++) {
            const nuevoElemento = document.createElement('div');
            nuevoElemento.classList.add(nombre_contenedor, nombre_clase);
            nuevoElemento.id =`${nombre_clase}-${i+1}`;
            nuevoElemento.innerHTML = templateHTML;

            if(elementoExistente) {
                contenedor.insertBefore(nuevoElemento, elementoExistente);
            } else {
                contenedor.appendChild(nuevoElemento);
            }
        }
    } catch (error) {
        console.error('Error al cargar el template de recomendaciones:', error);
    }
}

// Función para cargar los templates comunes (header y footer)
function loadDefaultTemplates() {
    loadTemplate("/templates/Header.html", 'header-contenedor');
    loadTemplate("/templates/Footer.html", 'footer-contenedor'); // Cargar las recomendaciones si es necesario// Cargar las recomendaciones si es necesario

}

// Función para cargar el template del body para la página principal (index)
function loadBodyTemplateIndex() {
    loadTemplate("/templates/Buscador.html", 'buscador-contenedor');
    cargarRecomendaciones('/templates/Pelicula_Sinopsis.html', "contenedor-recomendaciones", 'elemento-recomendacion', 3); // Cargar las recomendaciones si es necesario
    cargarRecomendaciones('/templates/Pelicula_Sinopsis.html', "masvistos-contenedor", 'elemento-masvisto', 5); // Cargar las recomendaciones si es necesario
    loadTemplate('/templates/Blog.html', "mainblog-contenedor"); // Cargar las recomendaciones si es necesario
}

function loadBodyTemplatePeliculas() {
    loadTemplate("/templates/Buscador.html", 'buscador-contenedor');
    cargarRecomendaciones('/templates/Pelicula_Sinopsis.html', "contenedor-peliculas", 'elementos_peliculas', 20); // Cargar las recomendaciones si es necesario
    /*loadTemplate('../templates/Contenedor_filtro.html', 'template-ajustes');*/
    cargarRecomendaciones('/templates/Contenedor_filtro.html', "template-ajustes", 'contenedor-filtro', 1); // Cargar las recomendaciones si es necesario
    cargarRecomendaciones('/templates/Label.html', "contenedor-filtro-1", 'elemento-filtro', 5); // Cargar las recomendaciones si es necesario
}

function loadBodyTemplateBlog() {
    loadTemplate("../templates/Buscador.html", 'buscador-contenedor');
    cargarRecomendaciones('../templates/Blog.html', 'hilos-contenedor', 'elemento_blog', 5);
    cargarRecomendaciones('../templates/Contenedor_filtro.html', "template-filtros", 'contenedor-filtro', 1); // Cargar las recomendaciones si es necesario
    cargarRecomendaciones('../templates/Label.html', "contenedor-filtro-1", 'elemento-filtro', 5); // Cargar las recomendaciones si es necesario
    cargarRecomendaciones('../templates/NuevoHilo.html', "placeholder", 'CrearAdd', 1); // Cargar las recomendaciones si es necesario
}

function loadBodyTemplateUsuario() {
    loadTemplate('/templates/Imagen_Rotativa.html', 'Ruleta-Similares');
    loadTemplate('/templates/Imagen_Rotativa.html', 'Ruleta-Recomendaciones');

    const observer = new MutationObserver((mutations, obs) => {
        const similaresContainer = document.querySelector("#Ruleta-Similares .gallery");
        const recomendacionesContainer = document.querySelector("#Ruleta-Recomendaciones .gallery");

        if (similaresContainer && !similaresContainer.id) {
            similaresContainer.id = "gallery-similares";
            console.log("📌 Se encontró Ruleta-Similares, asignando ID y cargando recomendaciones.");
            cargarRecomendaciones('/templates/Pelicula_Sinopsis.html', 'gallery-similares', 'imagen-contenedor', 10);
        }

        if (recomendacionesContainer && !recomendacionesContainer.id) {
            recomendacionesContainer.id = "gallery-recomendaciones";
            console.log("📌 Se encontró Ruleta-Recomendaciones, asignando ID y cargando recomendaciones.");
            cargarRecomendaciones('/templates/Pelicula_Sinopsis.html', 'gallery-recomendaciones', 'imagen-contenedor', 10);
        }

        if (similaresContainer && recomendacionesContainer) {
            obs.disconnect(); // Se detiene la observación cuando ambas ruletas están listas
            console.log("✅ Ambas ruletas se han cargado correctamente.");
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}



// Inicialización de la página
async function initializePage() {
    loadDefaultTemplates(); // Siempre cargamos el header y footer

    // Cargamos un body distinto dependiendo de la página
    if (window.location.pathname.includes("index.html")) {
        loadBodyTemplateIndex(); // Para la página principal
        await cargarPeliculas('/json.json', 'elemento-recomendacion', 3);
        await cargarPeliculas('/json.json', 'elemento-masvisto', 5);
        await cargarHilo('/json.json', 'mainblog-contenedor', 1);
    } else if (window.location.pathname.includes("Union-PeliculasSeries.html")) {
        loadBodyTemplatePeliculas();
        await cargarPeliculas('/json.json', 'elementos_peliculas', 20);
    } else if (window.location.pathname.includes("Union-Blog.html")) {
        loadBodyTemplateBlog();
    } else if (window.location.pathname.includes("Union-Descubrir.html")) {
        //En este caso no tiene ninguna template que añadir salvo las del Default.
        await cargarDescubrir('/json.json', 'card');
    } else if (window.location.pathname.includes("Union-LogIn.html")) {
        loadTemplate("/templates/Login.html", "Contenedor-Login");
    } else if (window.location.pathname.includes("Union-Register.html")) {
        loadTemplate("/templates/Register.html", "Contenedor-Login");
    } else if (window.location.pathname.includes("Union-Usuario.html")) {
        loadBodyTemplateUsuario();
    } else if (window.location.pathname.includes("Union-DescriptorPeliculas.html")) {
        loadBodyTemplateUsuario();
    }
    // Agrega más condiciones aquí si tienes otras páginas
}

/*
Función para añadir elementos al html con el JSON.
 */

// Función para cargar los datos de las películas en la plantilla
// Función para cargar películas o series aleatoriamente
async function cargarPeliculas(jsonPath, containerBaseId, cantidad = 2) {
    try {
        const response = await fetch(jsonPath);
        const data = await response.json();

        // Crear un array con las películas y las series combinadas
        const contenido = [...data.peliculas, ...data.series];  // Unimos películas y series en un solo array

        // Recorremos la cantidad de contenedores que queremos actualizar
        for (let i = 1; i <= cantidad; i++) {
            const contenedor = document.getElementById(`${containerBaseId}-${i}`);

            if (contenedor) {
                // Selección aleatoria de una película o serie
                const itemAleatorio = contenido[Math.floor(Math.random() * contenido.length)];

                // Actualizamos el contenido del contenedor con los datos seleccionados
                const imagen = contenedor.querySelector('img');
                const sinopsis = contenedor.querySelector('.synopsis');

                if (imagen) {
                    imagen.src = itemAleatorio.portada; // Cambia la imagen
                    imagen.alt = itemAleatorio.titulo;  // Cambia el alt con el título
                }

                if (sinopsis) {
                    sinopsis.textContent = itemAleatorio.sinopsis; // Actualiza la sinopsis
                }
            } else {
                console.warn(`No se encontró el contenedor con ID: ${containerBaseId}-${i}`);
            }
        }
    } catch (error) {
        console.error('Error al cargar contenido aleatorio:', error);
    }
}

async function cargarDescubrir(jsonPath, containerBaseId) {
    try {
        const response = await fetch(jsonPath);
        const data = await response.json();
        const contenido = [...data.peliculas, ...data.series];
        const contenedor = document.getElementById(containerBaseId);
        console.log(contenedor);
        if (contenedor) {
            const itemAleatorio = contenido[Math.floor(Math.random()*contenido.length)];
            const imagen = contenedor.querySelector('img');
            const sinopsis = contenedor.querySelector('.synopsis');
            const titulo = contenedor.querySelector('.titulo');

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

async function cargarHilo(jsonPath, containerBaseId, cantidad) {
    try {
        const response = await fetch(jsonPath);
        const data = await response.json();
        if (cantidad > 1) {
            for (let i = 1; i <= cantidad; i++) {

            }
        } else {
            let contenedor = document.getElementById(containerBaseId);
            const respuestas = data.foro;
            const itemAleatorio = respuestas[Math.floor(Math.random() * respuestas.length)];
            const title = contenedor.querySelector('#text-1');
            const contenido = contenedor.querySelector('#text-2');
            if (contenido) {
                title.textContent = itemAleatorio.titulo;
                contenido.textContent = itemAleatorio.contenido;
            }
        }
    } catch (error) {
        console.error('Error al cargar contenido aleatorio: ', error);
    }
}



//import {cargarPeliculas} from "./js/add_datos.js";
// Llamar a la función de inicialización cuando la página esté completamente cargada
window.onload = async function () {
    initializePage(); // Cargar header, footer y body específico según la página
};
