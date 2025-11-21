const inputTituloRec = document.getElementById('txtTituloRec');
const selectTipoRec = document.getElementById('slcTipoRec');
const inputPuebloRec = document.getElementById('txtPuebloRec');
const inputComunidadRec = document.getElementById('txtComunidadRec');
const inputUrlRec = document.getElementById('txtUrlRec');
const inputNarradorRec = document.getElementById('txtNarradorRec');
const chkEsAncianoRec = document.getElementById('chkEsAncianoRec');
const chkValidadoRec = document.getElementById('chkValidadoRec');
const inputDescripcionRec = document.getElementById('txtDescripcionRec');
const btnGuardarRecurso = document.getElementById('btnGuardarRecurso');

const camposRecurso = document.querySelectorAll('#formRecurso :required');

function limpiarErroresRecurso() {
  camposRecurso.forEach(campo => campo.classList.remove('inputError'));
}

function validarRecurso() {
  let valido = true;
  limpiarErroresRecurso();

  camposRecurso.forEach(campo => {
    if (campo.value.trim() === '') {
      valido = false;
      campo.classList.add('inputError');
    }
  });

  if (!valido) {
    Swal.fire({
      icon: 'error',
      title: 'Datos incompletos',
      text: 'Complete los campos obligatorios'
    });
  }

  return valido;
}

async function guardarRecurso() {
  if (!validarRecurso()) return;

  const datos = {
    titulo: inputTituloRec.value.trim(),
    tipoRecurso: selectTipoRec.value,
    pueblo: inputPuebloRec.value.trim(),
    comunidad: inputComunidadRec.value.trim(),
    descripcion: inputDescripcionRec.value.trim(),
    url: inputUrlRec.value.trim(),
    narrador: inputNarradorRec.value.trim(),
    esAnciano: chkEsAncianoRec.checked,
    validadoCulturalmente: chkValidadoRec.checked
  };

  try {
    const res = await fetch('http://localhost:3000/api/registrar-recurso', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: data.msj || 'No se pudo guardar el recurso'
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Recurso guardado',
      text: 'El recurso se registró correctamente'
    });

    document.getElementById('formRecurso').reset();
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Error de conexión',
      text: 'No se pudo conectar con el servidor'
    });
  }
}

btnGuardarRecurso.addEventListener('click', guardarRecurso);
