let inputCorreo = document.getElementById("txtCorreo");
let inputNombre = document.getElementById("txtNombre");
let inputContrasenna = document.getElementById("txtContrasenna");
let inputConfirmacion = document.getElementById("txtConfirmacion");
let inputRol = document.getElementById("txtRol");   // NUEVO
let btnGuardar = document.getElementById("btnGuardar");

let camposRequeridos = document.querySelectorAll(":required");

// ========================================================
// ROLES Y PERMISOS (RF-02)
// ========================================================
const permisos = {
    admin:   { registro: true },
    líder:   { registro: true },
    docente: { registro: false },
    público: { registro: false }
};

// ========================================================
// USUARIO ACTUAL (mock para el frontend)
// Cambia el rol aquí para probar restricciones
// ========================================================
let usuarioActual = {
    nombre: "Administrador del sistema",
    rol: "admin"   // cambiar a "líder", "docente" o "público" para probar
};

function validar(){
    let estadoValidacion = true;

    // Validar todos los campos required (incluye txtRol)
    camposRequeridos.forEach(campo => {
        if(campo.value.trim() === ""){
            estadoValidacion = false;
            campo.classList.add("inputError");
        }else{
            campo.classList.remove("inputError");  
        }
    });
    
    // Validar contraseñas
    if((inputContrasenna.value !== inputConfirmacion.value) || 
        inputContrasenna.value === "" || 
        inputConfirmacion.value === "" ){
        
        estadoValidacion = false;
        inputContrasenna.classList.add("inputError");
        inputConfirmacion.classList.add("inputError");
    }else{
        inputContrasenna.classList.remove("inputError");
        inputConfirmacion.classList.remove("inputError");
    }

    return estadoValidacion;
}

function guardar(){

    // 1) Verificar permiso según rol (RF-01 y RF-02)
    if (!permisos[usuarioActual.rol] || !permisos[usuarioActual.rol].registro) {
        Swal.fire({
            icon: "error",
            title: "Acceso denegado",
            text: "Solo un usuario con rol ADMIN o LÍDER puede registrar nuevos usuarios."
        });
        return;
    }

    // 2) Validar formulario normal
    let validacion = validar(); 

    if(validacion == true){

        // 3) Crear objeto usuario con ROL incluido
        let usuario = {
            "correo"     : inputCorreo.value.trim(),
            "nombre"     : inputNombre.value.trim(),
            "contrasenna": inputContrasenna.value,
            "rol"        : inputRol.value        // NUEVO: enviamos el rol al backend
        };

        // 4) Fetch hacia el backend
        fetch("http://localhost:3000/api/registrar-usuario",{
            method: "post",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        })
        .then(res => res.json())
        .then(data=>{
            Swal.fire({
                icon : "success",
                title: "Operación exitosa",
                text : "El usuario se guardó correctamente"
            });
            // Opcional: limpiar formulario
            // document.querySelector("form").reset();
        })
        .catch(err =>{
            Swal.fire({
                icon : "error",
                title: "Operación fallida",
                text : "El usuario no se pudo guardar, revise los campos resaltados"
            });
        });

    }
}

btnGuardar.addEventListener("click", guardar);

