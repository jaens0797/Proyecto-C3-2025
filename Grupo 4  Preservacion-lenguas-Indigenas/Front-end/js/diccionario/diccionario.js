const inputPalabraBuscar = document.getElementById('txtPalabraBuscar');
const btnBuscarPalabra = document.getElementById('btnBuscarPalabra');
const divResultadoDiccionario = document.getElementById('resultadoDiccionario');

async function buscarPalabraDiccionario() {
  const palabra = inputPalabraBuscar.value.trim();

  if (!palabra) {
    alert('Por favor escribí una palabra en español para buscar.');
    return;
  }

  try {
    // GET con query: ?palabra=...
    const res = await fetch('http://localhost:3000/api/buscar-termino?palabra=' + encodeURIComponent(palabra));
    const termino = await res.json();

    divResultadoDiccionario.innerHTML = '';

    // RF-19 — mensaje si no existe
    if (!termino || !termino.terminoEspanol) {
      divResultadoDiccionario.innerHTML = '<p><b>No se encontraron resultados</b></p>';
      return;
    }

    // RF-17 y RF-18 — mostrar traducción y ejemplo simple
    let html = '';
    html += '<p><b>Español:</b> ' + (termino.terminoEspanol || '') + '</p>';
    html += '<p><b>En lengua indígena:</b> ' + (termino.terminoLengua || '') + '</p>';
    html += '<p><b>Pueblo:</b> ' + (termino.pueblo || '') + '</p>';

    if (termino.audioPronunciacion) {
      html += '<p><audio controls src="' + termino.audioPronunciacion + '"></audio></p>';
    }

    html += '<p><i>Ejemplo de uso:</i> Podés usar esta palabra en una frase sencilla para practicarla.</p>';

    divResultadoDiccionario.innerHTML = html;

  } catch (error) {
    console.error('Error al consultar el diccionario', error);
    alert('Ocurrió un error al consultar el diccionario.');
  }
}

btnBuscarPalabra.addEventListener('click', function (e) {
  e.preventDefault();
  buscarPalabraDiccionario();
});

// Opcional: buscar con Enter
inputPalabraBuscar.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    buscarPalabraDiccionario();
  }
});
