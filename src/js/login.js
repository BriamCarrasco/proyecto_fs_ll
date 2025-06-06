//Al cargar cualquier página, verifica si el usuario admin ya existe y lo crea si no
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


// Función para iniciar sesión con email y contraseña
function login(email, password) {
  // Obtiene los usuarios registrados
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Busca un usuario que coincida con el correo y contraseña ingresados
  const usuario = usuarios.find(u => u.email === email && u.password === password);

  // Si lo encuentra...
  if (usuario) {
    // Se guarda en localStorage que la sesión está activa y los datos clave del usuario
    localStorage.setItem("sesion", JSON.stringify({
      logueado: true,
      usuario: usuario.usuario, // nombre de usuario (no email)
      tipo: usuario.tipo        // tipo (normal o admin)
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
