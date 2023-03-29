$(function(){

  var iniAnDO = false;       

  verificarInicio();

  function verificarInicio(){ 
      var objData =new FormData();
      objData.append("verificarIni","ok");
      $.ajax({
      url: "control/inicioControl.php",
      type: "post",
      dataType: "json",
      data: objData,
      cache: false,
      contentType: false,
      processData: false
      }).done(function(respuesta){
          if(respuesta !== true){
              $("#btnSelectSalir1").hide();
              $("#btnSelectIniciarSesion").fadeIn(1); 
          }else{
              $("#btnSelectIniciarSesion").hide();
              $("#btnSelectSalir1").fadeIn(1); 
              $("#btnPerfil").fadeIn(1);
              verificarAdmin()
          }
      })
  } 

  function verificarAdmin(){ 
    var objData =new FormData();
    objData.append("verificarAdmin","ok");
    $.ajax({
    url: "control/inicioControl.php",
    type: "post",
    dataType: "json",
    data: objData,
    cache: false,
    contentType: false,
    processData: false
    }).done(function(respuesta){
      if(respuesta === "fuerzaMundial456") {
        $("#btnSelecAnimales").fadeIn(1);
    }else{
      $("#btnSelecAnimales").hide();
    } 
    })
  } 

  $("#btnSelectSalir1").on("click", usuario_Salir)

  function usuario_Salir(){
      const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        
        swalWithBootstrapButtons.fire({
          title: '¿Deseas salir de tu cuenta?',
          text: "Recuerda que si sales de tu cuenta tendras que volver a ingresar!",
          icon: 'warning',
          cancelButtonText: 'Cancelar!',
          confirmButtonText: 'Salir',
          reverseButtons: true,
          showCancelButton: true

        }).then((result) => {
          if (result.isConfirmed) {
              var objData =new FormData();
              objData.append("usuarioSalir", "ok");
              $.ajax({
                  url: "control/inicioControl.php",
                  type: "post",
                  dataType: "json",
                  data: objData,
                  cache: false,
                  contentType: false,
                  processData: false
              }).done(function(respuesta){
                  if(respuesta === "ok"){
                      window.location.href = "inicio";
                  }
              })
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelado',
              'No cerraste sesion'
            )
          }
        })
  }

  window.usuario_Salir = usuario_Salir; // lanzar funcion a archivos
})