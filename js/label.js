// Cargar templates con una mejor ruta
async function loadTemplate(templateName, targetElementId) {
    try {
        const response = await fetch(`../templates/${templateName}.html`); // Ruta corregida
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(targetElementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading template ${templateName}:`, error);
    }
}

// Cargar solo el template de Contenedor_filtro
async function loadLabel() {
    await loadTemplate('Label', 'contenedor_ajustes');
}

// Ejecutar cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", loadLabel);
