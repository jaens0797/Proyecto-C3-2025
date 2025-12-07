// js/comunidades/lista-comunidades.js

console.log("lista-comunidades.js CARGADO, API_URL =", API_URL);

// Pinta la tabla
function renderTablaComunidades(lista) {
  const tbody = document.getElementById("tbodyComunidades");
  if (!tbody) return;

  if (!lista || lista.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center text-muted">
          No hay comunidades registradas.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = lista.map(c => `
    <tr>
      <td>${c.nombre || ""}</td>
      <td>${c.pueblo || ""}</td>
      <td>${c.provincia || ""}</td>
      <td>${c.canton || ""}</td>
      <td>${c.distrito || ""}</td>
      <td>${c.estadoLengua || ""}</td>
    </tr>
  `).join("");
}

// Carga desde API
async function cargarComunidades() {
  const tbody = document.getElementById("tbodyComunidades");
  if (!tbody) return;

  tbody.innerHTML = `
    <tr>
      <td colspan="6" class="text-center text-muted">
        Cargando comunidades...
      </td>
    </tr>
  `;

  try {
    const url = `${API_URL}/listar-comunidades`;   // 👈 IMPORTANTE: COINCIDE CON comunidad.route.js
    console.log("Haciendo fetch a:", url);

    const resp = await fetch(url);
    let data;

    try {
      data = await resp.json();    // aquí esperamos un ARRAY
    } catch (e) {
      console.error("No se pudo parsear JSON de /listar-comunidades:", e);
      throw new Error("Respuesta no válida del servidor");
    }

    console.log("Respuesta /listar-comunidades =>", resp.status, data);

    if (!resp.ok) {
      Swal.fire(
        "Error",
        (data && data.mensaje) || "No se pudieron cargar las comunidades.",
        "error"
      );
      return;
    }

    const lista = Array.isArray(data) ? data : data.comunidades;
    renderTablaComunidades(lista);

  } catch (error) {
    console.error("Error cargarComunidades:", error);
    Swal.fire("Error", "No se pudo conectar con el servidor.", "error");
  }
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM listo para lista-comunidades");
  cargarComunidades();
});

