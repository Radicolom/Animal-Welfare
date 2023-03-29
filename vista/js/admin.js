$(function(){


    listarDatos()

    function listarDatos(){
    //   const objBotones = '';
    //   const contador = 0;
        var objData = new FormData();
    //   const lista = listaCategoria;

    //   if (lista != 0){
    //     objData.append("listaProductoCategoria",lista);
    //   }else{
        objData.append("listarDatos","ok");
    //   }
        $.ajax({
            url: "control/adminControl.php",
            type: "post",
            dataType: "json",
            data: objData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(respuesta){
            console.log(respuesta)
        
        //   dataSet = [];
  
        //   if(respuesta != null){
  
        //     respuesta.forEach(ListarProducto);
    
        //       function ListarProducto(item,index){
                            
        //         objBotones = '';
        //         objBotones += '<div class="btn-group">';
        //         objBotones += '<button id="btnEditarProducto" type="button" class="btn btn-warning" idProducto="' + item.idProducto + '"nombre="' + item.nombre + '"producto_Id_Categoria="' + item.producto_Id_Categoria + '">Editar</button>';
        //         objBotones += '<button id="btnEliminarProducto" type="button" class="btn btn-danger" idProducto="' + item.idProducto + '">Eliminar</button>';
        //         objBotones += '</div>';
        //         contador += 1;
  
        //         dataSet.push([contador, item.nombre, objBotones]);             
        //       }
                
        //     cargarTablaProductos(dataSet);
        //   }
       });
    }
  
    // function cargarTablaProductos(dataSet){
    //   if(objTablaProducto != null){
    //     $("#tablaProducto").dataTable().fnDestroy();
    //   }
  
    //   objTablaProducto = $("#tablaProducto").DataTable({
    //     data:dataSet
    //   })
    // }













});