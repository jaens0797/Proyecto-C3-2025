const inputNombreU = document.getElementById('txtNombre');
const inputCorreoU = document.getElementById('txtCorreo');
const selectRolU = document.getElementById('slcRol');
const inputPassU = document.getElementById('txtContrasenna');
const inputConfU = document.getElementById('txtConfirmacion');
const btnGuardarUsuario = document.getElementById('btnGuardarUsuario');

const camposUsuario = document.querySelectorAll('#formUsuario :required');

function limpiarErroresUsuario() {
  camposUsuario.forEach(campo => campo.classList.remove('inputError'));
}

function validarUsuario() {
  let valido = true;
  limpiarErroresUsuario();

  camposUsuario.forEach(campo => {
    if (campo.value.trim() === '') {
      valido = false;
      campo.classList.add('inputError');
    }
  });

  if (inputPassU.value !== inputConfU.value) {
    valido = false;
    inputPassU.classList.add('inputError');
    inputConfU.classList.add('inputError');

    Swal.fire({
      icon: 'error',
      title: 'Contraseñas no coinciden',
      text: 'La contraseña y la confirmación deben ser iguales'
    });
  }

  return valido;
}

async function guardarUsuario() {
  if (!validarUsuario()) {
    return;
  }

  const datos = {
    nombre: inputNombreU.value.trim(),
    correo: inputCorreoU.value.trim(),
    rol: selectRolU.value,
    contrasenna: inputPassU.value.trim()
  };

  try {
    const res = await fetch('http://localhost:3000/api/registrar-usuario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: data.msj || 'No se pudo guardar el usuario'
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Usuario guardado',
      text: 'El usuario se registró correctamente'
    });

    document.getElementById('formUsuario').reset();
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Error de conexión',
      text: 'No se pudo conectar con el servidor'
    });
  }
}

btnGuardarUsuario.addEventListener('click', guardarUsuario);
