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
async function cargarRecomendaciones(template, nombre_contenedor, cantidad) {
    try {
        const response = await fetch(template);
        const templateHTML = await response.text();

        const contenedor = document.getElementById(nombre_contenedor);
        for (let i = 0; i < cantidad; i++) {
            const nuevoElemento = document.createElement('div');
            nuevoElemento.classList.add(nombre_contenedor);
            nuevoElemento.innerHTML = templateHTML;

            contenedor.appendChild(nuevoElemento);
        }
    } catch (error) {
        console.error('Error al cargar el template de recomendaciones:', error);
    }
}

// Función para cargar los templates comunes (header y footer)
function loadDefaultTemplates() {
    loadTemplate("../templates/Header.html", 'header-contenedor');
    loadTemplate("../templates/Footer.html", 'footer-contenedor'); // Cargar las recomendaciones si es necesario// Cargar las recomendaciones si es necesario

}

// Función para cargar el template del body para la página principal (index)
function loadBodyTemplateIndex() {
    loadTemplate("../templates/Buscador.html", 'buscador-contenedor');
    cargarRecomendaciones('../templates/Pelicula_Sinopsis.html', "contenedor-recomendaciones", 3); // Cargar las recomendaciones si es necesario
}

function loadBodyTemplatePeliculas() {
    loadTemplate("../templates/Buscador.html", 'buscador-contenedor');
    cargarRecomendaciones('../templates/Pelicula_Sinopsis.html', "contenedor-peliculas", 20); // Cargar las recomendaciones si es necesario

}

// Inicialización de la página
function initializePage() {
    loadDefaultTemplates(); // Siempre cargamos el header y footer

    // Cargamos un body distinto dependiendo de la página
    if (window.location.pathname.includes("index.html")) {
        loadBodyTemplateIndex(); // Para la página principal
    } else if (window.location.pathname.includes("Union-PeliculasSeries.html")) {
        loadBodyTemplatePeliculas();
    }
    // Agrega más condiciones aquí si tienes otras páginas
}



// Llamar a la función de inicialización cuando la página esté completamente cargada
window.onload = function() {
    initializePage(); // Cargar header, footer y body específico según la página
};
