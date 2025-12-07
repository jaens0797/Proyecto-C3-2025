// ================== CONFIGURACIÓN ==================
const BASE_URL = window.API_URL || "http://localhost:3000/api";
console.log("📌 listar-recursos.js usando BASE_URL =", BASE_URL);

const tbodyRecursos     = document.getElementById("tbodyRecursos");
const inputFiltroPueblo = document.getElementById("filtroPueblo");
const selectFiltroTipo  = document.getElementById("filtroTipo");
const divResumenPueblos = document.getElementById("resumenPueblos");

// ================== ROL DEL USUARIO ==================
const usuarioActual = (typeof obtenerUsuarioActual === "function")
  ? obtenerUsuarioActual()
  : null;

let rol = usuarioActual?.rol?.toLowerCase() || "";

const puedeGestionar =
  rol === "admin" ||
  rol === "administrador" ||
  rol === "lider" ||
  rol === "líder";

console.log("ROL DETECTADO →", rol, "| puedeGestionar =", puedeGestionar);

// ================== AJUSTE DE LAYOUT ==================
document.addEventListener("DOMContentLoaded", () => {
  const colAcciones = document.getElementById("colAccionesRecursos");
  const colLista    = document.getElementById("colListaRecursos");

  if (!puedeGestionar) {
    // Oculta columna de acciones
    if (colAcciones) colAcciones.style.display = "none";

    // Expande listado a ancho completo
    if (colLista) {
      colLista.classList.remove("col-lg-8");
      colLista.classList.add("col-lg-12");
    }
  }
});

// ================== CARGAR RECURSOS ==================
let listaRecursos = [];

async function cargarRecursos() {
  try {
    const res = await fetch(`${BASE_URL}/listar-recursos`);
    if (!res.ok) throw new Error("Error al cargar recursos");

    listaRecursos = await res.json();

    mostrarRecursos(listaRecursos);
    actualizarResumenPueblos(listaRecursos);

  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      icon: "error",
      title: "No se pudo cargar",
      text: "Verificá la conexión con el servidor."
    });
  }
}

// ================== MOSTRAR TABLA ==================
function mostrarRecursos(recursos) {
  tbodyRecursos.innerHTML = "";

  recursos.forEach(rec => {
    const fila = document.createElement("tr");

    const tdTitulo      = document.createElement("td");
    const tdTipo        = document.createElement("td");
    const tdPueblo      = document.createElement("td");
    const tdComunidad   = document.createElement("td");
    const tdValidado    = document.createElement("td");
    const tdAcciones    = document.createElement("td");

    tdTitulo.textContent    = rec.titulo;
    tdTipo.textContent      = rec.tipoRecurso;
    tdPueblo.textContent    = rec.pueblo;
    tdComunidad.textContent = rec.comunidad;
    tdValidado.textContent  = rec.validadoCulturalmente ? "Sí" : "No";

    // ---- BOTÓN VER DETALLE (TODOS) ----
    const btnVer = document.createElement("button");
    btnVer.className = "btn btn-info btn-sm me-2";
    btnVer.textContent = "Ver detalle";
    btnVer.onclick = () => verDetalleRecurso(rec);
    tdAcciones.appendChild(btnVer);

    // ---- BOTONES SOLO PARA ADMIN/LÍDER ----
    if (puedeGestionar) {
      const btnEditar = document.createElement("button");
      btnEditar.className = "btn btn-warning btn-sm me-2";
      btnEditar.textContent = "Editar";
      btnEditar.onclick = () => {
        localStorage.setItem("recursoEnEdicionLenguas", JSON.stringify(rec));
        window.location.href = "recursos.html";
      };

      const btnEliminar = document.createElement("button");
      btnEliminar.className = "btn btn-danger btn-sm";
      btnEliminar.textContent = "Eliminar";
      btnEliminar.onclick = () => eliminarRecurso(rec._id);

      tdAcciones.appendChild(btnEditar);
      tdAcciones.appendChild(btnEliminar);
    }

    fila.appendChild(tdTitulo);
    fila.appendChild(tdTipo);
    fila.appendChild(tdPueblo);
    fila.appendChild(tdComunidad);
    fila.appendChild(tdValidado);
    fila.appendChild(tdAcciones);

    tbodyRecursos.appendChild(fila);
  });
}

// ================== DETALLE ==================
function verDetalleRecurso(rec) {
  Swal.fire({
    title: rec.titulo,
    html: `
      <p><strong>Tipo:</strong> ${rec.tipoRecurso}</p>
      <p><strong>Pueblo:</strong> ${rec.pueblo}</p>
      <p><strong>Comunidad:</strong> ${rec.comunidad}</p>
      <p><strong>Validado:</strong> ${rec.validadoCulturalmente ? "Sí" : "No"}</p>
      <p><strong>Descripción:</strong> ${rec.descripcion}</p>
      <p><strong>URL:</strong> <a href="${rec.url}" target="_blank">${rec.url}</a></p>
    `,
    icon: "info"
  });
}

// ================== FILTROS ==================
function aplicarFiltros() {
  const fPueblo = inputFiltroPueblo.value.toLowerCase();
  const fTipo   = selectFiltroTipo.value;

  const filtrados = listaRecursos.filter(r =>
    (!fPueblo || r.pueblo.toLowerCase().includes(fPueblo)) &&
    (!fTipo   || r.tipoRecurso === fTipo)
  );

  mostrarRecursos(filtrados);
  actualizarResumenPueblos(filtrados);
}

inputFiltroPueblo.addEventListener("input", aplicarFiltros);
selectFiltroTipo.addEventListener("change", aplicarFiltros);

// ================== RESUMEN ==================
function actualizarResumenPueblos(recursos) {
  const conteo = {};
  recursos.forEach(r => {
    conteo[r.pueblo] = (conteo[r.pueblo] || 0) + 1;
  });

  divResumenPueblos.innerHTML = Object.entries(conteo)
    .map(([pueblo, total]) => `<p>${pueblo}: ${total} recurso(s)</p>`)
    .join("");
}

// ================== INICIO ==================
cargarRecursos();