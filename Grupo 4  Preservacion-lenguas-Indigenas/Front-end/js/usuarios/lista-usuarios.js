const API_URL = "http://localhost:3000/api";

// ==============================================
//  CARGAR LISTA INICIAL
// ==============================================
document.addEventListener("DOMContentLoaded", () => {
  cargarUsuarios();
});

function obtenerUsuarioActual() {
  const raw = localStorage.getItem("usuarioActualLenguas");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// ==============================================
//  CARGAR USUARIOS DESDE BACKEND
// ==============================================
async function cargarUsuarios() {
  try {
    const resp = await fetch(`${API_URL}/usuarios`);
    const lista = await resp.json();
    renderTabla(lista);
  } catch (error) {
    console.error("Error cargando usuarios:", error);
  }
}

// ==============================================
//  RENDER TABLA
// ==============================================
function renderTabla(usuarios) {
  const tbody = document.getElementById("tbodyUsuarios");

  tbody.innerHTML = usuarios
    .map(u => {
      return `
        <tr>
          <td>${u.nombre}</td>
          <td>${u.correo}</td>
          <td>${u.rol}</td>
          <td>
            <button class="btnEditar" 
              data-id="${u._id}" 
              data-nombre="${u.nombre}" 
              data-correo="${u.correo}" 
              data-rol="${u.rol}">
              Editar
            </button>

            <button class="btnEliminar" data-id="${u._id}">
              Eliminar
            </button>
          </td>
        </tr>
      `;
    })
    .join("");

  agregarEventos();
}

// ==============================================
//  DELEGACIÓN DE EVENTOS
// ==============================================
function agregarEventos() {
  const tbody = document.getElementById("tbodyUsuarios");

  tbody.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnEliminar")) {
      eliminarUsuario(e.target.dataset.id);
    }

    if (e.target.classList.contains("btnEditar")) {
      editarUsuario(e.target.dataset);
    }
  });
}

// ==============================================
//  ELIMINAR USUARIO
// ==============================================
async function eliminarUsuario(id) {
  const usuarioActual = obtenerUsuarioActual();

  if (!usuarioActual || (usuarioActual.rol !== "admin" && usuarioActual.rol !== "lider")) {
    Swal.fire("Acceso denegado", "Solo admin o líder pueden eliminar usuarios.", "error");
    return;
  }

  const confirm = await Swal.fire({
    title: "¿Seguro?",
    text: "Esto eliminará el usuario permanentemente",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  });

  if (!confirm.isConfirmed) return;

  try {
    const resp = await fetch(`${API_URL}/usuarios/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rolSolicitante: usuarioActual.rol })
    });

    const data = await resp.json();

    if (!resp.ok || !data.ok) {
      Swal.fire("Error", data.mensaje || "No se pudo eliminar", "error");
      return;
    }

    Swal.fire("Eliminado", "El usuario fue eliminado exitosamente", "success");
    cargarUsuarios();

  } catch (error) {
    console.error(error);
    Swal.fire("Error", "Fallo la conexión con el servidor", "error");
  }
}

// ==============================================
//  EDITAR USUARIO (SWEETALERT2)
// ==============================================
async function editarUsuario(dataset) {
  const usuarioActual = obtenerUsuarioActual();

  if (!usuarioActual || (usuarioActual.rol !== "admin" && usuarioActual.rol !== "lider")) {
    Swal.fire("Acceso denegado", "Solo admin o líder pueden editar usuarios.", "error");
    return;
  }

  const { id, nombre, correo, rol } = dataset;

  const { value: formValues } = await Swal.fire({
    title: 'Editar usuario',
    html: `
      <label>Nombre</label>
      <input id="swal-nombre" class="swal2-input" value="${nombre}">

      <label>Correo</label>
      <input id="swal-correo" type="email" class="swal2-input" value="${correo}">

      <label>Rol</label>
      <input id="swal-rol" class="swal2-input" value="${rol}">

      <label>Nueva contraseña (opcional)</label>
      <input id="swal-pass" type="password" class="swal2-input">
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Guardar cambios",
    cancelButtonText: "Cancelar",
    preConfirm: () => {
      const nuevoNombre = document.getElementById("swal-nombre").value.trim();
      const nuevoCorreo = document.getElementById("swal-correo").value.trim();
      const nuevoRol = document.getElementById("swal-rol").value.trim();
      const nuevaPass = document.getElementById("swal-pass").value.trim();

      if (!nuevoNombre || !nuevoCorreo || !nuevoRol) {
        Swal.showValidationMessage("Nombre, correo y rol son obligatorios");
        return false;
      }

      return { nuevoNombre, nuevoCorreo, nuevoRol, nuevaPass };
    }
  });

  if (!formValues) return; // Cancelado

  const body = {
    nombre: formValues.nuevoNombre,
    correo: formValues.nuevoCorreo,
    rol: formValues.nuevoRol,
    rolSolicitante: usuarioActual.rol
  };

  if (formValues.nuevaPass.length > 0) {
    body.password = formValues.nuevaPass;
  }

  try {
    const resp = await fetch(`${API_URL}/usuarios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await resp.json();

    if (!resp.ok || !data.ok) {
      Swal.fire("Error", data.mensaje || "No se pudo editar", "error");
      return;
    }

    Swal.fire("Actualizado", "Usuario modificado con éxito", "success");
    cargarUsuarios();

  } catch (error) {
    console.error(error);
    Swal.fire("Error", "No se pudo conectar con el servidor", "error");
  }
}

