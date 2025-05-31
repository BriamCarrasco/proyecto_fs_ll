document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login");

  if (!loginForm) return;

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (email === "aa@aa.a" && password === "1234") {
      alert("Inicio de sesión exitoso");

      const modalElement = document.getElementById("loginModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  });
});
