import {cargarRecomendaciones, loadDefaultTemplates, loadTemplate, cargarHilo} from "./script.js";


async function initializePage() {
    loadDefaultTemplates();
    loadTemplate("../templates/Buscador.html", 'buscador-contenedor');
    await cargarRecomendaciones('../templates/Blog.html', 'hilos-contenedor', 'elemento_blog', 5);
    await cargarRecomendaciones('../templates/Contenedor_filtro.html', "template-filtros", 'contenedor-filtro', 1); // Cargar las recomendaciones si es necesario
    await cargarRecomendaciones('../templates/Label.html', "contenedor-filtro-1", 'elemento-filtro', 5); // Cargar las recomendaciones si es necesario
    await cargarRecomendaciones('../templates/NuevoHilo.html', "placeholder", 'CrearAdd', 1); // Cargar las recomendaciones si es necesario
    await cargarHilo('elemento_blog', 5);
}

window.onload = async () => initializePage();