let imc = 0;
function validarFormularioImc(){
    let error = false;
    let inputPeso = document.getElementById("txtPeso");
    let inputAltura = document.getElementById("txtAltura");

    if(inputPeso.value === ''){
        error = true;
        inputPeso.classList.add('input-error');
    } else {
        inputPeso.classList.remove('input-error');
    }

    if(inputPeso.value === ''){
        error = true;
        inputAltura.classList.add('input-error');
    } else {
        inputAltura.classList.remove('input-error');
    }

    if(error == true){

    Swal.fire({
        title: "error!",
        text: "intente de nuevo!",
        icon: "warning",
    });


    }else{
        calcularImc();
    }

}
function calcularImc(){
    let peso = document.getElementById("txtPeso").value;
    let altura = document.getElementById("txtAltura").value;

    imc = peso / Math.pow(altura, 2);

    document.getElementById("txtImc").value = imc.toFixed(2);

    let clasificacion = clasificarImc();

    document.getElementById("txtClasificacion").value = clasificacion;

}
    document.getElementById("btnCalcularImc").addEventListener('click', validarFormularioImc);

function calcularImc(){
    let clasificacionImc = '';
    if(imc < 18.5){
        clasificacionImc = 'Bajo de peso';
    }else{
       if(imc >= 18.5 && imc < 24.9){
           clasificacionImc = 'Normal';
       }else{
            if(imc >= 24.9 && imc < 29.9){
                clasificacionImc = 'Sobrepeso';
            }else{
                clasificacionImc = 'Obesidad';
           }
       }
    }   

}
