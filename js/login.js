import { loadDefaultTemplates, loadTemplate } from './script.js';

function guardarSesion(usuarioEncontrado) {
    localStorage.setItem('usuario_logueado', JSON.stringify({
        id: usuarioEncontrado.id,
        nombre: usuarioEncontrado.nombre,
        email: usuarioEncontrado.email,
        lista_vistas: usuarioEncontrado.lista_vistas,
    }));
}

function buscarUsuario(email, clave, lista) {
    return lista.find(u => u.email.toLowerCase() === email.toLowerCase() && u.clave === clave);
}

async function chequeoCredenciales() {
    const form = document.getElementById('login-form');

    if (!form) {
        console.error("Formulario no encontrado.");
        return;
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('usuario').value.trim();
        const clave = document.getElementById('clave').value;

        // 1. Buscar en localStorage
        const cuentasGuardadas = localStorage.getItem('cuentas');
        const cuentasLocal = cuentasGuardadas ? JSON.parse(cuentasGuardadas) : [];
        let usuarioEncontrado = buscarUsuario(email, clave, cuentasLocal);

        // 2. Si no está en localStorage, buscar en cuentas.json
        if (!usuarioEncontrado) {
            try {
                const response = await fetch('/json/cuentas.json');
                if (!response.ok) throw new Error(`Error al cargar JSON: ${response.status}`);
                const cuentasJson = await response.json();
                usuarioEncontrado = buscarUsuario(email, clave, cuentasJson);
            } catch (err) {
                console.error("Error cargando cuentas.json:", err);
                alert("No se pudo acceder a la base de datos.");
                return;
            }
        }

        // 3. Si se encontró en alguna fuente
        if (usuarioEncontrado) {
            guardarSesion(usuarioEncontrado);
            window.location.href = "../Paginas/Union-Usuario.html";
        } else {
            alert("Correo o contraseña incorrectos.");
        }
    });
}

function chequeoLocalStorage() {
    return !!localStorage.getItem('usuario_logueado');
}

async function initializePage() {
    if (chequeoLocalStorage()) {
        window.location.href = "../Paginas/Union-Usuario.html";
    } else {
        loadDefaultTemplates();
        await loadTemplate('/templates/Login.html', 'Contenedor-Login');
        setTimeout(chequeoCredenciales, 500);
    }
}

window.onload = async () => initializePage();
