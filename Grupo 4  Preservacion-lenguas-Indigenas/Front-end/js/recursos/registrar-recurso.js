// ================== CONFIGURACIÓN ==================
const BASE_URL = window.API_URL || "http://localhost:3000/api";

const usuarioActual = (typeof obtenerUsuarioActual === "function")
  ? obtenerUsuarioActual()
  : null;

const puedeGestionar = usuarioActual &&
  (usuarioActual.rol === "admin" || usuarioActual.rol === "lider");

console.log("📌 registrar-recursos.js BASE_URL =", BASE_URL);
console.log("📌 Usuario actual en recursos:", usuarioActual);

// ================== ELEMENTOS DEL FORM ==================
const formRecurso           = document.getElementById("formRecurso");
const inputTituloRecurso    = document.getElementById("txtTituloRecurso");
const selectTipoRecurso     = document.getElementById("sltTipoRecurso");
const inputPuebloRecurso    = document.getElementById("txtPuebloRecurso");
const inputComunidadRecurso = document.getElementById("txtComunidadRecurso");
const inputUrlRecurso       = document.getElementById("txtUrlRecurso");
const inputNarradorRecurso  = document.getElementById("txtNarradorRecurso");
const chkEsAnciano          = document.getElementById("chkEsAnciano");
const chkValidado           = document.getElementById("chkValidado");
const txtDescripcionRecurso = document.getElementById("txtDescripcionRecurso");

const btnGuardarRecurso     = document.getElementById("btnGuardarRecurso");
const btnEliminarRecurso    = document.getElementById("btnEliminarRecurso");

// pequeño texto opcional si querés mostrar que estás editando
let recursoEditandoId = null;

// ================== PERMISOS ==================
if (!puedeGestionar) {
  // Si es docente o público (o no hay sesión), lo mandamos directo a la lista
  window.location.href = "lista-recursos.html";   // ajusta el nombre si tu archivo se llama distinto
}

// ================== CARGAR RECURSO DESDE LISTA (localStorage) ==================
function cargarRecursoDesdeStorage() {
  try {
    const guardado = localStorage.getItem("recursoEnEdicionLenguas");
    if (!guardado) return;

    const rec = JSON.parse(guardado);
    console.log("✏️ Cargando recurso en edición desde storage:", rec);

    recursoEditandoId = rec._id || null;

    inputTituloRecurso.value    = rec.titulo || "";
    selectTipoRecurso.value     = rec.tipoRecurso || "";
    inputPuebloRecurso.value    = rec.pueblo || "";
    inputComunidadRecurso.value = rec.comunidad || "";
    inputUrlRecurso.value       = rec.url || "";
    inputNarradorRecurso.value  = rec.narrador || "";
    chkEsAnciano.checked        = !!rec.esAnciano;
    chkValidado.checked         = !!rec.validadoCulturalmente;
    txtDescripcionRecurso.value = rec.descripcion || "";

    btnGuardarRecurso.textContent = "Actualizar recurso";

    // Limpiamos storage para que no se quede pegado
    localStorage.removeItem("recursoEnEdicionLenguas");
  } catch (e) {
    console.error("⚠️ Error al leer recurso en edición del storage:", e);
  }
}

// Llamar apenas carga el script
cargarRecursoDesdeStorage();

// ================== VALIDACIÓN ==================
function validarRecurso() {
  let ok = true;

  const camposObligatorios = [
    inputTituloRecurso,
    selectTipoRecurso,
    inputPuebloRecurso,
    inputUrlRecurso
  ];

  camposObligatorios.forEach(campo => {
    campo.classList.remove("inputError");
    if (!campo.value.trim()) {
      campo.classList.add("inputError");
      ok = false;
    }
  });

  if (!ok) {
    Swal.fire({
      icon: "error",
      title: "Campos obligatorios",
      text: "Revisá los campos marcados en rojo."
    });
  }

  return ok;
}

// ================== GUARDAR (CREAR / EDITAR) ==================
async function guardarRecurso() {
  if (!puedeGestionar) return;
  if (!validarRecurso()) return;

  const datos = {
    titulo:      inputTituloRecurso.value.trim(),
    tipoRecurso: selectTipoRecurso.value.trim(),
    pueblo:      inputPuebloRecurso.value.trim(),
    comunidad:   inputComunidadRecurso.value.trim(),
    descripcion: txtDescripcionRecurso.value.trim(),
    url:         inputUrlRecurso.value.trim(),
    narrador:    inputNarradorRecurso.value.trim(),
    esAnciano:   chkEsAnciano.checked,
    validadoCulturalmente: chkValidado.checked
  };

  const esEdicion = !!recursoEditandoId;
  const url    = esEdicion
    ? `${BASE_URL}/actualizar-recurso/${recursoEditandoId}`
    : `${BASE_URL}/registrar-recurso`;
  const method = esEdicion ? "PUT" : "POST";

  console.log("📤 Guardar recurso:", method, url, datos);

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });

    console.log("🔎 Respuesta HTTP guardar:", res.status, res.statusText);

    if (!res.ok) {
      let detalle = "";
      try {
        const dataError = await res.json();
        console.error("❌ Error body guardar:", dataError);
        detalle = dataError.detalle || dataError.error || "";
      } catch (_) {}

      Swal.fire({
        icon: "error",
        title: "Error al guardar",
        text: detalle || "El servidor respondió con un error."
      });
      return;
    }

    const data = await res.json();
    console.log("✅ Recurso guardado/actualizado:", data);

    Swal.fire({
      icon: "success",
      title: esEdicion ? "Recurso actualizado" : "Recurso registrado",
      timer: 1800,
      showConfirmButton: false
    });

    // Volver a estado "nuevo"
    formRecurso.reset();
    recursoEditandoId = null;
    btnGuardarRecurso.textContent = "Guardar recurso";

  } catch (error) {
    console.error("🌐 Error de conexión al guardar recurso:", error);
    Swal.fire({
      icon: "error",
      title: "Sin conexión",
      text: "No se pudo conectar con el servidor. Verificá que el backend esté encendido."
    });
  }
}

// ================== ELIMINAR ==================
async function eliminarRecurso() {
  if (!puedeGestionar) return;

  if (!recursoEditandoId) {
    Swal.fire({
      icon: "warning",
      title: "Nada que eliminar",
      text: "Para eliminar, primero cargá un recurso desde la lista (botón Editar)."
    });
    return;
  }

  const confirmacion = await Swal.fire({
    icon: "warning",
    title: "¿Eliminar recurso?",
    text: "Esta acción no se puede deshacer.",
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar"
  });

  if (!confirmacion.isConfirmed) return;

  const url = `${BASE_URL}/eliminar-recurso/${recursoEditandoId}`;
  console.log("🗑️ DELETE", url);

  try {
    const res = await fetch(url, { method: "DELETE" });
    console.log("🔎 Respuesta HTTP eliminar:", res.status, res.statusText);

    if (!res.ok) {
      let detalle = "";
      try {
        const dataError = await res.json();
        console.error("❌ Error body eliminar:", dataError);
        detalle = dataError.detalle || dataError.error || "";
      } catch (_) {}

      Swal.fire({
        icon: "error",
        title: "Error al eliminar",
        text: detalle || "El servidor respondió con un error."
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Recurso eliminado",
      timer: 1800,
      showConfirmButton: false
    });

    formRecurso.reset();
    recursoEditandoId = null;
    btnGuardarRecurso.textContent = "Guardar recurso";

  } catch (error) {
    console.error("🌐 Error de conexión al eliminar recurso:", error);
    Swal.fire({
      icon: "error",
      title: "Sin conexión",
      text: "No se pudo conectar con el servidor."
    });
  }
}

// ================== EVENTOS ==================
btnGuardarRecurso.addEventListener("click", (e) => {
  e.preventDefault();
  guardarRecurso();
});

btnEliminarRecurso.addEventListener("click", (e) => {
  e.preventDefault();
  eliminarRecurso();
});