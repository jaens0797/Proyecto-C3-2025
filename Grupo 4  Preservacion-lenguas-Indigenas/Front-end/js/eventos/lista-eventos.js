const tbodyEventos = document.getElementById('tbodyEventos');

async function cargarEventos() {
  try {
    const res = await fetch('http://localhost:3000/api/listar-eventos');
    let datos = await res.json();

    // Limpiar tabla
    tbodyEventos.innerHTML = '';

    // Ordenar por fecha ascendente (del más cercano al más lejano)
    datos = datos.sort(function (a, b) {
      const fechaA = new Date(a.fecha);
      const fechaB = new Date(b.fecha);
      return fechaA - fechaB;
    });

    mostrarEventos(datos);

  } catch (error) {
    console.error('Error al cargar eventos', error);
    alert('Ocurrió un error al cargar los eventos.');
  }
}

function mostrarEventos(lista) {
  // Por si acaso, limpiar antes de dibujar
  tbodyEventos.innerHTML = '';

  lista.forEach(function (ev) {
    const fila = document.createElement('tr');

    const tdTitulo = document.createElement('td');
    tdTitulo.textContent = ev.titulo || '';

    const tdFecha = document.createElement('td');
    if (ev.fecha) {
      const fechaObj = new Date(ev.fecha);
      tdFecha.textContent = fechaObj.toLocaleDateString('es-CR');
    } else {
      tdFecha.textContent = '';
    }

    const tdLugar = document.createElement('td');
    tdLugar.textContent = ev.lugar || '';

    const tdPueblo = document.createElement('td');
    tdPueblo.textContent = ev.pueblo || '';

    const tdTipo = document.createElement('td');
    tdTipo.textContent = ev.tipoEvento || '';

    fila.appendChild(tdTitulo);
    fila.appendChild(tdFecha);
    fila.appendChild(tdLugar);
    fila.appendChild(tdPueblo);
    fila.appendChild(tdTipo);

    tbodyEventos.appendChild(fila);
  });
}

// Ejecuta al cargar la página
cargarEventos();
