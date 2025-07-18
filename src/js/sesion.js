/**
 * sesion.js - Manejo dinámico de sesión y barra superior en cutsFrame
 *
 * Funcionalidad principal:
 * - Verifica si hay una sesión activa en localStorage.
 * - Renderiza dinámicamente la barra superior (topbar) y el panel lateral (offcanvas) según el estado de sesión.
 * - Si el usuario está logueado:
 *    - Muestra saludo, acceso a panel de usuario o admin y botón para cerrar sesión.
 * - Si el usuario NO está logueado:
 *    - Muestra formulario de login, enlace a recuperación de contraseña y botón de registro.
 *    - Conecta el formulario de login con la función de autenticación.
 * - Permite cerrar sesión y redirige al inicio.
 *
 * Notas:
 * - El contenido de la barra superior y el offcanvas se genera completamente por JS.
 * - El login y logout se gestionan usando localStorage.
 * - El archivo debe cargarse después de que existan los elementos #topbar y #offcanvas-body en el DOM.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Verifica si hay una sesión activa
    const sesion = JSON.parse(localStorage.getItem("sesion"));
    const topbar = document.getElementById("topbar");
    const offcanvasBody = document.getElementById("offcanvas-body");

    // Si no existen los elementos necesarios, termina la ejecución
    if (!topbar || !offcanvasBody) return;

    // Renderiza topbar de manera dinámica
    topbar.innerHTML = `
      <a class="navbar-brand d-flex align-items-center" href="/index.html">
        <img src="/src/img/logo2.png" width="30" height="30" alt="Logo" class="d-inline-block align-text-top">
        <span class="ms-2 fs-5">cutsFrame</span>
      </a>
      <button class="btn btn-light rounded-circle p-0 d-flex justify-content-center align-items-center" type="button" data-bs-toggle="offcanvas" data-bs-target="#loginOffcanvas" aria-controls="loginOffcanvas">
        <img src="/src/img/avatar.png" alt="avatar" width="30" height="30">
      </button>
    `;

    // Offcanvas dinámico
    if (sesion?.logueado) {
      // Si el usuario está logueado, muestra opciones de usuario
      offcanvasBody.innerHTML = `
        <p class="mb-3">Hola, <strong>${sesion.nombre || 'Usuario'}</strong></p>
        ${sesion.tipo === "admin"
          ? `<a href="/pages/panelAdmin.html" class="btn btn-dark w-100 mb-2">Panel Admin</a>`
          : `
            <a href="/pages/panelUsuario.html" class="btn btn-dark w-100 mb-2">Mi Perfil</a>
          `}
        <button id="cerrar-sesion" class="btn btn-outline-dark w-100">Cerrar sesión</button>
      `;
    } else {
      // Si el usuario NO está logueado, muestra el formulario de login y registro
      offcanvasBody.innerHTML = `
        <form id="login">
          <div class="mb-3">
              <label for="loginEmail" class="form-label">Correo electrónico</label>
              <input type="email" class="form-control" id="email" required>
          </div>
          <div class="mb-3">
              <label for="loginPassword" class="form-label">Contraseña</label>
              <div class="input-group">
                  <input type="password" class="form-control" id="password" required>
                  <button class="btn btn-outline-secondary" type="button" id="toggleLoginPassword">
                      <i class="bi bi-eye"></i>
                  </button>
              </div>
          </div>
          <div class="mb-3">
              <button type="submit" class="btn btn-dark w-100">Entrar</button>
          </div>
          <div class="mt-3 text-center">
              <a href="/pages/recuperarPass.html">Recuperar contraseña</a>
          </div>
        </form>
        <hr>
        <div>
            <a href="pages/registro.html" class="btn btn-dark w-100">Registrarse</a>
        </div>
        `;

        // Script para mostrar/ocultar contraseña en login
        setTimeout(() => {
          const toggle = document.getElementById('toggleLoginPassword');
          const pass = document.getElementById('password');
          if (toggle && pass) {
            toggle.addEventListener('click', function () {
              const type = pass.type === 'password' ? 'text' : 'password';
              pass.type = type;
              this.querySelector('i').classList.toggle('bi-eye');
              this.querySelector('i').classList.toggle('bi-eye-slash');
            });
          }
        }, 0);        

      // Conecta el formulario de login con la función de login
      const formLogin = document.getElementById("login");
        if (formLogin) {
        formLogin.addEventListener("submit", function (e) {
            e.preventDefault();
            // Obtiene los valores de los campos de login
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            // Si ambos campos están completos, intenta iniciar sesión
            if (email && password) {
            login(email, password);
            } else {
            alert("Completa todos los campos.");
            }
        });
        }
    }

    // Cerrar sesión
    const cerrarSesionBtn = document.getElementById("cerrar-sesion");
    if (cerrarSesionBtn) {
      cerrarSesionBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("sesion");
        window.location.replace("/index.html"); // Redirige al inicio
      });
    }
  });