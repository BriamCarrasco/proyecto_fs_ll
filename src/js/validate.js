// ✅ Función general que valida todo el formulario
function validarFormulario() {
  let esValido = true; // Esta variable acumulará si todas las validaciones son correctas

  // Usamos &= para combinar booleanos (AND). Si alguna da false, esValido será false
  esValido &= validarCampoVacio("nombre"); // Verifica que el campo "nombre" no esté vacío
  esValido &= validarCampoVacio("apellido"); // Verifica que el campo "apellido" no esté vacío
  esValido &= validarCampoVacio("usuario"); // Verifica que el campo "usuario" no esté vacío
  esValido &= validarEmail("email"); // Verifica que el campo "email" tenga un formato válido
  esValido &= validarFechaNacimiento("fechaNacimiento"); // Verifica que el usuario tenga al menos 13 años
  esValido &= validarPassword("password", "confirmarPassword"); // Verifica la seguridad y coincidencia de la contraseña

  return Boolean(esValido); // Se fuerza a boolean para evitar resultados tipo 0 o 1
}


// ✅ Valida que un campo no esté vacío
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

// ✅ Valida que un email tenga el formato correcto
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


// ✅ Valida que el usuario tenga al menos 13 años
function validarFechaNacimiento(idCampo) {
  const campo = document.getElementById(idCampo);

  if (campo.value.trim() === "") {
    campo.classList.add("is-invalid");
    return false;
  } else {
    campo.classList.remove("is-invalid");
    campo.classList.add("is-valid");
    return true;
  }
}


// ✅ Valida contraseña segura y coincidencia con su confirmación
function validarPassword(idPassword, idConfirmar) {
  const pass = document.getElementById(idPassword); // Contraseña principal
  const confirm = document.getElementById(idConfirmar); // Confirmación

  // Expresión regular para verificar seguridad:
  // - mínimo 8 caracteres
  // - al menos una mayúscula
  // - al menos un número
  const regexSegura = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  let valido = true;

  if (!regexSegura.test(pass.value)) {
    pass.classList.add("is-invalid");
    valido = false;
  } else {
    pass.classList.remove("is-invalid");
    pass.classList.add("is-valid");
  }

  if (pass.value !== confirm.value || confirm.value === "") {
    confirm.classList.add("is-invalid");
    valido = false;
  } else {
    confirm.classList.remove("is-invalid");
    confirm.classList.add("is-valid");
  }

  return valido;
}
