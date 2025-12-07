// registrar-usuario.js

const API_URL = "http://localhost:3000/api";

// Mapeo entre roles de UI y roles reales del backend
function mapearRol(rolUI) {
  switch (rolUI) {
    case "administrador": return "admin";
    case "lider": return "lider";
    case "docente": return "docente";
    case "estudiante": return "publico"; // estudiantes = público
    case "publico": return "publico";
    default: return "publico";
  }
}

// Obtener usuario conectado (si hay sistema de login)
function obtenerUsuarioActual() {
  const raw = localStorage.getItem("usuarioActualLenguas");
  if (!raw) return null;
  try { return JSON.parse(raw); }
  catch { return null; }
}

document.getElementById("btnGuardarUsuario").addEventListener("click", async () => {
  const nombre = document.getElementById("txtNombre").value.trim();
  const correo = document.getElementById("txtCorreo").value.trim();
  const rolUI = document.getElementById("slcRol").value;
  const password = document.getElementById("txtContrasenna").value.trim();
  const confirm = document.getElementById("txtConfirmacion").value.trim();

  if (!nombre || !correo || !rolUI || !password || !confirm) {
    return Swal.fire("Error", "Complete todos los campos", "error");
  }

  if (password !== confirm) {
    return Swal.fire("Error", "Las contraseñas no coinciden", "error");
  }

  const rolBackend = mapearRol(rolUI);

  // Usuario actual que intenta crear
  const usuarioActual = obtenerUsuarioActual();

  if (!usuarioActual || !(usuarioActual.rol === "admin" || usuarioActual.rol === "lider")) {
    return Swal.fire("Sin permisos", "Solo administrador o líder pueden crear usuarios", "error");
  }

  try {
    const resp = await fetch(`${API_URL}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        correo,
        rol: rolBackend,
        password,
        rolSolicitante: usuarioActual.rol
      })
    });

    const data = await resp.json();

    if (!data.ok) {
      return Swal.fire("Error", data.mensaje, "error");
    }

    Swal.fire("Éxito", "Usuario registrado", "success");

    document.getElementById("formUsuario").reset();

  } catch (error) {
    console.error("ERROR:", error);
    Swal.fire("Error", "No se pudo registrar el usuario", "error");
  }
});