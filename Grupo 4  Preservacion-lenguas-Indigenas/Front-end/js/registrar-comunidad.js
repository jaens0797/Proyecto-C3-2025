const inputNombreCom = document.getElementById('txtNombreCom');
const inputPuebloCom = document.getElementById('txtPuebloCom');
const inputProvinciaCom = document.getElementById('txtProvinciaCom');
const inputCantonCom = document.getElementById('txtCantonCom');
const inputDistritoCom = document.getElementById('txtDistritoCom');
const inputEstadoLenguaCom = document.getElementById('txtEstadoLenguaCom');
const inputDescripcionCom = document.getElementById('txtDescripcionCom');
const btnGuardarComunidad = document.getElementById('btnGuardarComunidad');

const camposComunidad = document.querySelectorAll('#formComunidad :required');

function limpiarErroresComunidad() {
  camposComunidad.forEach(campo => campo.classList.remove('inputError'));
}

function validarComunidad() {
  let valido = true;
  limpiarErroresComunidad();

  camposComunidad.forEach(campo => {
    if (campo.value.trim() === '') {
      valido = false;
      campo.classList.add('inputError');
    }
  });

  if (!valido) {
    Swal.fire({
      icon: 'error',
      title: 'Datos incompletos',
      text: 'Por favor complete todos los campos obligatorios'
    });
  }

  return valido;
}

async function guardarComunidad() {
  if (!validarComunidad()) return;

  const datos = {
    nombre: inputNombreCom.value.trim(),
    pueblo: inputPuebloCom.value.trim(),
    provincia: inputProvinciaCom.value.trim(),
    canton: inputCantonCom.value.trim(),
    distrito: inputDistritoCom.value.trim(),
    estadoLengua: inputEstadoLenguaCom.value.trim(),
    descripcion: inputDescripcionCom.value.trim()
  };

  try {
    const res = await fetch('http://localhost:3000/api/registrar-comunidad', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: data.msj || 'No se pudo guardar la comunidad'
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Comunidad guardada',
      text: 'La comunidad se registró correctamente'
    });

    document.getElementById('formComunidad').reset();
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Error de conexión',
      text: 'No se pudo conectar con el servidor'
    });
  }
}

btnGuardarComunidad.addEventListener('click', guardarComunidad);
