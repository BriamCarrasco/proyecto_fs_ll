/**
 * login.js
 * Script para gestionar el inicio de sesión y la creación automática del usuario administrador.
 * 
 * Funcionalidad:
 * - Al cargar cualquier página, verifica si el usuario admin existe y lo crea si no.
 * - Permite iniciar sesión con email y contraseña.
 * - Guarda la sesión activa en localStorage con los datos clave del usuario.
 * - Redirige al usuario a la página principal o a una URL guardada previamente.
 * - Muestra mensajes de error si los datos son incorrectos o faltan campos.
 * 
 * Notas:
 * - Utiliza clases de Bootstrap para mostrar validaciones visuales (en formularios).
 * - Requiere que los IDs de los inputs coincidan con los usados en el script.
 */

// Al cargar la página, verifica si el usuario admin ya existe y lo crea si no
document.addEventListener("DOMContentLoaded", () => {
  // Recupera la lista de usuarios desde localStorage (si no hay, usa un array vacío)
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verifica si ya existe un usuario con el correo del administrador
  const existeAdmin = usuarios.some(user => user.email === "admin@cutsframe.cl");

  // Si no existe, se crea un usuario administrador por defecto
  if (!existeAdmin) {
    const admin = {
      nombre: "Administrador",          // Nombre del admin
      usuario: "admin",                // Nombre de usuario
      email: "admin@cutsframe.cl",     // Correo
      password: "Admin123",            // Contraseña por defecto
      tipo: "admin"                    // Tipo de usuario (admin)
    };

    // Se agrega al array de usuarios y se guarda en localStorage
    usuarios.push(admin);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Mensaje en consola para informar que se ha creado el usuario admin
    console.log("🛠 Usuario admin creado por defecto.");
  }
});

/**
 * Función para iniciar sesión con email y contraseña.
 * Si los datos son correctos, guarda la sesión y redirige al usuario.
 * Si no, muestra un mensaje de error.
 * @param {string} email - Email ingresado por el usuario.
 * @param {string} password - Contraseña ingresada por el usuario.
 */
function login(email, password) {
  // Obtiene los usuarios registrados
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Busca un usuario que coincida con el correo y contraseña ingresados
  const usuario = usuarios.find(u => u.email === email && u.password === password);

  // Si lo encuentra...
  if (usuario) {
    // Se guarda en localStorage que la sesión está activa y los datos clave del usuario
    localStorage.setItem("sesion", JSON.stringify({
      nombre: usuario.nombre, // nombre 
      apellido: usuario.apellido, // apellido 
      nomUsuario: usuario.nomUsuario, // nombre de usuario (no email)
      email: usuario.email, // email del usuario
      fechaNacimiento: usuario.fechaNacimiento, // fecha de nacimiento
      tipo: usuario.tipo, // tipo de usuario (normal o admin)
      logueado: true,
    }));

    // Redirección después del login: si se guardó una URL de destino previa, se usa
    const destino = localStorage.getItem("redirigirDespues") || "index.html";
    localStorage.removeItem("redirigirDespues"); // Limpiar dato residual
    window.location.href = destino; // Redireccionar a página deseada
  } else {
    // Si no coincide correo y contraseña, alerta al usuario
    alert("Correo o contraseña incorrectos.");
  }
}

// Conecta el formulario de login con la función de login
document.addEventListener("DOMContentLoaded", () => {
  // Selecciona el formulario de login, si existe en la página actual
  const formLogin = document.getElementById("login");

  if (formLogin) {
    // Agrega un evento cuando el formulario se envía
    formLogin.addEventListener("submit", function (e) {
      e.preventDefault(); // Previene el comportamiento por defecto (enviar y recargar)

      // Obtiene los valores de los campos email y password
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      // Si ambos están completos, intenta iniciar sesión
      if (email && password) {
        login(email, password);
      } else {
        // Si falta algún campo, muestra advertencia
        alert("Completa todos los campos.");
      }
    });
  }
});