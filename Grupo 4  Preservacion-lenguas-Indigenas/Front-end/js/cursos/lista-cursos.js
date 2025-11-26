const tbodyCursos = document.getElementById('tbodyCursos');

async function cargarCursos() {
  try {
    const res = await fetch('http://localhost:3000/api/listar-cursos');
    const datos = await res.json();

    tbodyCursos.innerHTML = '';

    datos.forEach(cur => {
      const fila = document.createElement('tr');

      const tdNombre = document.createElement('td');
      tdNombre.textContent = cur.nombre;

      const tdPueblo = document.createElement('td');
      tdPueblo.textContent = cur.pueblo || '';

      const tdNivel = document.createElement('td');
      tdNivel.textContent = cur.nivel || '';

      const tdDuracion = document.createElement('td');
      tdDuracion.textContent = cur.duracionHoras ? cur.duracionHoras + ' h' : '';

      const tdEvaluaciones = document.createElement('td');
      tdEvaluaciones.textContent = cur.tieneEvaluaciones ? 'Sí' : 'No';

      const tdAcciones = document.createElement('td');

      // Botón para ir al quiz o lecciones (para RF-14/15)
      const btnVerQuiz = document.createElement('button');
      btnVerQuiz.textContent = 'Ver quiz';
      btnVerQuiz.addEventListener('click', function () {
        // Por ahora lo redirigimos a quiz.html
        window.location.href = 'quiz.html';
      });

      tdAcciones.appendChild(btnVerQuiz);

      fila.appendChild(tdNombre);
      fila.appendChild(tdPueblo);
      fila.appendChild(tdNivel);
      fila.appendChild(tdDuracion);
      fila.appendChild(tdEvaluaciones);
      fila.appendChild(tdAcciones);

      tbodyCursos.appendChild(fila);
    });

  } catch (error) {
    console.error('Error al cargar cursos', error);
  }
}

cargarCursos();
