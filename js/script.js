async function loadHeader() {
    try {
        // 1. Cargar el archivo HTML (header.html)
        const response = await fetch('header.html'); // Ajusta la ruta si es necesario
        if (!response.ok) throw new Error("No se pudo cargar el header: " + response.statusText);

        // 2. Obtener el contenido del header
        const content = await response.text();

        // 3. Insertar el contenido en el contenedor
        document.getElementById("header-container").innerHTML = content;

        // 4. Cargar el archivo CSS específico para el header
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '../styles/header.css'; // Ruta al archivo de estilos del header
        document.head.appendChild(link); // Agregar el <link> al <head>

        console.log("Header cargado correctamente.");
    } catch (error) {
        console.error('Hubo un problema al cargar el header:', error);
    }
}

// Ejecutar cuando se cargue el DOM
document.addEventListener("DOMContentLoaded", loadHeader);
