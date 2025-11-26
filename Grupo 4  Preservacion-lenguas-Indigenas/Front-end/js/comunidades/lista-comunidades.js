const tbodyComunidades = document.getElementById('tbodyComunidades');

async function cargarComunidades() {
  try {
    const res = await fetch('http://localhost:3000/api/listar-comunidades');
    const datos = await res.json();

    // Limpiar tabla
    tbodyComunidades.innerHTML = '';

    datos.forEach(com => {
      const fila = document.createElement('tr');

      const tdNombre = document.createElement('td');
      tdNombre.textContent = com.nombre;

      const tdPueblo = document.createElement('td');
      tdPueblo.textContent = com.pueblo;

      const tdProvincia = document.createElement('td');
      tdProvincia.textContent = com.provincia;

      const tdCanton = document.createElement('td');
      tdCanton.textContent = com.canton;

      const tdDistrito = document.createElement('td');
      tdDistrito.textContent = com.distrito;

      const tdEstado = document.createElement('td');
      tdEstado.textContent = com.estadoLengua;

      // 👉 Si tus profes NO han hecho eliminar todavía, dejalo así
      // (sin eliminar, solo mostrar lista)
      fila.appendChild(tdNombre);
      fila.appendChild(tdPueblo);
      fila.appendChild(tdProvincia);
      fila.appendChild(tdCanton);
      fila.appendChild(tdDistrito);
      fila.appendChild(tdEstado);

      tbodyComunidades.appendChild(fila);
    });

  } catch (error) {
    console.error('Error al cargar comunidades', error);
  }
}

cargarComunidades();

