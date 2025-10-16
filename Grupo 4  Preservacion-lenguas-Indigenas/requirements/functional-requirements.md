# Functional Requirements (Requerimientos Funcionales)

> Alcance Avance 1: definición clara, medible y verificable de lo que hará el sistema en su versión inicial.

---

## 🧩 Módulo de Usuarios y Acceso

### RF-01 — Registrar usuarios con rol
**Descripción:** El sistema debe permitir **registrar usuarios** con nombre, correo y rol.
- **Criterio de verificación:** Solo el administrador puede guardar nuevos usuarios.

### RF-02 — Roles básicos (mock)
**Descripción:** El sistema debe manejar **roles** (admin, líder, docente, público) para controlar acciones visibles en la UI.
- **Criterio de verificación:** Solo `admin` y `líder` pueden crear/editar/eliminar; `docente` y `público` solo consultan.

---

## 📚 Módulo de Banco de Recursos

### RF-03 — Registrar recurso cultural
**Descripción:** El sistema debe permitir **registrar un nuevo recurso cultural** con título, tipo y descripción.
- **Criterio de verificación:** El usuario puede guardar un recurso y verlo en el listado.

### RF-04 — Listar recursos culturales
**Descripción:** El sistema debe mostrar un **listado completo** de recursos registrados.
- **Criterio de verificación:** Se visualizan todos los recursos disponibles con su información básica.

### RF-05 — Ver detalle del recurso
**Descripción:** El sistema permite **ver información completa** y enlace del recurso.
- **Criterio de verificación:** Al seleccionar un recurso, se muestra su detalle.

### RF-06 — Filtrar recursos por pueblo
**Descripción:** El usuario puede **filtrar recursos** según el pueblo indígena.
- **Criterio de verificación:** Solo aparecen los recursos del pueblo seleccionado.

### RF-07 — Filtrar recursos por tipo
**Descripción:** El sistema debe permitir filtrar por tipo (audio, video o texto).
- **Criterio de verificación:** El listado muestra solo los recursos del tipo elegido.

### RF-08 — Editar recurso cultural
**Descripción:** El usuario con permiso puede **editar** los datos de un recurso.
- **Criterio de verificación:** Los cambios se guardan y se reflejan en la lista.

### RF-09 — Eliminar recurso cultural
**Descripción:** El sistema debe permitir **eliminar recursos**.
- **Criterio de verificación:** El recurso desaparece del listado tras confirmar la eliminación.

### RF-10 — Confirmar eliminación
**Descripción:** Antes de eliminar, el sistema muestra un **mensaje de confirmación**.
- **Criterio de verificación:** Solo se elimina si el usuario confirma.

### RF-11 — Subir archivos multimedia
**Descripción:** Los usuarios con rol “líder” pueden **cargar audios y videos** como recursos.
- **Criterio de verificación:** Los archivos se almacenan y pueden reproducirse.

### RF-12 — Contar recursos por pueblo
**Descripción:** El sistema muestra un **contador** de recursos por pueblo.
- **Criterio de verificación:** El contador cambia al agregar o eliminar recursos.

---

## 📖 Módulo de Cursos y Lecciones

### RF-13 — Crear curso
**Descripción:** El sistema debe permitir **crear cursos** con nombre y descripción.
- **Criterio de verificación:** El curso aparece en el listado de cursos.

### RF-14 — Mostrar lecciones del curso
**Descripción:** El sistema debe mostrar las **lecciones asociadas** a un curso.
- **Criterio de verificación:** Al abrir un curso, se visualizan sus lecciones.

### RF-15 — Realizar quiz
**Descripción:** El sistema debe permitir al estudiante **realizar un quiz** de tres preguntas.
- **Criterio de verificación:** El sistema muestra puntaje y respuestas correctas.

### RF-16 — Calcular resultados del quiz
**Descripción:** El sistema debe **calcular y mostrar el porcentaje de aciertos**.
- **Criterio de verificación:** Aparece el resultado con retroalimentación inmediata.

---

## 🔤 Módulo de Diccionario Digital

### RF-17 — Buscar palabra en diccionario
**Descripción:** El sistema debe permitir **buscar una palabra en español**.
- **Criterio de verificación:** Muestra la traducción si existe.

### RF-18 — Mostrar traducción
**Descripción:** El sistema debe **mostrar traducción y ejemplo de uso**.
- **Criterio de verificación:** Se visualiza correctamente en pantalla.

### RF-19 — Mensaje sin resultados
**Descripción:** Si la palabra no existe, se muestra “**No se encontraron resultados**”.
- **Criterio de verificación:** El mensaje aparece cuando no hay coincidencias.

---

## 🎉 Módulo de Eventos Culturales

### RF-20 — Listar eventos culturales
**Descripción:** El sistema debe listar los **eventos culturales** registrados.
- **Criterio de verificación:** Se muestran todos los eventos con título y fecha.

### RF-21 — Ordenar eventos por fecha
**Descripción:** El sistema debe **ordenar eventos** por fecha ascendente.
- **Criterio de verificación:** Los eventos se ordenan de los más cercanos a los más lejanos.

---