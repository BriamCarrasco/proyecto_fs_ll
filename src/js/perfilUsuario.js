/**
 * Permite editar cada campo del perfil individualmente.
 * Al guardar, actualiza solo ese campo en localStorage y muestra un mensaje de éxito.
 */

document.addEventListener("DOMContentLoaded", () => {
    const sesion = JSON.parse(localStorage.getItem("sesion"));
    if (!sesion || !sesion.logueado) {
        document.querySelector("main").innerHTML = `<div class="alert alert-warning text-center mt-5">Debes iniciar sesión para ver tu perfil.</div>`;
        return;
    }

    // Renderizar datos
    document.getElementById("perfil-nombre").textContent = sesion.nombre || "";
    document.getElementById("perfil-apellido").textContent = sesion.apellido || "";
    document.getElementById("perfil-email").textContent = sesion.email || "";
    document.getElementById("perfil-fecha").textContent = sesion.fechaNacimiento || "";

    // Utilidad para editar un campo
    function editarCampo(idCampo, keySesion, tipo = "text") {
        const span = document.getElementById(idCampo);
        const btn = document.getElementById("btn-edit-" + idCampo.split('-')[1]);
        if (!span || !btn) return;

        // Cambia a modo edición
        btn.textContent = "Guardar";
        btn.classList.remove("btn-outline-primary");
        btn.classList.add("btn-success");
        const valorActual = span.textContent;
        span.innerHTML = `<input type="${tipo}" class="form-control form-control-sm d-inline w-auto" id="input-${idCampo}" value="${valorActual}">`;
        const input = document.getElementById("input-" + idCampo);

        input.focus();

        // Al guardar
        btn.onclick = () => {
            const nuevoValor = input.value.trim();
            if (nuevoValor === "") return;
            span.textContent = nuevoValor;
            sesion[keySesion] = nuevoValor;
            localStorage.setItem("sesion", JSON.stringify(sesion));
            mostrarMensaje("¡Dato actualizado correctamente!");
            // Restaurar botón
            btn.textContent = "Editar";
            btn.classList.remove("btn-success");
            btn.classList.add("btn-outline-primary");
            btn.onclick = () => editarCampo(idCampo, keySesion, tipo);
        };
    }

    // Asignar eventos a cada botón
    document.getElementById("btn-edit-nombre").onclick = () => editarCampo("perfil-nombre", "nombre");
    document.getElementById("btn-edit-apellido").onclick = () => editarCampo("perfil-apellido", "apellido");
    document.getElementById("btn-edit-email").onclick = () => editarCampo("perfil-email", "email");
    document.getElementById("btn-edit-fecha").onclick = () => editarCampo("perfil-fecha", "fechaNacimiento", "date");

    // Mensaje de éxito
    function mostrarMensaje(msg) {
        const div = document.getElementById("perfil-mensaje");
        div.innerHTML = `<div class="alert alert-success mt-3 animate__animated animate__fadeIn">${msg}</div>`;
        setTimeout(() => div.innerHTML = "", 2000);
    }
});