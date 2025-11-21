const tbodyRecursos = document.getElementById('tbodyRecursos');

async function cargarRecursos() {
  try {
    const res = await fetch('http://localhost:3000/api/listar-recursos');
    const datos = await res.json();

    tbodyRecursos.innerHTML = '';

    datos.forEach(rec => {
      const fila = document.createElement('tr');

      const tdTitulo = document.createElement('td');
      tdTitulo.textContent = rec.titulo;

      const tdTipo = document.createElement('td');
      tdTipo.textContent = rec.tipoRecurso;

      const tdPueblo = document.createElement('td');
      tdPueblo.textContent = rec.pueblo;

      const tdComunidad = document.createElement('td');
      tdComunidad.textContent = rec.comunidad || '-';

      const tdValidado = document.createElement('td');
      tdValidado.textContent = rec.validadoCulturalmente ? 'Sí' : 'No';

      fila.appendChild(tdTitulo);
      fila.appendChild(tdTipo);
      fila.appendChild(tdPueblo);
      fila.appendChild(tdComunidad);
      fila.appendChild(tdValidado);

      tbodyRecursos.appendChild(fila);
    });
  } catch (error) {
    console.error('Error al cargar recursos', error);
  }
}

cargarRecursos();
