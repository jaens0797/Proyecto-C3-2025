const tbodyEventos = document.getElementById('tbodyEventos');

async function cargarEventos() {
  try {
    const res = await fetch('http://localhost:3000/api/listar-eventos');
    let datos = await res.json();

    // RF-21 — ordenar por fecha ascendente
    datos = datos.sort(function (a, b) {
      const fechaA = new Date(a.fecha);
      const fechaB = new Date(b.fecha);
      return fechaA - fechaB;
    });

    mostrarEventos(datos);

  } catch (error) {
    console.error('Error al cargar eventos', error);
  }
}

function formatearFecha(fechaISO) {
  if (!fechaISO) return '';
  const fecha = new Date(fechaISO);
  return fecha.toLocaleDateString('es-CR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function mostrarEventos(eventos) {
  tbodyEventos.innerHTML = '';

  eventos.forEach(ev => {
    const fila = document.createElement('tr');

    const tdTitulo = document.createElement('td');
    tdTitulo.textContent = ev.titulo;

    const tdFecha = document.createElement('td');
    tdFecha.textContent = formatearFecha(ev.fecha);

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
