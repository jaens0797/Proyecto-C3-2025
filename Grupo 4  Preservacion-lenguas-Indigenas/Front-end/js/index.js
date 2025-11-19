let inputCorreo = document.getElementById("txtCorreo");
let inputNombre = document.getElementById("txtNombre");
let inputContrasenna = document.getElementById("txtContrasenna");
let inputConfirmacion = document.getElementById("txtConfirmacion");
let btnGuardar = document.getElementById("btnGuardar");

let camposRequeridos = document.querySelectorAll(":required");

function validar(){
    let estadoValidacion = true;

    camposRequeridos.forEach(campo => {
        if(campo.value == ""){
            estadoValidacion = false;
            campo.classList.add("inputError");
        }else{
            campo.classList.remove("inputError");  
        }
    });
    

    if((inputContrasenna.value != inputConfirmacion.value) || inputContrasenna.value == "" || inputConfirmacion.value == "" ){
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
    let validacion = validar(); 
    //Reemplazar las alertas por sweet alert
    if(validacion == true){
        let usuario = {
            "correo" : inputCorreo.value,
            "nombre" : inputNombre.value,
            "contrasenna" : inputContrasenna.value
        };

        //Fetch

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
                'icon' : "success",
                'title': "Operación exitosa",
                'text' : "El usuario se guardó correctamente"
            });
        })
        .catch(err =>{
            Swal.fire({
                'icon' : "error",
                'title': "Operación fallida",
                'text' : "El usuario no se pudo guardar, revise los campos resaltados"
            });
        })

    }
}

btnGuardar.addEventListener("click", guardar);
