const tbodyUsuarios = document.getElementById('tbodyUsuarios');

async function cargarUsuarios() {
  try {
    const res = await fetch('http://localhost:3000/api/listar-usuarios');
    const datos = await res.json();

    tbodyUsuarios.innerHTML = '';

    datos.forEach(usuario => {
      const fila = document.createElement('tr');

      const tdNombre = document.createElement('td');
      tdNombre.textContent = usuario.nombre;

      const tdCorreo = document.createElement('td');
      tdCorreo.textContent = usuario.correo;

      const tdRol = document.createElement('td');
      tdRol.textContent = usuario.rol;

      fila.appendChild(tdNombre);
      fila.appendChild(tdCorreo);
      fila.appendChild(tdRol);

      tbodyUsuarios.appendChild(fila);
    });
  } catch (error) {
    console.error('Error al cargar usuarios', error);
  }
}

cargarUsuarios();
