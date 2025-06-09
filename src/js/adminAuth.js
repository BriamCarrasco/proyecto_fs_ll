/**
 * adminAuth.js
 * Script para restringir el acceso a páginas exclusivas del administrador.
 * 
 * Funcionalidad:
 * - Verifica si hay una sesión activa y si el usuario es de tipo "admin".
 * - Si no es administrador o no hay sesión, muestra un mensaje y redirige al inicio.
 * 
 * Notas:
 * - Debe incluirse en todas las páginas que requieran acceso exclusivo de administrador.
 * - Utiliza localStorage para obtener la información de la sesión.
 */

document.addEventListener("DOMContentLoaded", () => {
  const sesion = JSON.parse(localStorage.getItem("sesion"));
  if (!sesion || !sesion.logueado || sesion.tipo !== "admin") {
    alert("Acceso restringido: debes iniciar sesión como administrador para ver esta página.");
    window.location.href = "/index.html";
  }
});