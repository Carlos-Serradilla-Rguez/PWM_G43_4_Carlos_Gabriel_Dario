async function xLuIncludeFile() {
    console.log("Ejecutando xLuIncludeFile...");

    const elements = document.querySelectorAll("[xlu-include-file]");

    for (const el of elements) {
        const file = el.getAttribute("xlu-include-file");

        try {
            console.log(`Intentando cargar archivo: ${file}`);
            const response = await fetch(file);

            if (!response.ok) {
                console.error(`Error al cargar ${file}: ${response.status} ${response.statusText}`);
                continue;
            }

            const content = await response.text();
            el.innerHTML = content;
            el.removeAttribute("xlu-include-file");
            console.log(`Contenido cargado correctamente en: ${file}`);

        } catch (error) {
            console.error(`Error al obtener ${file}:`, error);
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded: Intentando ejecutar xLuIncludeFile...");
    if (typeof xLuIncludeFile === "function") {
        xLuIncludeFile().then(() => {
            console.log("Todos los archivos han sido cargados.");
        }).catch(error => {
            console.error("Error en la ejecución de xLuIncludeFile:", error);
        });
    } else {
        console.error("Error: La función xLuIncludeFile no está definida.");
    }
});
