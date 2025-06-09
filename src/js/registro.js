/**
 * registro.js
 * Script para gestionar el registro de nuevos usuarios en la aplicación.
 * 
 * Funcionalidad:
 * - Valida los datos del formulario de registro usando funciones externas.
 * - Verifica que el email no esté registrado previamente.
 * - Guarda el nuevo usuario en localStorage.
 * - Inicia sesión automáticamente tras el registro exitoso.
 * - Redirige al usuario a la página principal mostrando un mensaje de éxito.
 * 
 * Notas:
 * - Utiliza clases de Bootstrap para mostrar validaciones visuales.
 * - Requiere que los IDs de los inputs coincidan con los usados en el script.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Obtenemos el formulario de inscripción por su ID
  const formulario = document.getElementById("registro");

  // Solo ejecutamos la lógica si el formulario existe en la página actual
  if (formulario) {
    // Escuchamos el evento submit del formulario
    formulario.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevenimos el envío tradicional del formulario

      // Validamos el formulario usando funciones definidas externamente
      if (validarFormulario()) {
        // Si todo es válido, obtenemos los valores del formulario
        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const nomUsuario = document.getElementById("usuario").value.trim();
        const email = document.getElementById("email").value.trim();
        const fechaNacimiento = document.getElementById("fechaNacimiento").value;
        const password = document.getElementById("password").value;

        // Recuperamos el arreglo de usuarios del localStorage, o creamos uno nuevo si está vacío
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Verificamos si ya hay un usuario registrado con el mismo correo
        const existe = usuarios.some(u => u.email === email);

        if (existe) {
          // Si ya existe un usuario con ese correo, alertamos y no registramos
          alert("Ya existe una cuenta con ese correo.");
          return;
        }

        // Creamos un objeto con los datos del nuevo usuario
        const nuevoUsuario = {
            nombre,
            apellido,
            nomUsuario,
            email,
            fechaNacimiento,
            password,
            tipo: "normal" // Todos los usuarios registrados desde aquí son tipo normal
        };

        // Agregamos el nuevo usuario al array
        usuarios.push(nuevoUsuario);

        // Guardamos el array actualizado en el localStorage
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        // INICIO DE SESIÓN AUTOMÁTICO:
        localStorage.setItem("sesion", JSON.stringify({
          nombre,
          apellido,
          nomUsuario,
          email,
          fechaNacimiento,
          tipo: "normal",
          logueado: true
        }));

        // Avisamos al usuario y lo redirigimos al inicio
        alert("¡Usuario registrado con éxito!");
        formulario.reset(); // Limpiamos el formulario
        window.location.href = "/index.html"; // Redirigimos al inicio
      }
    });
  }
});


// Mostrar/ocultar contraseña principal y confirmación
document.addEventListener("DOMContentLoaded", () => {
  // Botón para contraseña principal
  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('password');
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', function () {
      const type = passwordInput.type === 'password' ? 'text' : 'password';
      passwordInput.type = type;
      this.querySelector('i').classList.toggle('bi-eye');
      this.querySelector('i').classList.toggle('bi-eye-slash');
    });
  }

  // Botón para confirmar contraseña (opcional)
  // Si quieres agregar el botón, agrega en el HTML un botón con id="toggleConfirmPassword" junto al input de confirmarPassword
  const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
  const confirmPasswordInput = document.getElementById('confirmarPassword');
  if (toggleConfirmPassword && confirmPasswordInput) {
    toggleConfirmPassword.addEventListener('click', function () {
      const type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
      confirmPasswordInput.type = type;
      this.querySelector('i').classList.toggle('bi-eye');
      this.querySelector('i').classList.toggle('bi-eye-slash');
    });
  }
});