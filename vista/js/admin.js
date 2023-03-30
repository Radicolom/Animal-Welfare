$(function(){

    var objTablaProducto = null;
    listarDatosAnimales()

    function listarDatosAnimales(){
        document.getElementById("contenedorAnimal").innerHTML = "";
        document.getElementById("selectorAnimal").innerHTML = "";
        const animalBuscador = document.getElementById('contenedorAnimal');
        animalBuscador.innerHTML += `<option value='0'>Todos los animales</option>`;
        const animalSelector = document.getElementById('selectorAnimal');
        animalSelector.innerHTML += `<option value='0' disabled>animales</option>`;
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
                    animalBuscador.innerHTML += `<option value='${item.idAnimal}'> ${item.nombreAnimal} </option>`
                    animalSelector.innerHTML += `<option value='${item.idAnimal}'> ${item.nombreAnimal} </option>`
                }
            }
        });
    listarDatos()
    listarDatosAnimal()
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
            // console.log(respuesta)
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
  
    function listarDatosAnimal(dato){
        document.getElementById("selectorUsuario").innerHTML = "";
        const usuarioSelector = document.getElementById('selectorUsuario');
        usuarioSelector.innerHTML += `<option disabled>usuarios</option>`;
        const objData = new FormData();
        objData.append("listarDatosUsuarioLista","ok");
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
                    usuarioSelector.innerHTML += `<option value='${item.idUsuario}'> ${item.nombre} ${item.apellido} </option>`
                }
            }
        });
        listarDatosUsuarios();
    }

    function listarDatosUsuarios(){
        document.getElementById("selectorUsuario").innerHTML = "";
        const usuarioSelector = document.getElementById('selectorUsuario');
        usuarioSelector.innerHTML += `<option disabled>usuarios</option>`;
        const objData = new FormData();
        objData.append("listarDatosUsuario","ok");
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
                    usuarioSelector.innerHTML += `<option value='${item.idUsuario}'> ${item.nombre} ${item.apellido} </option>`
                }
            }
        });
    }

    // FUNCION CONJUNTAS

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
        if(listaCategoria != "0"){
            $("#selectorAnimal").val(listaCategoria);
        }
        listarDatos(listaCategoria);
    })

    $("#selectorAnimal").on("change", function(){
        listaCategoria = $("#selectorAnimal").val();
        listarDatos(listaCategoria);
        listarDatosAnimal(listaCategoria);
    })

    $("#btnformulario").on("click", function(){
        $("#contenedorAnimal").val("0");
        $("#tablaDatosAnimalUsuario").removeClass('col-sm-12').addClass('col-sm-8');
        $("#tablaDatosAnimalUsuario").slideDown("slow");
        listarDatos()
        $("#contenedorFormularioAdopto").fadeIn(100);
    })

    $("#btnCancelar").on("click", function(){
        $("#contenedorFormularioAdopto").hide();
        $("#contenedorAnimal").val("0");
        $("#tablaDatosAnimalUsuario").removeClass('col-sm-8').addClass('col-sm-12');
        $("#tablaDatosAnimalUsuario").slideDown("slow");
        listarDatos()
    })

    $("#btnGuardarAdopto").on("click", function(){
        const idAnimal = $("#selectorAnimal").val();
        const idUsuario = $("#selectorUsuario").val();
        const objData = new FormData();
        objData.append("idAnimalAdopto",idAnimal);
        objData.append("idUsuarioAdopto",idUsuario);
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
            if(respuesta == "ok"){
                Swal.fire({
                    icon: 'success',
                    title: 'Se cargo correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
                listarDatos()
            }
        });

    })







});