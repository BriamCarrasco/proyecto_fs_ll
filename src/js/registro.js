// Esperamos a que todo el DOM esté cargado antes de ejecutar el código
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

        // Avisamos al usuario y lo redirigimos al login
        alert("¡Usuario registrado con éxito!");
        formulario.reset(); // Limpiamos el formulario
        window.location.href = "/index.html"; // Redirigimos al login
      }
    });
  }
});
