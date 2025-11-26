const inputTituloRecurso = document.getElementById('txtTituloRecurso');
const selectTipoRecurso = document.getElementById('sltTipoRecurso');
const inputPuebloRecurso = document.getElementById('txtPuebloRecurso');
const inputComunidadRecurso = document.getElementById('txtComunidadRecurso');
const inputUrlRecurso = document.getElementById('txtUrlRecurso');
const inputNarradorRecurso = document.getElementById('txtNarradorRecurso');
const chkEsAnciano = document.getElementById('chkEsAnciano');
const chkValidado = document.getElementById('chkValidado');
const txtDescripcionRecurso = document.getElementById('txtDescripcionRecurso');
const btnGuardarRecurso = document.getElementById('btnGuardarRecurso');

function limpiarErroresRecurso() {
  const campos = document.querySelectorAll('.inputError');
  campos.forEach(c => c.classList.remove('inputError'));
}

function validarRecurso() {
  let error = false;
  limpiarErroresRecurso();

  if (!inputTituloRecurso.value.trim()) {
    inputTituloRecurso.classList.add('inputError');
    error = true;
  }

  if (!selectTipoRecurso.value.trim()) {
    selectTipoRecurso.classList.add('inputError');
    error = true;
  }

  if (!inputPuebloRecurso.value.trim()) {
    inputPuebloRecurso.classList.add('inputError');
    error = true;
  }

  if (!inputUrlRecurso.value.trim()) {
    inputUrlRecurso.classList.add('inputError');
    error = true;
  }

  if (error) {
    alert('Revisá los campos marcados en rojo (título, tipo, pueblo y URL son obligatorios).');
  }

  return !error;
}

async function guardarRecurso() {
  if (!validarRecurso()) {
    return;
  }

  const datosRecurso = {
    titulo: inputTituloRecurso.value.trim(),
    tipoRecurso: selectTipoRecurso.value.trim(),
    pueblo: inputPuebloRecurso.value.trim(),
    comunidad: inputComunidadRecurso.value.trim(),
    descripcion: txtDescripcionRecurso.value.trim(),
    url: inputUrlRecurso.value.trim(),
    narrador: inputNarradorRecurso.value.trim(),
    esAnciano: chkEsAnciano.checked,
    validadoCulturalmente: chkValidado.checked
  };

  try {
    const res = await fetch('http://localhost:3000/api/registrar-recurso', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosRecurso)
    });

    const data = await res.json();

    if (data.error) {
      console.error('Error al registrar recurso', data.error);
      alert('Ocurrió un error al registrar el recurso.');
    } else {
      alert('Recurso registrado correctamente.');
      document.getElementById('formRecurso').reset();
    }

  } catch (error) {
    console.error('Error de conexión al registrar recurso', error);
    alert('No se pudo conectar con el servidor.');
  }
}

btnGuardarRecurso.addEventListener('click', function (e) {
  e.preventDefault(); 
  guardarRecurso();
});

