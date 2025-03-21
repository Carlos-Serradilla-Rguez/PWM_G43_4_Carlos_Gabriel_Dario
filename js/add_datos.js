export async function cargarPeliculas(jsonPath, containerBaseId, cantidad = 2) {
    try {
        const response = await fetch(jsonPath);
        const data = await response.json();
        const peliculas = data.peliculas; // Accedemos a la sección de películas

        for (let i = 1; i <= cantidad; i++) {
            const contenedor = document.getElementById(`${containerBaseId}-${i}`);
            if (contenedor) {
                const pelicula = peliculas[i % peliculas.length]; // Selección cíclica de películas
                contenedor.innerHTML = `
                    <h3>${pelicula.titulo} (${pelicula.año})</h3>
                    <img src="${pelicula.portada}" alt="${pelicula.titulo}">
                    <p><strong>Género:</strong> ${pelicula.genero.join(', ')}</p>
                    <p>${pelicula.sinopsis}</p>
                `;
            } else {
                console.warn(`No se encontró el contenedor con ID: ${containerBaseId}-${i}`);
            }
        }
    } catch (error) {
        console.error('Error al cargar las películas:', error);
    }
}
