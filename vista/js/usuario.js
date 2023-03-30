$(function(){

    primerIngress();
    darDatos()

    function primerIngress(){
        var objData =new FormData();
        objData.append("primerIni","ok");
        $.ajax({
            url: "control/inicioControl.php",
            type: "post",
            dataType: "json",
            data: objData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(respuesta){
            console.log(respuesta)
            if(respuesta === "ok") {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })       
                Toast.fire({
                icon: 'success',
                title: 'Ha iniciado sesión correctamente'
                })
            } 
        })
    }

    function darDatos(){
        var objData =new FormData();
        objData.append("datosUsuario","ok");
        $.ajax({
            url: "control/inicioControl.php",
            type: "post",
            dataType: "json",
            data: objData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(respuesta){
            respuesta.forEach(listaDatos);
            function listaDatos(item, index) {
                $("#nombreUsuario").val(item.nombre);
                $("#apellidoUsuario").val(item.apellido);
                $("#documentoUsuario").val(item.documento);
                $("#departamentoUsuario").val(item.nombreDepartamento);
                $("#ciudadUsuario").val(item.nombreCiudad);
                $("#telefonoUsuario").val(item.celular);
                $("#correoUsuario").val(item.correo);
                $("#pwdUsuario").val(item.contrasena);
            }
            
        })
    }

    $("#editarUsuario").on("click", function () {
        $('.form-control').removeAttr('disabled');
        $("#editarUsuario").hide();
        $("#guardarEditar").fadeIn(1);
        // $('.btn_edicion').removeAttr('id');
        // $('.btn_edicion').attr('id', 'guardarEditar');
    })

    $("#guardarEditar").on("click", function () {
        var nombre = $("#nombreUsuario").val();
        var apellido = $("#apellidoUsuario").val();
        var documento = $("#documentoUsuario").val();
        var departamento = $("#departamentoUsuario").val();
        var ciudad = $("#ciudadUsuario").val();
        var telefono = $("#telefonoUsuario").val();
        var correo = $("#correoUsuario").val();
        var contrasena = $("#pwdUsuario").val();
        var objData = new FormData();
        objData.append("actualizarNombre",nombre);
        objData.append("actualizarApellido",apellido);
        objData.append("actualizarDocumento",documento);
        objData.append("actualizarDepartamento",departamento);
        objData.append("actualizarCiudad",ciudad);
        objData.append("actualizarTelefono",telefono);
        objData.append("actualizarCorreo",correo);
        objData.append("actualizarContrasena",contrasena);
        $.ajax({
            url: "control/inicioControl.php",
            type: "post",
            dataType: "json",
            data: objData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(respuesta){
            Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Sus datos fueron actualizados correctamente',
            showConfirmButton: false,
            timer: 2500
            })
        window.location.href = "inicio";
        })
    })

    $("#cerrarSecionBtn").on("click",function(){
        window.usuario_Salir(); //traer funcion de main 
    })

    $("#editarUsuario").on("click",function(){
        $('.form-control').removeAttr('disabled');
    })
})