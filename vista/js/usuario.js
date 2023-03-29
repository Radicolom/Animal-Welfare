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

    $("#cerrarSecionBtn").on("click",function(){
        window.usuario_Salir(); //traer funcion de main 
    })

    $("#editarUsuario").on("click",function(){
        $('.form-control').removeAttr('disabled');
    })
})