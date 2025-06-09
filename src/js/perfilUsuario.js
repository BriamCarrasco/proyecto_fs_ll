/**
 * perfilUsuario.js
 * Script para mostrar y editar la información del perfil del usuario.
 * 
 * Funcionalidad:
 * - Muestra los datos del usuario logueado en la vista de perfil.
 * - Permite editar cada campo individualmente (nombre, apellido, email, fecha de nacimiento).
 * - Al guardar, actualiza solo ese campo en localStorage y muestra un mensaje de éxito.
 * - Mantiene el estilo visual con Bootstrap y animaciones.
 * 
 * Notas:
 * - Requiere que los IDs de los elementos HTML coincidan con los usados aquí.
 * - Si no hay sesión activa, muestra un mensaje de advertencia.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Obtiene la sesión actual desde localStorage
    const sesion = JSON.parse(localStorage.getItem("sesion"));
    if (!sesion || !sesion.logueado) {
        document.querySelector("main").innerHTML = `<div class="alert alert-warning text-center mt-5">Debes iniciar sesión para ver tu perfil.</div>`;
        return;
    }

    // Renderiza los datos actuales del usuario en los campos correspondientes
    document.getElementById("perfil-nombre").textContent = sesion.nombre || "";
    document.getElementById("perfil-apellido").textContent = sesion.apellido || "";
    document.getElementById("perfil-email").textContent = sesion.email || "";
    document.getElementById("perfil-fecha").textContent = sesion.fechaNacimiento || "";

    /**
     * Permite editar un campo del perfil.
     * @param {string} idCampo - ID del span que muestra el dato.
     * @param {string} keySesion - Clave del dato en el objeto sesión.
     * @param {string} tipo - Tipo de input (por defecto "text", puede ser "date" para fechas).
     */
    function editarCampo(idCampo, keySesion, tipo = "text") {
        const span = document.getElementById(idCampo);
        const btn = document.getElementById("btn-edit-" + idCampo.split('-')[1]);
        if (!span || !btn) return;

        // Cambia el botón a modo edición y reemplaza el texto por un input
        btn.textContent = "Guardar";
        btn.classList.remove("btn-outline-primary");
        btn.classList.add("btn-success");
        const valorActual = span.textContent;
        span.innerHTML = `<input type="${tipo}" class="form-control form-control-sm d-inline w-auto" id="input-${idCampo}" value="${valorActual}">`;
        const input = document.getElementById("input-" + idCampo);

        input.focus();

        // Al hacer clic en guardar, actualiza el valor y la sesión
        btn.onclick = () => {
            const nuevoValor = input.value.trim();
            if (nuevoValor === "") return;
            span.textContent = nuevoValor;
            sesion[keySesion] = nuevoValor;
            localStorage.setItem("sesion", JSON.stringify(sesion));
            mostrarMensaje("¡Dato actualizado correctamente!");
            // Restaura el botón a modo "Editar"
            btn.textContent = "Editar";
            btn.classList.remove("btn-success");
            btn.classList.add("btn-outline-primary");
            btn.onclick = () => editarCampo(idCampo, keySesion, tipo);
        };
    }

    // Asigna la función de edición a cada botón correspondiente
    document.getElementById("btn-edit-nombre").onclick = () => editarCampo("perfil-nombre", "nombre");
    document.getElementById("btn-edit-apellido").onclick = () => editarCampo("perfil-apellido", "apellido");
    document.getElementById("btn-edit-email").onclick = () => editarCampo("perfil-email", "email");
    document.getElementById("btn-edit-fecha").onclick = () => editarCampo("perfil-fecha", "fechaNacimiento", "date");

    /**
     * Muestra un mensaje de éxito temporal debajo del perfil.
     * @param {string} msg - Mensaje a mostrar.
     */
    function mostrarMensaje(msg) {
        const div = document.getElementById("perfil-mensaje");
        div.innerHTML = `<div class="alert alert-success mt-3 animate__animated animate__fadeIn">${msg}</div>`;
        setTimeout(() => div.innerHTML = "", 2000);
    }
});