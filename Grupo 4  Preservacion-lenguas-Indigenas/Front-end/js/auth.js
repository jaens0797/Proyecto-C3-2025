// ==============================================
//  CONFIG
// ==============================================
const API_URL = 'http://localhost:3000/api';  // si todavía no usás API real, igual no pasa nada
const STORAGE_KEY = 'usuarioActualLenguas';

console.log('auth.js CARGADO, API_URL =', API_URL);

// Helpers de rol
function esAdminOLider(usuario) {
  return usuario && (usuario.rol === "admin" || usuario.rol === "lider");
}

function esSoloConsulta(usuario) {
  return usuario && (usuario.rol === "docente" || usuario.rol === "publico");
}

// ==============================================
//  SESIÓN
// ==============================================

function guardarUsuarioActual(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function obtenerUsuarioActual() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error parseando usuarioActual:", e);
    return null;
  }
}

function cerrarSesion() {
  localStorage.removeItem(STORAGE_KEY);
  renderAuthArea();
  actualizarTabsNavegacion();
  // Si estás en página de administración:
  if (typeof toggleVistasSegunRol === "function") toggleVistasSegunRol();
  if (typeof limpiarTablaUsuarios === "function") limpiarTablaUsuarios();
  // Opcional: volver al inicio público
  window.location.href = "index.html";
}

// ==============================================
//  NAVBAR (Área de sesión arriba a la derecha)
// ==============================================

function renderAuthArea() {
  const authArea = document.getElementById("authArea");
  if (!authArea) return;

  const usuario = obtenerUsuarioActual();

  if (!usuario) {
    authArea.innerHTML = `
      <a href="login.html" class="btn btn-outline-light btn-sm">
        <i class="bi bi-box-arrow-in-right"></i> Iniciar sesión
      </a>
    `;
    return;
  }

  const rolLegible = {
    admin: "Admin",
    lider: "Líder",
    docente: "Docente",
    publico: "Público"
  }[usuario.rol] || usuario.rol;

  authArea.innerHTML = `
    <span class="me-2 small text-light text-end d-none d-lg-block">
      Conectado como <strong>${rolLegible}</strong><br>
      <span class="text-muted">${usuario.correo}</span>
    </span>
    <button id="btnLogout" class="btn btn-outline-light btn-sm">
      <i class="bi bi-box-arrow-right"></i> Cerrar sesión
    </button>
  `;

  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) btnLogout.addEventListener("click", cerrarSesion);
}

// ==============================================
//  MOSTRAR / OCULTAR PESTAÑAS DEL MENÚ
//  Usa class="nav-protegida" o data-roles="admin,lider"
// ==============================================

function actualizarTabsNavegacion() {
  const usuario = obtenerUsuarioActual();

  // 1) Mostrar / ocultar por class="nav-protegida"
  const tabsProtegidas = document.querySelectorAll(".nav-protegida");
  if (tabsProtegidas.length) {
    if (usuario) {
      tabsProtegidas.forEach(li => li.classList.remove("d-none"));
    } else {
      tabsProtegidas.forEach(li => li.classList.add("d-none"));
    }
  }

  // 2) Mostrar / ocultar por data-roles="admin,lider"
  const itemsPorRol = document.querySelectorAll("[data-roles]");
  if (!itemsPorRol.length) return;

  itemsPorRol.forEach(el => {
    const roles = el.getAttribute("data-roles").split(",").map(r => r.trim());
    if (usuario && roles.includes(usuario.rol)) {
      el.classList.remove("d-none");
    } else {
      el.classList.add("d-none");
    }
  });
}

// ==============================================
//  PERMISOS POR ROL (solo para páginas que tengan
//  authGate/adminPanel/mensajeNoAdmin, por ejemplo: lista-usuarios)
// ==============================================

function toggleVistasSegunRol() {
  const usuario = obtenerUsuarioActual();

  const authGate = document.getElementById("authGate");
  const adminPanel = document.getElementById("adminPanel");
  const mensajeNoAdmin = document.getElementById("mensajeNoAdmin");

  if (!authGate || !adminPanel || !mensajeNoAdmin) return;

  // Sin sesión → mostrar login embebido (si existiera)
  if (!usuario) {
    authGate.classList.remove("d-none");
    adminPanel.classList.add("d-none");
    mensajeNoAdmin.classList.add("d-none");
    return;
  }

  // Admin / Líder
  if (esAdminOLider(usuario)) {
    authGate.classList.add("d-none");
    adminPanel.classList.remove("d-none");
    mensajeNoAdmin.classList.add("d-none");
    if (typeof cargarUsuariosDesdeAPI === "function") cargarUsuariosDesdeAPI();
    return;
  }

  // Docente / Público → solo consultar
  if (esSoloConsulta(usuario)) {
    authGate.classList.add("d-none");
    adminPanel.classList.add("d-none");
    mensajeNoAdmin.classList.remove("d-none");
    mensajeNoAdmin.innerHTML = `
      Has iniciado sesión como <strong>${usuario.rol}</strong>.<br>
      Solo Admin y Líder pueden editar.<br>
      Tu rol solo puede consultar.
    `;
    return;
  }

  // Rol desconocido
  authGate.classList.add("d-none");
  adminPanel.classList.add("d-none");
  mensajeNoAdmin.classList.remove("d-none");
  mensajeNoAdmin.innerHTML = `Rol no reconocido.`;
}

// ==============================================
//  LOGIN (MOCK) CON SWEETALERT
// ==============================================

function initLoginGateForm() {
  const formLogin = document.getElementById("formLoginGate");
  if (!formLogin) return;

  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    const email    = document.getElementById("loginEmail").value.trim();
    const rolUI    = document.getElementById("loginRol").value;
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !rolUI || !password) {
      Swal.fire("Campos incompletos",
        "Por favor complete correo, rol y contraseña.",
        "warning"
      );
      return;
    }

    const usuarioMock = {
      nombre: email.split("@")[0],
      correo: email,
      rol: rolUI
    };

    guardarUsuarioActual(usuarioMock);

    Swal.fire({
      title: "Bienvenida",
      text: "Inicio de sesión correcto.",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#0d6efd"
    }).then(() => {
      window.location.href = "index.html";
    });
  });
}

// ==============================================
//  CRUD USUARIOS (solo admin/líder)
// ==============================================

function initFormNuevoUsuario() {
  const formNuevo = document.getElementById("formNuevoUsuario");
  if (!formNuevo) return;

  formNuevo.addEventListener("submit", async function (e) {
    e.preventDefault();

    const usuarioActual = obtenerUsuarioActual();

    if (!esAdminOLider(usuarioActual)) {
      Swal.fire("Acceso denegado",
        "Solo admin o líder pueden registrar usuarios.",
        "error"
      );
      return;
    }

    const nombre = document.getElementById("nuevoNombre").value.trim();
    const correo = document.getElementById("nuevoCorreo").value.trim();
    const rol = document.getElementById("nuevoRol").value;
    const password = document.getElementById("nuevoPassword").value.trim();

    if (!nombre || !correo || !rol || !password) {
      Swal.fire("Campos incompletos",
        "Complete todos los campos del registro.",
        "warning"
      );
      return;
    }

    try {
      const resp = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre, correo, rol, password,
          rolSolicitante: usuarioActual.rol
        })
      });

      const data = await resp.json();

      if (!resp.ok || !data.ok) {
        Swal.fire("Error",
          data.mensaje || "Error creando usuario",
          "error"
        );
        return;
      }

      Swal.fire("Usuario creado",
        "El usuario se registró correctamente.",
        "success"
      );

      if (typeof cargarUsuariosDesdeAPI === "function") {
        cargarUsuariosDesdeAPI();
      }
      formNuevo.reset();

    } catch (err) {
      console.error("Error creando usuario:", err);
      Swal.fire("Error",
        "No se pudo conectar con el servidor.",
        "error"
      );
    }
  });
}

async function cargarUsuariosDesdeAPI() {
  try {
    const resp = await fetch(`${API_URL}/usuarios`);
    const lista = await resp.json();
    renderTablaUsuarios(lista);
  } catch (err) {
    console.error("Error cargando usuarios:", err);
    Swal.fire("Error", "Error al obtener usuarios", "error");
  }
}

function limpiarTablaUsuarios() {
  const tbody = document.getElementById("tbodyUsuarios");
  if (tbody) {
    tbody.innerHTML = `
      <tr><td colspan="4" class="text-center text-muted">
        No hay usuarios cargados.
      </td></tr>
    `;
  }
}

function renderTablaUsuarios(usuarios) {
  const tbody = document.getElementById("tbodyUsuarios");
  if (!tbody) return;

  if (!usuarios || usuarios.length === 0) {
    limpiarTablaUsuarios();
    return;
  }

  tbody.innerHTML = usuarios
    .map(u => `
      <tr>
        <td>${u.nombre}</td>
        <td>${u.correo}</td>
        <td>${u.rol}</td>
        <td>
          <button class="btn btn-warning btn-sm btn-editar" data-id="${u._id}">
            Editar
          </button>
          <button class="btn btn-danger btn-sm btn-eliminar" data-id="${u._id}">
            Eliminar
          </button>
        </td>
      </tr>
    `).join("");

  initEventosTablaUsuarios();
}

function initEventosTablaUsuarios() {
  const tbody = document.getElementById("tbodyUsuarios");
  if (!tbody) return;

  tbody.onclick = e => {
    const btn = e.target;

    if (btn.classList.contains("btn-eliminar")) {
      eliminarUsuario(btn.dataset.id);
    }

    if (btn.classList.contains("btn-editar")) {
      editarUsuario(btn.dataset.id);
    }
  };
}

// ==============================================
//  ELIMINAR USUARIO CON SWEETALERT
// ==============================================

async function eliminarUsuario(id) {
  const usuarioActual = obtenerUsuarioActual();

  if (!esAdminOLider(usuarioActual)) {
    Swal.fire("Acceso denegado",
      "Solo admin o líder pueden eliminar usuarios.",
      "error"
    );
    return;
  }

  const resultado = await Swal.fire({
    title: "¿Seguro?",
    text: "Esto eliminará el usuario permanentemente.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d"
  });

  if (!resultado.isConfirmed) return;

  try {
    const resp = await fetch(`${API_URL}/usuarios/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rolSolicitante: usuarioActual.rol })
    });

    const data = await resp.json();

    if (!resp.ok || !data.ok) {
      Swal.fire("Error",
        data.mensaje || "Error al eliminar usuario",
        "error"
      );
      return;
    }

    Swal.fire("Eliminado",
      "El usuario fue eliminado correctamente.",
      "success"
    );

    if (typeof cargarUsuariosDesdeAPI === "function") {
      cargarUsuariosDesdeAPI();
    }

  } catch (error) {
    console.error("Error eliminando usuario:", error);
    Swal.fire("Error",
      "No se pudo conectar con el servidor.",
      "error"
    );
  }
}

// ==============================================
//  EDITAR USUARIO CON SWEETALERT (FORM ACOMODADO)
// ==============================================

async function editarUsuario(id) {
  try {
    const resp = await fetch(`${API_URL}/usuarios/${id}`);
    const data = await resp.json();

    if (!resp.ok || !data.ok) {
      Swal.fire("Error", data.mensaje || "No se pudo obtener el usuario", "error");
      return;
    }

    const u = data.usuario;

    Swal.fire({
      title: "Editar usuario",
      html: `
        <div class="container-fluid text-start">

          <div class="mb-3">
            <label class="form-label fw-bold">Nombre</label>
            <input id="editNombre" class="form-control" value="${u.nombre || ""}">
          </div>

          <div class="mb-3">
            <label class="form-label fw-bold">Correo</label>
            <input id="editCorreo" type="email" class="form-control" value="${u.correo || ""}">
          </div>

          <div class="mb-3">
            <label class="form-label fw-bold">Rol</label>
            <select id="editRol" class="form-select">
              <option value="admin"   ${u.rol === "admin"   ? "selected" : ""}>Admin</option>
              <option value="lider"   ${u.rol === "lider"   ? "selected" : ""}>Líder</option>
              <option value="docente" ${u.rol === "docente" ? "selected" : ""}>Docente</option>
              <option value="publico" ${u.rol === "publico" ? "selected" : ""}>Público</option>
            </select>
          </div>

          <div class="mb-2">
            <label class="form-label fw-bold">Nueva contraseña (opcional)</label>
            <input id="editPassword" type="password" class="form-control"
                   placeholder="Dejar vacío para no cambiar">
          </div>

        </div>
      `,
      focusConfirm: false,
      width: "600px",
      showCancelButton: true,
      confirmButtonText: "Guardar cambios",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#6c63ff",
      cancelButtonColor: "#6c757d",
      preConfirm: () => {
        const nombre = document.getElementById("editNombre").value.trim();
        const correo = document.getElementById("editCorreo").value.trim();
        const rol    = document.getElementById("editRol").value;
        const pass   = document.getElementById("editPassword").value.trim();

        if (!nombre || !correo || !rol) {
          Swal.showValidationMessage("Nombre, correo y rol son obligatorios.");
          return false;
        }

        return { nombre, correo, rol, password: pass };
      }
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      await guardarCambiosUsuario(id, result.value);
    });

  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    Swal.fire("Error", "No se pudo conectar con el servidor", "error");
  }
}

async function guardarCambiosUsuario(id, datos) {
  try {
    const usuarioActual = obtenerUsuarioActual();

    if (!usuarioActual || (usuarioActual.rol !== 'admin' && usuarioActual.rol !== 'lider')) {
      Swal.fire("Acceso denegado",
        "Solo admin o líder pueden editar usuarios.",
        "error"
      );
      return;
    }

    // Construimos el body para el backend
    const body = {
      nombre: datos.nombre,
      correo: datos.correo,
      rol: datos.rol,
      rolSolicitante: usuarioActual.rol   // 🔴 IMPORTANTE
    };

    // Si password viene vacío, no lo mandamos
    if (datos.password && datos.password.length > 0) {
      body.password = datos.password;     // el backend lo mapea a "contrasenna"
    }

    console.log('PUT /usuarios/' + id, body);

    const resp = await fetch(`${API_URL}/usuarios/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    let data;
    try {
      data = await resp.json();
    } catch (e) {
      console.error("No se pudo leer JSON de la respuesta:", e);
      throw new Error("Respuesta no válida del servidor");
    }

    console.log('RESPUESTA EDITAR =>', resp.status, data);

    if (!resp.ok || data.ok === false) {
      Swal.fire("Error",
        data.mensaje || "No se pudo actualizar el usuario",
        "error"
      );
      return;
    }

    Swal.fire("Actualizado",
      data.mensaje || "El usuario se actualizó correctamente.",
      "success"
    );

    if (typeof cargarUsuariosDesdeAPI === "function") {
      cargarUsuariosDesdeAPI();
    }

  } catch (error) {
    console.error("Error actualizando usuario:", error);
    Swal.fire("Error", "No se pudo conectar con el servidor", "error");
  }
}


// ==============================================
//  INICIALIZACIÓN GLOBAL
// ==============================================

document.addEventListener("DOMContentLoaded", () => {
  renderAuthArea();
  actualizarTabsNavegacion();
  toggleVistasSegunRol();
  initLoginGateForm();
  initFormNuevoUsuario();

  if (typeof limpiarTablaUsuarios === "function") {
    limpiarTablaUsuarios();
  }
});