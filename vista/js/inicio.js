$(function(){
    
    ventana_Emergente();

    function ventana_Emergente(){
        Swal.fire({
            imageUrl: 'https://media.giphy.com/media/Cdkk6wFFqisTe/giphy.gif',
            imageHeight: 250,
            imageAlt: 'Foto',
            title: 'Para dar en adopcion a tu mascota debes estar registrado',
            showDenyButton: true,
            showCloseButton: true,
            // confirmButtonColor: red,
            confirmButtonText: 'Ok 🏡',
            denyButtonText: `Registrate ya`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
            } else if (result.isDenied) {
                var miBoton = document.getElementById('btnSelectSalir1');
                setTimeout(function() {// espera 1 segundo
                    if(miBoton.offsetParent === null){ // verifica si el boton salir esta oculto
                        window.location.href = "iniciarSes";
                    }else{
                        window.location.href = "datosUsuario";
                    }
                })
            }
        })
    }

    $("#btnAdoptar").on("click", function(){
        window.location.href = "adopta";
    })

    $("#btnSelectDarAdopcion2").on("click", function(){
        window.location.href = "darAdopcion";
    })

})