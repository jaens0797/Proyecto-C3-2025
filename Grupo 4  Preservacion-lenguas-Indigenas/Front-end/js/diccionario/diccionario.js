const inputTerminoEspanol = document.getElementById('txtTerminoEspanol');
const inputTerminoLengua = document.getElementById('txtTerminoLengua');
const inputPueblo = document.getElementById('txtPueblo');
const inputAudio = document.getElementById('txtAudioPronunciacion');

const btnGuardarTermino = document.getElementById('btnGuardarTermino');
const btnBuscarTermino = document.getElementById('btnBuscarTermino');
const btnVerTodos = document.getElementById('btnVerTodos');

const inputBuscar = document.getElementById('txtBuscar');
const tbodyDiccionario = document.getElementById('tbodyDiccionario');

// guardar todo lo que viene de la BD
let listaTerminos = [];

// LIMPIAR
function limpiarFormularioDiccionario() {
  inputTerminoEspanol.value = '';
  inputTerminoLengua.value = '';
  inputPueblo.value = '';
  inputAudio.value = '';
}

// VALIDAR
function validarDiccionario() {
  if (inputTerminoEspanol.value.trim() === '') return false;
  if (inputTerminoLengua.value.trim() === '') return false;
  if (inputPueblo.value.trim() === '') return false;
  return true;
}

// REGISTRAR
async function registrarTermino() {
  if (!validarDiccionario()) {
    alert('Completá Español, Lengua y Pueblo.');
    return;
  }

  let datos = {
    terminoEspanol: inputTerminoEspanol.value.trim(),
    terminoLengua: inputTerminoLengua.value.trim(),
    pueblo: inputPueblo.value.trim(),
    audioPronunciacion: inputAudio.value.trim()
  };

  try {
    let res = await fetch('http://localhost:3000/api/registrar-termino', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

    let json = await res.json();
    alert(json.msj || 'Término registrado correctamente');
    limpiarFormularioDiccionario();
    // recargar la lista para incluir el nuevo
    cargarTerminosDiccionario();
  } catch (error) {
    alert('No se pudo registrar.');
  }
}

// LLENAR TABLA
function llenarTablaDiccionario(lista) {
  tbodyDiccionario.innerHTML = '';

  lista.forEach(t => {
    let fila = document.createElement('tr');

    let tdEspanol = document.createElement('td');
    tdEspanol.textContent = t.terminoEspanol;

    let tdLengua = document.createElement('td');
    tdLengua.textContent = t.terminoLengua;

    let tdPueblo = document.createElement('td');
    tdPueblo.textContent = t.pueblo;

    let tdAudio = document.createElement('td');
    if (t.audioPronunciacion && t.audioPronunciacion.trim() !== '') {
      let link = document.createElement('a');
      link.href = t.audioPronunciacion;
      link.target = '_blank';
      link.textContent = 'Escuchar';
      tdAudio.appendChild(link);
    } else {
      tdAudio.textContent = '—';
    }

    fila.appendChild(tdEspanol);
    fila.appendChild(tdLengua);
    fila.appendChild(tdPueblo);
    fila.appendChild(tdAudio);

    tbodyDiccionario.appendChild(fila);
  });
}

// LISTAR (traer todo de la BD)
async function cargarTerminosDiccionario() {
  try {
    let res = await fetch('http://localhost:3000/api/listar-terminos');
    let datos = await res.json();
    // guardamos la lista completa en memoria
    listaTerminos = datos;
    llenarTablaDiccionario(listaTerminos);
  } catch (error) {
    alert('Error al cargar.');
  }
}

// 🔍 BUSCAR (filtrando lo ya cargado, sin más fetch)
function buscarTerminos() {
  let texto = inputBuscar.value.trim().toLowerCase();

  if (texto === '') {
    // si no hay texto, mostramos todo
    llenarTablaDiccionario(listaTerminos);
    return;
  }

  let filtrados = [];

  listaTerminos.forEach(function (t) {
    let esp = (t.terminoEspanol || '').toLowerCase();
    let len = (t.terminoLengua || '').toLowerCase();

    if (esp.indexOf(texto) !== -1 || len.indexOf(texto) !== -1) {
      filtrados.push(t);
    }
  });

  llenarTablaDiccionario(filtrados);
}

// EVENTOS
btnGuardarTermino.addEventListener('click', registrarTermino);

btnBuscarTermino.addEventListener('click', function (e) {
  e.preventDefault();
  buscarTerminos();
});

btnVerTodos.addEventListener('click', function (e) {
  e.preventDefault();
  inputBuscar.value = '';
  llenarTablaDiccionario(listaTerminos);
});

// AL CARGAR
window.addEventListener('DOMContentLoaded', cargarTerminosDiccionario);
