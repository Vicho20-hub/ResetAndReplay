
/*Variables, para ocupar en validación de formulario*/
var nombre = document.getElementById("nombre");
var correo = document.getElementById("correo");
var nombre_usu = document.getElementById("nombre_usu");
var password = document.getElementById("password");
var cPassword = document.getElementById("cPassword");
var telefono = document.getElementById("telefono");
var termCond = document.getElementById('termCond');

/*constantes, para ocupar en la validacion del fromulario*/
const form = document.getElementById("form");
const listInputs =document.querySelectorAll(".form-input");


if (telefono) {
    // sugerir teclado numérico en móviles y autocompletar tel
    telefono.setAttribute('inputmode', 'numeric');
    telefono.setAttribute('autocomplete', 'tel');
  
    // limpiar cualquier carácter no numérico al escribir / pegar
    telefono.addEventListener('input', function () {
      var cleaned = this.value.replace(/\D+/g, '');
      if (this.value !== cleaned) this.value = cleaned;
    });
  }



/* al formulario completo agregamos un evento, con esto evitamos el envio y reseteo del formulario*/
form.addEventListener("submit", (e) => {
    e.preventDefault();
   

})

/*funcion validar*/
function validar(){

    /*Cada vez que presiene enviar borrare y vuelvo revisar los mensaje de error*/
    listInputs.forEach((Element) => {
        Element.lastElementChild.innerHTML = "";
        
        });

        let todoOk = true; // Variable que nos dirá si todo está correcto
   
       /* if que valida el rango de caracteres en el campo nombre */
    if(nombre.value.length < 3 || nombre.value.length > 20 || nombre.value.trim() == "" ){
       
        mostrarMensajeError("nombre","Nombre debe contener 3 a 20 caracteres");
        todoOk = false;
    }
    /* validar formato correo */
    if(correo.value.trim() === "" || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correo.value.trim())) {
    mostrarMensajeError("correo", "Correo debe tener un formato válido (usuario@dominio.com)");
    todoOk = false;
    }
    /* validar largo correo */
    if(correo.value.length > 100){
       
        mostrarMensajeError("correo","Correo NO debe ser mayor a 100 caracteres");
        todoOk = false;
    }

    /* validar largo usuario y que no sea vacio */
     if(nombre_usu.value.length < 4 || nombre_usu.value.length > 20 || nombre_usu.value.trim() =="" ){
       
        mostrarMensajeError("nombre_usu","Usario debe contener 4 a 20 caracteres");
        todoOk = false;
    }  
    
    document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const birthdate = document.getElementById('fec_nac').value;
    if (!birthdate) {
        mostrarMensajeError("fec_nac","Por favor, ingrese una fecha de nacimiento válida.");
        todoOk = false;
    }
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    if (age < 18) {
        mostrarMensajeError("fec_nac","Debes ser mayor de 18 años para registrarte.");
        todoOk = false;
    }
    });


    if(password.value.length < 8) {
        mostrarMensajeError("password","La contraseña debe contener al menos 8 caracteres");
        todoOk = false;
    }

    if(cPassword.value != password.value) {
        mostrarMensajeError("cPassword","La contraseña ingresada no coincide");
        todoOk = false;
    }

    
    if(telefono.value != "") {
        if(telefono.value.length < 8 || telefono.value.length > 12) {
            mostrarMensajeError("telefono","El telefono debe tener entre 8 y 12 numeros");
            todoOk = false;
        }
    }

    if(!termCond.checked) {
        mostrarMensajeError("termCond","Debe aceptar los terminos y condiciones");
        todoOk = false;
    }


    // Si todo está ok
    if(todoOk){
        alert("¡Se ha registrado correctamente!");
        form.reset(); // Limpia todos los campos del formulario
    }


}

/* funcion que muestra el mensaje de error en las validaciones */
function mostrarMensajeError(ClaseInput, mensaje){

        let elemeto = document.querySelector(`.${ClaseInput}`);
        elemeto.lastElementChild.innerHTML = mensaje;
        
   }

