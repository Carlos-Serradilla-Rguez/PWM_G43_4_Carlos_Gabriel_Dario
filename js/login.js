import { loadDefaultTemplates, loadTemplate } from './script.js';

function guardarSesion(usuarioEncontrado) {
    localStorage.setItem('usuario_logueado', JSON.stringify({
        id: usuarioEncontrado.id,
        nombre: usuarioEncontrado.nombre,
        email: usuarioEncontrado.email,
        lista_vistas: usuarioEncontrado.lista_vistas,
    }));
}

async function chequeoCredenciales() {
    const form = document.getElementById('login-form');

    if (!form) {
        console.error("Formulario no encontrado.");
        return;
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const usuario = document.getElementById('usuario').value.trim();
        const clave = document.getElementById('clave').value;

        try {
            const response = await fetch('/json/cuentas.json');

            if (!response.ok) {
                throw new Error(`Error al cargar JSON: ${response.status}`);
            }

            const data = await response.json();
            const usuarioEncontrado = data.find(u => u.email === usuario && u.clave === clave);

            if (usuarioEncontrado) {
                guardarSesion(usuarioEncontrado);
                window.location.href = "Union-Usuario.html";
            } else {
                alert("Correo o contraseña incorrectos.");
            }

        } catch (err) {
            console.error("Error cargando json.json:", err);
            alert("No se pudo acceder a la base de datos.");
        }
    });
}

async function initializePage() {
    loadDefaultTemplates();
    await loadTemplate('/templates/Login.html', 'Contenedor-Login');
    setTimeout(chequeoCredenciales, 500);
}

window.onload = async () => initializePage();
