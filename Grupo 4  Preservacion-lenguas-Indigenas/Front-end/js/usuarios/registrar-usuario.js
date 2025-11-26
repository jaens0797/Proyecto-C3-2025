// registrar-usuario.js

// Obtener elementos del formulario
const inputNombre = document.getElementById('txtNombre');
const inputCorreo = document.getElementById('txtCorreo');
const selectRol = document.getElementById('sltRol');
const inputContrasenna = document.getElementById('txtContrasenna');
const inputConfirmacion = document.getElementById('txtConfirmacion');
const btnGuardarUsuario = document.getElementById('btnGuardarUsuario');

// Quitar clases de error
function limpiarErroresUsuario() {
    const campos = document.querySelectorAll('.inputError');
    campos.forEach(c => c.classList.remove('inputError'));
}

// Validaciones del formulario
function validarUsuario() {
    let error = false;
    limpiarErroresUsuario();

    if (!inputNombre.value.trim()) {
        inputNombre.classList.add('inputError');
        error = true;
    }

    if (!inputCorreo.value.trim()) {
        inputCorreo.classList.add('inputError');
        error = true;
    }

    if (!selectRol.value.trim()) {
        selectRol.classList.add('inputError');
        error = true;
    }

    if (!inputContrasenna.value.trim()) {
        inputContrasenna.classList.add('inputError');
        error = true;
    }

    if (inputContrasenna.value !== inputConfirmacion.value) {
        inputContrasenna.classList.add('inputError');
        inputConfirmacion.classList.add('inputError');
        error = true;
    }

    if (error) {
        Swal.fire({
            icon: 'warning',
            title: 'Datos incompletos',
            text: 'Revisá los campos marcados en rojo.'
        });
    }

    return !error;
}

// Enviar datos al backend
async function guardarUsuario() {
    if (!validarUsuario()) return;

    const datosUsuario = {
        nombre: inputNombre.value.trim(),
        correo: inputCorreo.value.trim(),
        rol: selectRol.value.trim(),
        contrasenna: inputContrasenna.value.trim()
    };

    try {
        const res = await fetch('http://localhost:3000/api/registrar-usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosUsuario)
        });

        const data = await res.json();

        if (data.error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al registrar',
                text: data.error
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Usuario registrado',
                text: 'El usuario se guardó correctamente.'
            });
            document.getElementById('formUsuario').reset();
        }

    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Error de conexión',
            text: 'No se pudo conectar con el servidor.'
        });
    }
}

// Evento del botón
btnGuardarUsuario.addEventListener('click', guardarUsuario);

