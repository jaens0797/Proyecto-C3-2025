
---

## Datos generales del proyecto
**Nombre del curso:** Introducción a la Ingeniería del Software  
**Fecha de Entrega:** 19 de Octubre de 2025
**Tipo de actividad:** Avance de proyecto  
**Integrantes del grupo:**  
- Evelyn Esquivel  
- Jaen Mora 

---
#  📘 PROYECTO: Preservación de Lenguas Indígenas – Plataforma Web
## Descripción del proyecto

Aplicación web orientada a **preservar, revitalizar y promover las lenguas y conocimientos tradicionales** de los pueblos indígenas de Costa Rica. 

La plataforma permitirá **catalogar recursos culturales** (audio, video, texto), **ofrecer cursos básicos de lenguas indígenas** con evaluaciones y **notificar eventos** culturales relevantes.  

### Usuarios principales:

- **Administrador:** gestiona comunidades y supervisa contenidos. 

- **Líder comunitario:** sube y valida recursos culturales.  

- **Docente intercultural:** crea cursos y materiales educativos.  

- **Estudiante/Público:** aprende lenguas y consulta materiales culturales. 


---

# 📘 PROYECTO: Preservación de Lenguas Indígenas – Plataforma Web

## 🧩 Convenciones de nomenclatura y formato de código

Estas son las reglas que seguiremos para mantener el código limpio y entendible:

- Usar **camelCase** para variables y funciones.  
  📌 Ejemplo: `nombreUsuario`, `crearRecurso()`
- Usar **kebab-case** para nombres de archivos o carpetas.  
  📌 Ejemplo: `user-model.js`, `eventos-controller.js`
- Agregar **comentarios** cuando el código haga algo importante.  
  📌 Ejemplo: `// Esta función guarda un nuevo recurso`
- Mantener el código ordenado, con **2 espacios de sangría**.
- Antes de entregar, revisar que el formato y los nombres sean claros.
...

## 🌿 Estrategia de ramas (branches) y commits

Para trabajar en equipo sin perder avances ni mezclar errores, usaremos esta estructura:

- **main:** código estable (lo que ya funciona).  
- **dev:**  rama de desarrollo donde trabajamos día a día.  
- **feat/nombre:** nuevas funciones (por ejemplo: `feat/cursos`).  
- **fix/nombre:** correcciones de errores (por ejemplo: `fix/error-login`).  
- **docs/nombre:** cambios en la documentación (por ejemplo: `docs/actualizar-readme`).

### 📋 Cómo trabajaremos:
1. Cada integrante crea su rama desde `dev`.  
2. Hace sus cambios y sube commits con mensajes claros.  
3. Cuando esté listo, crea un **Pull Request** para que el compañero lo revise.  
4. Después de revisar, se aprueba y se mezcla (merge) en `dev`.

💬 **Ejemplo de mensaje de commit:**
> `feat: agregar página de inicio`
...

## 🗂️ Tipos de commit:

Usaremos una guía llamada **Conventional Commits** para escribir los mensajes correctamente:

| Tipo | Para qué se usa | Ejemplo |
|------|------------------|----------|
| `feat:` | Cuando agregás una nueva funcionalidad | `feat: agregar sección de cursos` |
| `fix:` | Cuando corregís un error | `fix: corregir error en botón de eventos` |
| `docs:` | Cuando cambiás documentación | `docs: actualizar README` |
| `style:` | Cuando mejorás formato o espacios del código | `style: mejorar formato de index.html` |
| `refactor:` | Cuando reorganizás código sin cambiar lo que hace | `refactor: optimizar función de    búsqueda` |
| `chore:` | Cuando hacés tareas menores o limpiezas | `chore: eliminar archivos viejos` |

---

## 📝 Estructura de carpetas

```
/docs
   └── team-agreements.md
/requirements
   ├── functional-requirements.md
   └── non-functional-requirements.md
README.md

```