// Front-end/js/registrar-comunidad.js

const API_URL = "http://localhost:3000/api";

// Obtener elementos del formulario
const inputNombreCom      = document.getElementById('txtNombreComunidad');
const inputPuebloCom      = document.getElementById('txtPuebloComunidad');
const inputProvinciaCom   = document.getElementById('txtProvinciaComunidad');
const inputCantonCom      = document.getElementById('txtCantonComunidad');
const inputDistritoCom    = document.getElementById('txtDistritoComunidad');
const selectEstadoLengua  = document.getElementById('sltEstadoLengua');
const txtDescripcionCom   = document.getElementById('txtDescripcionComunidad');
const btnGuardarComunidad = document.getElementById('btnGuardarComunidad');

// Quitar clases de error
function limpiarErroresComunidad() {
  const campos = document.querySelectorAll('.inputError');
  campos.forEach(c => c.classList.remove('inputError'));
}

// Validaciones del formulario
function validarComunidad() {
  let error = false;
  limpiarErroresComunidad();

  if (!inputNombreCom.value.trim()) {
    inputNombreCom.classList.add('inputError');
    error = true;
  }

  if (!inputPuebloCom.value.trim()) {
    inputPuebloCom.classList.add('inputError');
    error = true;
  }

  if (!inputProvinciaCom.value.trim()) {
    inputProvinciaCom.classList.add('inputError');
    error = true;
  }

  if (!inputCantonCom.value.trim()) {
    inputCantonCom.classList.add('inputError');
    error = true;
  }

  if (!inputDistritoCom.value.trim()) {
    inputDistritoCom.classList.add('inputError');
    error = true;
  }

  if (!selectEstadoLengua.value.trim()) {
    selectEstadoLengua.classList.add('inputError');
    error = true;
  }

  if (error) {
    Swal.fire({
      icon: 'warning',
      title: 'Datos incompletos',
      text: 'Revisá los campos marcados en rojo.'
    });
  }

  return !error;
}

// Enviar datos al backend
async function guardarComunidad() {
  console.log("Guardar comunidad: clic en el botón");

  if (!validarComunidad()) {
    console.log("Validación fallida, no se envía al servidor");
    return;
  }

  const datosComunidad = {
    nombre:       inputNombreCom.value.trim(),
    pueblo:       inputPuebloCom.value.trim(),
    provincia:    inputProvinciaCom.value.trim(),
    canton:       inputCantonCom.value.trim(),
    distrito:     inputDistritoCom.value.trim(),
    estadoLengua: selectEstadoLengua.value.trim(),
    descripcion:  txtDescripcionCom.value.trim()
  };

  console.log("Enviando datos al servidor:", datosComunidad);

  try {
    const res = await fetch(`${API_URL}/registrar-comunidad`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosComunidad)
    });

    const data = await res.json();
    console.log("Respuesta del servidor:", data);

    // Aceptamos tanto el formato viejo ({ msj }) como el nuevo ({ ok:true, msj })
    const hayError = !res.ok || data.error || (data.ok === false);

    if (hayError) {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: data.error || data.msj || 'No se pudo registrar la comunidad.'
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Comunidad registrada',
        text: data.msj || 'La comunidad se guardó correctamente.'
      });
      document.getElementById('formComunidad').reset();
    }

  } catch (err) {
    console.error("Error de red o JS:", err);
    Swal.fire({
      icon: 'error',
      title: 'Error de conexión',
      text: 'No se pudo conectar con el servidor.'
    });
  }
}

// Evento del botón
if (btnGuardarComunidad) {
  btnGuardarComunidad.addEventListener('click', guardarComunidad);
} else {
  console.error("No se encontró el botón #btnGuardarComunidad en el DOM");
}