$(function(){  
  
    var max = 0;
    const formularioIngreso = document.getElementById("formularioIngreso");
    const formularioRes = document.getElementById("formularioRegistro"); // metodo para acceder html
    
    listarUbicacion();

    function listarUbicacion(){
        document.getElementById("listaDepartamento").innerHTML = "";
        document.getElementById("listaCiuadad").innerHTML = "";
        var objData =new FormData();
        objData.append("listarBusquedaUbicacion","ok");
        $.ajax({
        url: "control/inicioControl.php",
        type: "post",
        dataType: "json",
        data: objData,
        cache: false,
        contentType: false,
        processData: false
        }).done(function(respuesta){
            const departamento = respuesta.filter(item => item.nombreDepartamento !== null);
            departamento.forEach(listarRegistroDepartamento);
            function listarRegistroDepartamento(item,index){
                const departamentoRegistro = document.getElementById('listaDepartamento');
                departamentoRegistro.innerHTML += `<option value="${item.nombreDepartamento}">`;
            } 
            const ciudad = respuesta.filter(item => item.nombreCiudad !== null);
            ciudad.forEach(listarRegistroCiudad);
            function listarRegistroCiudad(item, index){
                const ciudadRegistro = document.getElementById('listaCiuadad');
                ciudadRegistro.innerHTML += `<option value="${item.nombreCiudad}">`;
            }
        })
    }

    function guardarUsuario(event) {
        event.preventDefault();
        const nombre = document.getElementById("nombreRegistro");
        const apellido = document.getElementById("apellidoRegistro");
        const documento = document.getElementById("documentoRegistro");
        const ciudad = document.getElementById("ciudadRegistro");
        const departamento = document.getElementById("departamentoRegistro");
        const telefono = document.getElementById("telefonoRegistro");
        const correo = document.getElementById("correoRegistro");
        const contraseña = document.getElementById("contrasenaRegistro");
        const contraseña2 = document.getElementById("contraseñaRegistro2");
        const campoSaltar = document.getElementById("campoSaltar");
        const campoSaltar2 = document.getElementById("campoSaltar2");
        const campoSaltar3 = document.getElementById("saltarTel");
        var cantidadNumeros =  $("#telefonoRegistro").val()
        cantidadNumeros = cantidadNumeros.length;
        if (documento.value == ""){
            mostrarError(documento);
        }else{
            ocultarError(documento);
        }
        if (ciudad.value == ""){
            mostrarError(ciudad);
        }else{
            ocultarError(ciudad);
        }
        if (departamento.value == ""){
            mostrarError(departamento);
        }else{
            ocultarError(departamento);
        }
        if (nombre.value === "") {
            mostrarError(nombre);
        } else {
            ocultarError(nombre);
        }
        if (apellido.value === "") {
            mostrarError(apellido);
        } else {
            ocultarError(apellido);
        }
        if (telefono.value === "") {
            mostrarError(telefono);
        } else {
            ocultarError(telefono);
        }
        if (correo.value === "") {
            mostrarError(correo);
        } else {
            ocultarError(correo);
        }
        if (contraseña.value === "") {
            mostrarError(contraseña);
        } else {
            ocultarError(contraseña);
        }
        if (contraseña2.value === "") {
            mostrarError(contraseña2);
        } else {
            ocultarError(contraseña2);
        } 
        if(cantidadNumeros === 10){
            ocultarError(campoSaltar3);
            const valido = nombre.value !== "" && apellido.value !== "" && correo.value !== "" && contraseña.value !== "" && 
            contraseña2.value!== "" && contraseña.value!== ""  && documento.value !== "" && departamento.value !== "" && ciudad.value !== "" && telefono.value !== ""; // operador lógico "O" ||, "y" &&, "mismo" ===
            const valido2 = contraseña2.value === contraseña.value;
            if(valido) {
                if(valido2){
                    guardarUsuarioValidado();
                }else{
                    mostrarError(campoSaltar);
                    mostrarError(campoSaltar2);
                }
            }
        }else{
            mostrarError(campoSaltar3);
        }
    }
        
    function guardarUsuarioValidado(){
        const nombre = $("#nombreRegistro").val();
        const apellido = $("#apellidoRegistro").val();
        const documento = $("#documentoRegistro").val();
        const correo = $("#correoRegistro").val();
        const telefono = $("#telefonoRegistro").val();
        const contrasena = $("#contrasenaRegistro").val();
        const ciudad = $("#ciudadRegistro").val();
        const departamento = $("#departamentoRegistro").val();
        var objData =new FormData();
        objData.append("nombreReg",nombre);
        objData.append("apellidoReg",apellido);
        objData.append("documentoReg",documento);
        objData.append("telefonoReg",telefono);
        objData.append("correoReg",correo);
        objData.append("contrasenaReg",contrasena);
        objData.append("ciudadReg",ciudad);
        objData.append("departamentoReg",departamento);
        $.ajax({
            url: "control/inicioControl.php",
            type: "post",
            dataType: "json",
            data: objData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(respuesta){
            if (respuesta !== "ok") {
                console.log(respuesta);
            } else {
            $("#nombreRegistro").val("");
            $("#apellidoRegistro").val("");
            $("#documentoRegistro").val("");
            $("#departamentoRegistro").val("");
            $("#ciudadRegistro").val("");
            $("#telefonoRegistro").val("");
            $("#correoRegistro").val("");
            $("#contrasenaRegistro").val("");
            $("#contraseñaRegistro2").val("");
            Swal.fire({
                icon: 'success',
                title: 'Te has registrado corectamente',
                showConfirmButton: false,
                timer: 1500
            })
            // listarAnimal();
            }
        })
    }
    function validarIngreso() {
        const Email = document.getElementById("emailIngreso");
        const Password = document.getElementById("pwdIngreso");
        if(Email.value === ""){
            mostrarError(Email);
        }else{
            ocultarError(Email);
        }
        if(Password.value === ""){
            mostrarError(Password);
        }else{
            ocultarError(Password);
        } 
    }

    function validarFormularioIngreso(event){ 
        event.preventDefault();
        var correo = $("#emailIngreso").val();
        var password = $("#pwdIngreso").val();
        var objData =new FormData();
        objData.append("correoIngreso",correo);
        objData.append("passwordIngreso",password);
        $.ajax({
            url: "control/inicioControl.php",
            type: "post",
            dataType: "json",
            data: objData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(respuesta){
            if (respuesta == ""){
                Swal.fire({
                    icon: 'error',
                    title: 'Usuario o contaseña incorrectos',
                    showConfirmButton: false,
                    timer: 2000
                })
            }else{
                window.location.href = "datosUsuario";
            }
        })
    }

    function numeros() {
        var cantidadNumeros =  $("#telefonoRegistro").val()
        cantidadNumeros = cantidadNumeros.length;
        if (cantidadNumeros > 10){
            $("#telefonoRegistro").val("")
        }
    }




    // FUNCIONES JUNTAS

    function mostrarError(elemento) {
        const error = elemento.nextElementSibling; // evento que toma el sigiente campo
        error.style.display = "inline";
    }
        
    function ocultarError(elemento) {
        const error = elemento.nextElementSibling; 
        error.style.display = "none";
    }

    function regresar_reg(){
        $("#contenedorFormularioRegistro").hide();
        $("#btnRegresar").hide();
        $("#contenedorFormularioIngreso").fadeIn(1000); 
    }

    function REGISTRARSE_BTNS(){
        $("#contenedorFormularioIngreso").hide();
        $("#btnRegresar").fadeIn(1000); 
        $("#contenedorFormularioRegistro").fadeIn(1000);
    }

    // btns Action

    $("#modalRegistroBtn").on("click", REGISTRARSE_BTNS);
    $("#btnRegresar").on("click", regresar_reg);

    formularioIngreso.addEventListener("submit", validarFormularioIngreso); // evento escucha, evento disparador
    formularioRes.addEventListener("submit", guardarUsuario); // evento escucha, evento disparador
    
    // soloNumeros.addEventListener("keypress",numeros);
    $("#telefonoRegistro").on("input", numeros);
    

    $("#emailIngreso").on("blur", validarIngreso);
    $("#pwdIngreso").on("input", validarIngreso);

    fotosUsuario();

    function fotosUsuario(){

        document.getElementById("contenedorFormulariosUsuariosFotos").innerHTML = "";

        var objData =new FormData();
        objData.append("listarAnimal","ok");
        $.ajax({
            url: "control/animalControl.php",
            type: "post",
            dataType: "json",
            data: objData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(respuesta){
            var cont = 0;
            respuesta.forEach(listaAnimal);
            function listaAnimal(item, index) {     
                const FotosFormulario = document.getElementById("contenedorFormulariosUsuariosFotos");
                if(cont<1){
                    cont ++ ;
                    FotosFormulario.innerHTML +=
                    '<div class="carousel-item active"><img style="width: 100px; height: 300px; margin: auto;" src="data:image/jpg;base64,' +
                    item.imagen +
                    '" alt="' + item.nombre + '" class="d-block w-100 rounded-circle img-thumbnail"></div>';
                }else{
                    FotosFormulario.innerHTML +=
                    '<div class="carousel-item"><img style="width: 100px; height: 300px; margin: auto;" src="data:image/jpg;base64,' +
                    item.imagen +
                    '" alt="' + item.nombre + '" class="d-block w-100 rounded-circle img-thumbnail"></div>';
                }  
            }
        })
    }


    
})

