const tbodyRecursos = document.getElementById('tbodyRecursos');
const inputFiltroPueblo = document.getElementById('filtroPueblo');
const selectFiltroTipo = document.getElementById('filtroTipo');
const divResumenPueblos = document.getElementById('resumenPueblos');

// Arreglo global para poder filtrar
let listaRecursos = [];

async function cargarRecursos() {
  try {
    const res = await fetch('http://localhost:3000/api/listar-recursos');
    const datos = await res.json();

    listaRecursos = datos; // guardar para filtros y contador

    mostrarRecursos(listaRecursos);
    actualizarResumenPueblos(listaRecursos);
  } catch (error) {
    console.error('Error al cargar recursos', error);
  }
}

function mostrarRecursos(recursos) {
  tbodyRecursos.innerHTML = '';

  recursos.forEach(rec => {
    const fila = document.createElement('tr');

    const tdTitulo = document.createElement('td');
    tdTitulo.textContent = rec.titulo;

    const tdTipo = document.createElement('td');
    tdTipo.textContent = rec.tipoRecurso;

    const tdPueblo = document.createElement('td');
    tdPueblo.textContent = rec.pueblo || '';

    const tdComunidad = document.createElement('td');
    tdComunidad.textContent = rec.comunidad || '';

    const tdValidado = document.createElement('td');
    tdValidado.textContent = rec.validadoCulturalmente ? 'Sí' : 'No';

    const tdAcciones = document.createElement('td');

    // Botón ver detalle (RF-05)
    const btnDetalle = document.createElement('button');
    btnDetalle.textContent = 'Ver detalle';
    btnDetalle.addEventListener('click', function () {
      verDetalleRecurso(rec);
    });

    // Botón eliminar (RF-09 + RF-10)
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.style.marginLeft = '8px';
    btnEliminar.addEventListener('click', function () {
      eliminarRecurso(rec._id);
    });

    tdAcciones.appendChild(btnDetalle);
    tdAcciones.appendChild(btnEliminar);

    fila.appendChild(tdTitulo);
    fila.appendChild(tdTipo);
    fila.appendChild(tdPueblo);
    fila.appendChild(tdComunidad);
    fila.appendChild(tdValidado);
    fila.appendChild(tdAcciones);

    tbodyRecursos.appendChild(fila);
  });
}

// RF-05 — Ver detalle en un alert sencillo
function verDetalleRecurso(rec) {
  let mensaje = '';
  mensaje += 'Título: ' + (rec.titulo || '') + '\n';
  mensaje += 'Tipo: ' + (rec.tipoRecurso || '') + '\n';
  mensaje += 'Pueblo: ' + (rec.pueblo || '') + '\n';
  mensaje += 'Comunidad: ' + (rec.comunidad || '') + '\n';
  mensaje += 'Narrador: ' + (rec.narrador || '') + (rec.esAnciano ? ' (Anciano de la comunidad)' : '') + '\n';
  mensaje += 'Validado culturalmente: ' + (rec.validadoCulturalmente ? 'Sí' : 'No') + '\n';
  mensaje += 'Descripción: ' + (rec.descripcion || '') + '\n';
  mensaje += 'URL: ' + (rec.url || '') + '\n';

  alert(mensaje);
}

// RF-06 y RF-07 — Filtrar por pueblo y tipo
function aplicarFiltros() {
  const textoPueblo = inputFiltroPueblo.value.toLowerCase();
  const tipoSeleccionado = selectFiltroTipo.value;

  const filtrados = listaRecursos.filter(rec => {
    const coincidePueblo = !textoPueblo || (rec.pueblo && rec.pueblo.toLowerCase().includes(textoPueblo));
    const coincideTipo = !tipoSeleccionado || rec.tipoRecurso === tipoSeleccionado;
    return coincidePueblo && coincideTipo;
  });

  mostrarRecursos(filtrados);
  actualizarResumenPueblos(filtrados);
}

// RF-12 — Contar recursos por pueblo
function actualizarResumenPueblos(recursos) {
  const conteo = {};

  recursos.forEach(rec => {
    const pueblo = rec.pueblo || 'Sin pueblo';
    if (!conteo[pueblo]) {
      conteo[pueblo] = 0;
    }
    conteo[pueblo]++;
  });

  divResumenPueblos.innerHTML = '';

  for (const pueblo in conteo) {
    const p = document.createElement('p');
    p.textContent = pueblo + ': ' + conteo[pueblo] + ' recurso(s)';
    divResumenPueblos.appendChild(p);
  }
}

// RF-09 + RF-10 — Eliminar recurso con confirm()
async function eliminarRecurso(id) {
  const confirmar = confirm('¿Deseás eliminar este recurso? Esta acción no se puede deshacer.');

  if (!confirmar) {
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/eliminar-recurso/' + id, {
      method: 'DELETE'
    });
    const data = await res.json();

    if (data.error) {
      console.error('Error al eliminar recurso', data.error);
      alert('Ocurrió un error al eliminar el recurso.');
    } else {
      alert('Recurso eliminado correctamente.');
      cargarRecursos();
    }
  } catch (error) {
    console.error('Error de conexión al eliminar recurso', error);
    alert('No se pudo conectar con el servidor.');
  }
}

// Eventos de filtros
if (inputFiltroPueblo) {
  inputFiltroPueblo.addEventListener('input', aplicarFiltros);
}

if (selectFiltroTipo) {
  selectFiltroTipo.addEventListener('change', aplicarFiltros);
}

// Cargar datos al entrar a la página
cargarRecursos();
