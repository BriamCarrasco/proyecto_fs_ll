/**
 * validate.js
 * Funciones de validación para formularios de registro y edición de usuario.
 * Utiliza clases de Bootstrap para mostrar visualmente los errores o éxitos.
 * 
 * Incluye:
 * - Validación general del formulario
 * - Validación de campos vacíos
 * - Validación de email
 * - Validación de contraseña segura y coincidencia
 */

/**
 * Función general que valida todo el formulario de registro.
 * Retorna true si todas las validaciones son correctas, false si alguna falla.
 */
function validarFormulario() {
  let esValido = true; // Acumula el resultado de todas las validaciones

  // Usamos &= para combinar booleanos (AND). Si alguna da false, esValido será false
  esValido &= validarCampoVacio("nombre"); // Verifica que el campo "nombre" no esté vacío
  esValido &= validarCampoVacio("apellido"); // Verifica que el campo "apellido" no esté vacío
  esValido &= validarCampoVacio("usuario"); // Verifica que el campo "usuario" no esté vacío
  esValido &= validarEmail("email"); // Verifica que el campo "email" tenga un formato válido
  esValido &= validarCampoVacio("fechaNacimiento"); // Solo valida que no esté vacío
  esValido &= validarPassword("password", "confirmarPassword"); // Verifica la seguridad y coincidencia de la contraseña

  return Boolean(esValido); // Se fuerza a boolean para evitar resultados tipo 0 o 1
}

/**
 * Valida que un campo no esté vacío.
 * @param {string} idCampo - ID del input a validar.
 * @returns {boolean} true si el campo tiene valor, false si está vacío.
 */
function validarCampoVacio(idCampo) {
  const campo = document.getElementById(idCampo); // Se obtiene el input por su ID

  if (campo.value.trim() === "") { // Se elimina espacios y se verifica si está vacío
    campo.classList.add("is-invalid"); // Clase Bootstrap para indicar error
    return false;
  } else {
    campo.classList.remove("is-invalid");
    campo.classList.add("is-valid"); // Clase Bootstrap para marcar éxito
    return true;
  }
}

/**
 * Valida que un email tenga el formato correcto.
 * @param {string} idCampo - ID del input de email.
 * @returns {boolean} true si el email es válido, false si no.
 */
function validarEmail(idCampo) {
  const campo = document.getElementById(idCampo);
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular básica de email

  if (!regexEmail.test(campo.value.trim())) {
    campo.classList.add("is-invalid");
    return false;
  } else {
    campo.classList.remove("is-invalid");
    campo.classList.add("is-valid");
    return true;
  }
}

/**
 * Valida que la contraseña sea segura y coincida con la confirmación.
 * Seguridad: mínimo 8 caracteres, al menos una mayúscula, un número y un símbolo especial.
 * @param {string} idPassword - ID del input de contraseña.
 * @param {string} idConfirmar - ID del input de confirmación de contraseña.
 * @returns {boolean} true si ambas contraseñas son seguras y coinciden, false si no.
 */
function validarPassword(idPassword, idConfirmar) {
  const pass = document.getElementById(idPassword); // Contraseña principal
  const confirm = document.getElementById(idConfirmar); // Confirmación

  // Expresión regular para verificar seguridad:
  // - mínimo 8 caracteres
  // - al menos una mayúscula
  // - al menos un número
  // - símbolo especial
  const regexSegura = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

let valido = true; // Variable para acumular el resultado de las validaciones

// Validación de seguridad de la contraseña principal
if (!regexSegura.test(pass.value)) {
  // Si la contraseña no cumple los requisitos de seguridad, se marca como inválida
  pass.classList.add("is-invalid");
  valido = false;
} else {
  // Si la contraseña es segura, se marca como válida
  pass.classList.remove("is-invalid");
  pass.classList.add("is-valid");
}

// Validación de coincidencia entre contraseña y confirmación
if (pass.value !== confirm.value || confirm.value === "") {
  // Si las contraseñas no coinciden o la confirmación está vacía, se marca como inválida
  confirm.classList.add("is-invalid");
  valido = false;
} else {
  // Si las contraseñas coinciden, se marca como válida
  confirm.classList.remove("is-invalid");
  confirm.classList.add("is-valid");
}

return valido; // Retorna true solo si ambas validaciones son correctas
}