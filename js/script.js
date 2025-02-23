async function loadTemplate(templateUrl, containerId, stylesheetUrl) {
    try {
        // 1. Cargar el archivo del template
        const response = await fetch(templateUrl); // Ruta al template
        if (!response.ok) throw new Error("No se pudo cargar el template: " + response.statusText);

        // 2. Obtener el contenido del template
        const content = await response.text();

        // 3. Insertar el contenido en el contenedor
        document.getElementById(containerId).innerHTML = content;

        // 4. Cargar el archivo CSS específico para el template
        if (stylesheetUrl) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = stylesheetUrl; // Ruta al archivo de estilos del template
            document.head.appendChild(link); // Agregar el <link> al <head>
        }

        console.log(`${templateUrl} cargado correctamente.`);
    } catch (error) {
        console.error(`Hubo un problema al cargar el template ${templateUrl}:`, error);
    }
}

// Ejecutar cuando se cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
    // Cargar múltiples templates
    loadTemplate('header.html', 'header-container', '../styles/header.css');
    loadTemplate('footer.html', 'footer-container', '../styles/footer.css');
    loadTemplate('blog.html', 'blog-container', '../styles/blog.css');
});
