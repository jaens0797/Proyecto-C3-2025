// lista-usuarios.js

const tbodyUsuarios = document.getElementById('tbodyUsuarios');

// Función para cargar usuarios desde el backend
async function cargarUsuarios() {
    try {
        const res = await fetch('http://localhost:3000/api/listar-usuarios');
        const usuarios = await res.json();
        pintarTablaUsuarios(usuarios);
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Error de conexión',
            text: 'No se pudieron cargar los usuarios.'
        });
    }
}

// Función para dibujar la tabla
function pintarTablaUsuarios(lista) {
    tbodyUsuarios.innerHTML = '';

    lista.forEach(usuario => {
        const fila = document.createElement('tr');

        const tdNombre = document.createElement('td');
        tdNombre.textContent = usuario.nombre;

        const tdCorreo = document.createElement('td');
        tdCorreo.textContent = usuario.correo;

        const tdRol = document.createElement('td');
        tdRol.textContent = usuario.rol;

        const tdAcciones = document.createElement('td');

        // Botón eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.classList.add('btn', 'btn-danger', 'btn-sm');
        btnEliminar.addEventListener('click', () => {
            confirmarEliminarUsuario(usuario._id);
        });

        tdAcciones.appendChild(btnEliminar);

        fila.appendChild(tdNombre);
        fila.appendChild(tdCorreo);
        fila.appendChild(tdRol);
        fila.appendChild(tdAcciones);

        tbodyUsuarios.appendChild(fila);
    });
}

// Confirmación y eliminación
async function confirmarEliminarUsuario(id) {
    const result = await Swal.fire({
        icon: 'warning',
        title: '¿Eliminar usuario?',
        text: 'Esta acción no se puede deshacer.',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) {
        return;
    }

    try {
        const res = await fetch(`http://localhost:3000/api/eliminar-usuario/${id}`, {
            method: 'DELETE'
        });
        const data = await res.json();

        if (data.error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar',
                text: data.error
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Usuario eliminado'
            });
            cargarUsuarios();
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error de conexión',
            text: 'No se pudo eliminar el usuario.'
        });
    }
}

// Cargar lista al abrir la página
window.addEventListener('DOMContentLoaded', cargarUsuarios);

