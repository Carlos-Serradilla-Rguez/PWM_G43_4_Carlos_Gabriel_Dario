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
function initializePage() {
    loadDefaultTemplates(); // Siempre cargamos el header y footer

    // Cargamos un body distinto dependiendo de la página
    if (window.location.pathname.includes("index.html")) {
        loadBodyTemplateIndex(); // Para la página principal
    } else if (window.location.pathname.includes("Union-PeliculasSeries.html")) {
        loadBodyTemplatePeliculas();
    } else if (window.location.pathname.includes("Union-Blog.html")) {
        loadBodyTemplateBlog();
    } else if (window.location.pathname.includes("Union-Descubrir.html")) {
        //En este caso no tiene ninguna template que añadir salvo las del Default.
    } else if (window.location.pathname.includes("Union-LogIn.html")) {
        loadTemplate("/templates/Login.html", "Contenedor-Login");
    } else if (window.location.pathname.includes("Union-Register.html")) {
        loadTemplate("/templates/Register.html", "Contenedor-Login");
    } else if (window.location.pathname.includes("Union-Usuario.html")) {
        loadBodyTemplateUsuario();
    } else if(window.location.pathname.includes("Union-DescriptorPeliculas.html")) {
        loadBodyTemplateUsuario();
    }
    // Agrega más condiciones aquí si tienes otras páginas
}



// Llamar a la función de inicialización cuando la página esté completamente cargada
window.onload = function() {
    initializePage(); // Cargar header, footer y body específico según la página
};
