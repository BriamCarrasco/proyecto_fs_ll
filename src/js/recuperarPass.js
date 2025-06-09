/**
 * recuperarPass.js - Lógica para la recuperación de contraseña en cutsFrame
 *
 * Funcionalidad:
 * - Valida el campo de email en el formulario de recuperación.
 * - Simula el envío de instrucciones de recuperación al correo ingresado.
 * - Muestra un mensaje de éxito si el email es válido.
 * - El mensaje permanece visible hasta que el usuario recargue o navegue.
 *
 * Notas:
 * - El envío es simulado, no se conecta a un backend real.
 * - El botón muestra un estado de "Enviando..." durante la simulación.
 * - El mensaje de error aparece si el email no es válido.
 */

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("recuperarPass");
    const emailInput = document.getElementById("email");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Validación simple de email
        if (!emailInput.value || !emailInput.checkValidity()) {
            emailInput.classList.add("is-invalid");
            return;
        } else {
            emailInput.classList.remove("is-invalid");
        }

        // Simulación de envío (puedes reemplazar por lógica real)
        form.querySelector("button[type='submit']").disabled = true;
        form.querySelector("button[type='submit']").innerText = "Enviando...";

        setTimeout(() => {
            form.querySelector("button[type='submit']").disabled = false;
            form.querySelector("button[type='submit']").innerText = "Enviar instrucciones";
            form.reset();

            // Mensaje de éxito
            const msg = document.createElement("div");
            msg.className = "alert alert-success mt-3";
            msg.innerText = "Si el correo existe, recibirás instrucciones para recuperar tu contraseña.";
            form.parentNode.insertBefore(msg, form.nextSibling);

            // El mensaje permanece visible hasta recargar o navegar
        }, 1500);
    });
});