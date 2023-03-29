$(function(){

    var objTablaProducto = null;

    listarDatosAnimales()

    function listarDatosAnimales(){
        document.getElementById("contenedorAnimal").innerHTML = "";

        const categoriasBuscador = document.getElementById('contenedorAnimal');
        categoriasBuscador.innerHTML += `<option value='0'>Todos los animales</option>`;

        const objData = new FormData();
        objData.append("listarDatosAnimal","ok");
        
        $.ajax({
            url: "control/adminControl.php",
            type: "post",
            dataType: "json",
            data: objData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(respuesta){
            // console.log(respuesta)  
            if(respuesta != null){
                respuesta.forEach(ListarProducto);
                function ListarProducto(item,index){

                    categoriasBuscador.innerHTML += `<option value='${item.idAnimal}'> ${item.nombreAnimal} </option>`

                }
            }
        });
    listarDatos()
    }

    function listarDatos(listaCategoria){
        const objData = new FormData();
        if(!listaCategoria || listaCategoria == 0){
            objData.append("listarDatos","ok");
        }else{
            objData.append("listarDatosUpp",listaCategoria);
        }
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
            let contador = 0;
            var dataSet = [];
  
            if(respuesta != null){

                respuesta.forEach(ListarProducto);

                function ListarProducto(item,index){
                    const imagen = "data:image/png;base64," + item.imagen;
                    const imagenSrc = '<img style="width: 100px; height: 100px; margin: auto;" src="' + imagen + '"/>'    
                    const nombre = item.nombre + " " + item.apellido;

                    // objBotones = '';
                    // objBotones += '<div class="btn-group">';
                    // objBotones += '<button id="btnEditarProducto" type="button" class="btn btn-warning" idProducto="' + item.idProducto + '"nombre="' + item.nombre + '"producto_Id_Categoria="' + item.producto_Id_Categoria + '">Editar</button>';
                    // objBotones += '<button id="btnEliminarProducto" type="button" class="btn btn-danger" idProducto="' + item.idProducto + '">Eliminar</button>';
                    // objBotones += '</div>';
                    contador += 1;

                    dataSet.push([contador, imagenSrc, item.nombreAnimal, nombre, item.documento, item.nomClaseUsuario]);             
                }
            cargarTablaProductos(dataSet);
            }
        });
    }
  
    
    function cargarTablaProductos(dataSet){
        if(objTablaProducto != null){
            $("#tablaDatosUsuarios").dataTable().fnDestroy();
        }
    
        objTablaProducto = $("#tablaDatosUsuarios").DataTable({
            data:dataSet
        });
    }

    // BTNS 

    $("#contenedorAnimal").on("change", function(){
        listaCategoria = $("#contenedorAnimal").val();
        listarDatos(listaCategoria);
    })












});