document.addEventListener("DOMContentLoaded", () => {
  const sesion = JSON.parse(localStorage.getItem("sesion"));
  if (!sesion || !sesion.logueado || sesion.tipo !== "admin") {
    alert("Acceso restringido: debes iniciar sesión como administrador para ver esta página.");
    window.location.href = "/index.html";
  }
});