/**
 * cambiarPass.js - Lógica para cambiar la contraseña de un usuario registrado en cutsFrame
 *
 * Funcionalidad:
 * - Solo permite el cambio de contraseña si el usuario está logueado.
 * - Permite mostrar/ocultar los campos de contraseña.
 * - Valida que la contraseña actual coincida con la del usuario en sesión.
 * - Valida que la nueva contraseña cumpla requisitos mínimos.
 * - Valida que la confirmación coincida con la nueva contraseña.
 * - Actualiza la contraseña en localStorage (solo frontend).
 */

document.addEventListener("DOMContentLoaded", () => {
    // Verifica si hay sesión activa
    const sesion = JSON.parse(localStorage.getItem("sesion"));
    if (!sesion?.logueado) {
        window.location.href = "/index.html";
        return;
    }

    const actualPass = document.getElementById('actualPassword');
    const toggleActual = document.getElementById('toggleActualPassword');
    const nuevaPass = document.getElementById('nuevaPassword');
    const toggleNueva = document.getElementById('toggleNuevaPassword');
    const confirmarPass = document.getElementById('confirmarPassword');
    const toggleConfirmar = document.getElementById('toggleConfirmarPassword');
    const form = document.getElementById('cambiarPassForm');

    // Mostrar/ocultar contraseña actual
    toggleActual.addEventListener('click', function () {
        const type = actualPass.type === 'password' ? 'text' : 'password';
        actualPass.type = type;
        this.querySelector('i').classList.toggle('bi-eye');
        this.querySelector('i').classList.toggle('bi-eye-slash');
    });

    // Mostrar/ocultar nueva contraseña
    toggleNueva.addEventListener('click', function () {
        const type = nuevaPass.type === 'password' ? 'text' : 'password';
        nuevaPass.type = type;
        this.querySelector('i').classList.toggle('bi-eye');
        this.querySelector('i').classList.toggle('bi-eye-slash');
    });

    // Mostrar/ocultar confirmar contraseña
    toggleConfirmar.addEventListener('click', function () {
        const type = confirmarPass.type === 'password' ? 'text' : 'password';
        confirmarPass.type = type;
        this.querySelector('i').classList.toggle('bi-eye');
        this.querySelector('i').classList.toggle('bi-eye-slash');
    });

    // Validación y cambio real de contraseña en localStorage
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let valido = true;

        // Obtener usuarios y usuario actual
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuarioActual = usuarios.find(u => u.email === sesion.email);

        // Validar contraseña actual
        if (!actualPass.value.trim() || actualPass.value !== usuarioActual.password) {
            actualPass.classList.add('is-invalid');
            valido = false;
        } else {
            actualPass.classList.remove('is-invalid');
        }

        // Validar nueva contraseña
        const passValue = nuevaPass.value;
        const passRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passRegex.test(passValue)) {
            nuevaPass.classList.add('is-invalid');
            valido = false;
        } else {
            nuevaPass.classList.remove('is-invalid');
        }

        // Validar confirmación
        if (nuevaPass.value !== confirmarPass.value || !confirmarPass.value) {
            confirmarPass.classList.add('is-invalid');
            valido = false;
        } else {
            confirmarPass.classList.remove('is-invalid');
        }

        if (valido) {
            // Actualiza la contraseña en el array de usuarios
            usuarioActual.password = nuevaPass.value;
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            // Limpia el formulario y muestra mensaje de éxito
            this.querySelector('button[type="submit"]').disabled = true;
            this.querySelector('button[type="submit"]').innerText = "Cambiando...";

            setTimeout(() => {
                this.querySelector('button[type="submit"]').disabled = false;
                this.querySelector('button[type="submit"]').innerText = "Cambiar contraseña";
                this.reset();

                const msg = document.createElement("div");
                msg.className = "alert alert-success mt-3";
                msg.innerText = "¡Contraseña cambiada exitosamente!";
                this.parentNode.insertBefore(msg, this.nextSibling);
            }, 1500);
        }
    });
});