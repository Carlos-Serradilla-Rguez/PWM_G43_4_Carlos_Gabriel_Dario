import { loadDefaultTemplates, loadTemplate } from './script.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registro-form');
    const mensaje = document.getElementById('mensaje');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const clave = document.getElementById('clave').value;

        const nuevaCuenta = {
            id: Date.now(),
            nombre,
            email,
            clave,
            lista_vistas: []
        };

        try {
            const response = await fetch('../json/cuentas.json');
            const cuentas = await response.json();

            const existe = cuentas.some(c => c.email === email);
            if (existe) {
                mensaje.textContent = "Este correo ya está registrado.";
                mensaje.style.color = "red";
                return;
            }

            cuentas.push(nuevaCuenta);
            localStorage.setItem("cuentas", JSON.stringify(cuentas));
            localStorage.setItem("usuarioActual", JSON.stringify(nuevaCuenta));

            window.location.href = "Union-Usuario.html";
        } catch (error) {
            console.error("Error al registrar:", error);
            mensaje.textContent = "Error al registrar la cuenta.";
            mensaje.style.color = "red";
        }
    });
});
