/**
 * adminUsuarios.js
 * Script para la administración de usuarios desde el panel de administración.
 * 
 * Funcionalidad:
 * - Muestra una tabla con todos los usuarios registrados en la aplicación.
 * - Permite editar y eliminar usuarios (excepto el usuario administrador).
 * - Los cambios se reflejan en localStorage y la tabla se recarga automáticamente.
 * 
 * Notas:
 * - El usuario administrador (tipo "admin") no puede ser editado ni eliminado.
 * - Requiere que exista una tabla con id="tablaUsuarios" en el HTML.
 * - Utiliza clases de Bootstrap y los iconos de Bootstrap Icons.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Selecciona el cuerpo de la tabla de usuarios
  const tbody = document.querySelector("#tablaUsuarios tbody");
  if (!tbody) return;

  // Cargar usuarios desde localStorage
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Limpia la tabla antes de cargar los usuarios
  tbody.innerHTML = "";

  // Recorre cada usuario y genera una fila en la tabla
  usuarios.forEach((u, idx) => {
    const esAdmin = (u.tipo && u.tipo.toLowerCase() === "admin");
    // Botón editar: deshabilitado para admin
    const btnEditar = esAdmin
      ? `<button class="btn btn-sm btn-warning btn-editar" data-idx="${idx}" disabled title="No se puede editar admin"><i class="bi bi-pencil"></i></button>`
      : `<button class="btn btn-sm btn-warning btn-editar" data-idx="${idx}"><i class="bi bi-pencil"></i></button>`;
    // Botón eliminar: deshabilitado para admin
    const btnEliminar = esAdmin
      ? `<button class="btn btn-sm btn-danger btn-eliminar" data-idx="${idx}" disabled title="No se puede eliminar admin"><i class="bi bi-trash"></i></button>`
      : `<button class="btn btn-sm btn-danger btn-eliminar" data-idx="${idx}"><i class="bi bi-trash"></i></button>`;

    // Crea la fila y la agrega al tbody
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${u.nombre}</td>
      <td>${u.apellido}</td>
      <td>${u.nomUsuario || u.usuario || ""}</td>
      <td>${u.email}</td>
      <td>${u.fechaNacimiento || ""}</td>
      <td>${u.tipo || "normal"}</td>
      <td>
        ${btnEditar}
        ${btnEliminar}
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Evento para eliminar usuario (excepto admin)
  tbody.querySelectorAll('.btn-eliminar:not([disabled])').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = this.getAttribute('data-idx');
      if (confirm("¿Seguro que deseas eliminar este usuario?")) {
        usuarios.splice(idx, 1);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        location.reload();
      }
    });
  });

  // Evento para editar usuario (excepto admin)
  tbody.querySelectorAll('.btn-editar:not([disabled])').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = this.getAttribute('data-idx');
      const usuario = usuarios[idx];

      // Solicita los nuevos valores para cada campo
      const nuevoNombre = prompt("Editar nombre:", usuario.nombre || "");
      if (nuevoNombre === null) return;
      const nuevoApellido = prompt("Editar apellido:", usuario.apellido || "");
      if (nuevoApellido === null) return;
      const nuevoUsuario = prompt("Editar nombre de usuario:", usuario.nomUsuario || usuario.usuario || "");
      if (nuevoUsuario === null) return;
      const nuevoEmail = prompt("Editar email:", usuario.email || "");
      if (nuevoEmail === null) return;
      const nuevaFecha = prompt("Editar fecha de nacimiento:", usuario.fechaNacimiento || "");
      if (nuevaFecha === null) return;
      const nuevoTipo = prompt("Editar tipo (normal/admin):", usuario.tipo || "normal");
      if (nuevoTipo === null) return;

      // Actualiza los datos del usuario
      usuario.nombre = nuevoNombre.trim();
      usuario.apellido = nuevoApellido.trim();
      if (usuario.nomUsuario !== undefined) {
        usuario.nomUsuario = nuevoUsuario.trim();
      } else {
        usuario.usuario = nuevoUsuario.trim();
      }
      usuario.email = nuevoEmail.trim();
      usuario.fechaNacimiento = nuevaFecha.trim();
      usuario.tipo = nuevoTipo.trim().toLowerCase();

      // Guarda los cambios y recarga la tabla
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      location.reload();
    });
  });
});