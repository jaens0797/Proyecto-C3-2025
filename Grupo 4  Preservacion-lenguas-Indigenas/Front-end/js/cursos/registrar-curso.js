const inputNombreCurso = document.getElementById('txtNombreCurso');
const inputPuebloCurso = document.getElementById('txtPuebloCurso');
const selectNivelCurso = document.getElementById('sltNivelCurso');
const inputDuracionHoras = document.getElementById('txtDuracionHoras');
const txtDescripcionCurso = document.getElementById('txtDescripcionCurso');
const chkTieneAudio = document.getElementById('chkTieneAudio');
const chkTieneEscritura = document.getElementById('chkTieneEscritura');
const chkTieneEvaluaciones = document.getElementById('chkTieneEvaluaciones');
const btnGuardarCurso = document.getElementById('btnGuardarCurso');

function limpiarErroresCurso() {
  const campos = document.querySelectorAll('.inputError');
  campos.forEach(c => c.classList.remove('inputError'));
}

function validarCurso() {
  let error = false;
  limpiarErroresCurso();

  if (!inputNombreCurso.value.trim()) {
    inputNombreCurso.classList.add('inputError');
    error = true;
  }

  if (!inputPuebloCurso.value.trim()) {
    inputPuebloCurso.classList.add('inputError');
    error = true;
  }

  if (!selectNivelCurso.value.trim()) {
    selectNivelCurso.classList.add('inputError');
    error = true;
  }

  const horas = Number(inputDuracionHoras.value);
  if (!horas || horas <= 0) {
    inputDuracionHoras.classList.add('inputError');
    error = true;
  }

  if (error) {
    alert('Revisá los campos marcados en rojo. Nombre, pueblo, nivel y duración son obligatorios.');
  }

  return !error;
}

async function guardarCurso() {
  if (!validarCurso()) {
    return;
  }

  const datosCurso = {
    nombre: inputNombreCurso.value.trim(),
    pueblo: inputPuebloCurso.value.trim(),
    nivel: selectNivelCurso.value.trim(),
    descripcion: txtDescripcionCurso.value.trim(),
    duracionHoras: Number(inputDuracionHoras.value),
    tieneAudio: chkTieneAudio.checked,
    tieneEscritura: chkTieneEscritura.checked,
    tieneEvaluaciones: chkTieneEvaluaciones.checked
  };

  try {
    const res = await fetch('http://localhost:3000/api/registrar-curso', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosCurso)
    });

    const data = await res.json();

    if (data.error) {
      console.error('Error al registrar curso', data.error);
      alert('Ocurrió un error al registrar el curso.');
    } else {
      alert('Curso registrado correctamente.');
      document.getElementById('formCurso').reset();
    }

  } catch (error) {
    console.error('Error de conexión al registrar curso', error);
    alert('No se pudo conectar con el servidor.');
  }
}

btnGuardarCurso.addEventListener('click', function (e) {
  e.preventDefault();
  guardarCurso();
});
