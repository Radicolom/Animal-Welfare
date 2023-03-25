$(function(){

    listarBusquedaAnimal();
        // ENVIAR CORREO
        document.getElementById("enviar-correo").addEventListener("click", function() {
            // Redirigir a la página de envío de correos
            window.location.href = "https://mail.google.com/mail/u/2/#inbox?compose=new";
        });
        //ENVIAR WHATSAPP
        document.getElementById("whatsApp").addEventListener("click", function(){
            window.location.href = "https://web.whatsapp.com/";
        });

    function listarBusquedaAnimal(){
        document.getElementById("listaBusqueda").innerHTML = "";
        document.getElementById("listaBusquedaAnimalEspecie").innerHTML = "";
        document.getElementById("listaBusquedaAnimalRaza").innerHTML = "";
        var objData =new FormData();
        objData.append("listarBusquedaAnimal","ok");
        $.ajax({
        url: "control/animalControl.php",
        type: "post",
        dataType: "json",
        data: objData,
        cache: false,
        contentType: false,
        processData: false
        }).done(function(respuesta){
            const busquedaFiltroEspecie = respuesta.filter(item => item.nombreEspecie !== null);
            const registroFiltroRaza = respuesta.filter(item => item.nombreRaza !== null);
            const busqueda = document.getElementById('listaBusqueda');
            busqueda.innerHTML += '<option idTd="1" value="1">Todos</option>';
            busquedaFiltroEspecie.forEach(ListarBusquedaEs);
            function ListarBusquedaEs(item,index){
                busqueda.innerHTML += `<option idEspecie="${item.idEspecie}" value="${item.nombreEspecie}">${item.nombreEspecie}</option>`;
                const busquedaSelec = document.getElementById('listaBusquedaAnimalEspecie');
                busquedaSelec.innerHTML += `<a class="dropdown-item" id="selecCionarBusquedaEspecie" value="${item.idEspecie}">${item.nombreEspecie}</a>`;
            }
            registroFiltroRaza.forEach(ListarBusquedaRaz);
            function ListarBusquedaRaz(item,index){
                busqueda.innerHTML += `<option idRaza="${item.idRaza}" value="${item.nombreRaza}">${item.nombreRaza}</option>`;

                const busquedaSelec = document.getElementById('listaBusquedaAnimalRaza');
                busquedaSelec.innerHTML += `<a class="dropdown-item" id="selecCionarBusquedaRaza" refRaza="${item.idRaza}" value="${item.especie_Id_Raza}">${item.nombreRaza}</a>`;     
            } 
        })
        listarAnimal();
    }
    function listarAnimal(){        
        document.getElementById("adopcionListas").innerHTML = "";
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
            respuesta.forEach(listaAnimal);
            function listaAnimal(item, index) {          
                const listaAnimal = document.getElementById("adopcionListas");
                listaAnimal.innerHTML +=
                '<div class="col" compR="' + item.compRaz +
                '" compE="' + item.compEsp +
                '"><button id="btnAnimal" type="button" class="btn" idEspecie=' + item.idAnimal + 
                ' imagenAnimal='+ item.imagen + 
                ' nombreAnimal=' + item.nombreAnimal + 
                ' sexoAnimal=' + item.sexo + 
                ' edadAnimal="' + item.edad + 
                '" especie="' + item.especie + 
                '" raza="' + item.raza + 
                '" descripcion="' + item.descripcion + 
                '" nombreUsuario="' + item.nombre + ' ' + item.apellido + 
                '" correo=' + item.correo +
                ' tell=' + item.tell + 
                ' direccion=' + item.ciudad + '><div class="card" style="width: 200px; background-color:#ffc273;"><br><img style="width: 170px; height: 170px; margin: auto;" src="data:image/jpg;base64,' +
                item.imagen +
                '" alt="Mi foto"><div class="card-body"><h4 class="card-title">NOMBRE:</h4><h4 class="card-title">' +
                item.nombreAnimal +
                '</h4><h5>ESPECIE:</h5><h5 class="card-text">' +
                item.especie +
                '</h5></div></div></button></div>';
            }
        })
    }

    // FUNCIONES CONJUNTAS

    function filtrar(valoresColeccion, comparaTivo, atributos){
        for (let i = 0; i < valoresColeccion.children.length; i++) {   // propiedad para coleccion, cuenta los datos
            const elemento = valoresColeccion.children[i];
            if (elemento.getAttribute(atributos) !== comparaTivo) {
                elemento.style.display = "none";
            }
        }
    }
    function relistaBusqueda(){
        const busquedaSelecRaza = document.getElementById("listaBusquedaAnimalRaza");
        for (let i = 0; i < busquedaSelecRaza.children.length; i++) {   // propiedad para coleccion, cuenta los datos
            const elemento = busquedaSelecRaza.children[i];
            elemento.style.display = "block";
        }
    }
    function relistaAnimal(){
        const busquedaRaza = document.getElementById("adopcionListas");
        for (let i = 0; i < busquedaRaza.children.length; i++) {   // propiedad para coleccion, cuenta los datos
            const elemento = busquedaRaza.children[i];
            elemento.style.display = "block";
        }
    }

    // BTNS

    $("#NoFiltrar").on("click", function(){
        relistaAnimal();
        $("#btnSelecRaza").hide(200);
        $("#listaBusqueda").val("1");
    })
    $("#listaBusquedaAnimalEspecie").on("click", "#selecCionarBusquedaEspecie", function(){
        relistaAnimal();
        relistaBusqueda()
        const especieVal = $(this).attr("value"); 
        const busquedaSelecRaza = document.getElementById("listaBusquedaAnimalRaza");
        var atributos = "value";   
        filtrar(busquedaSelecRaza, especieVal, atributos);
        const busquedaRaza = document.getElementById("adopcionListas");
        atributos = "compE";
        filtrar(busquedaRaza, especieVal, atributos);
        for (let i = 0; i < busquedaSelecRaza.children.length; i++) {   // propiedad para coleccion, cuenta los datos
            const elemento = busquedaSelecRaza.children[i];
            if(elemento.getAttribute("value") === especieVal){
                $("#btnSelecRaza").fadeIn(1000);
                i = busquedaSelecRaza.children.length + 1;
            }else{
                $("#btnSelecRaza").hide(200);
            }
        }
    })
    $("#listaBusquedaAnimalRaza").on("click", "#selecCionarBusquedaRaza", function(){
        relistaAnimal()
        const razaVal = $(this).attr("refRaza");
        const busquedaRaza = document.getElementById("adopcionListas");
        const especieVal = "compR";
        filtrar(busquedaRaza, razaVal, especieVal);
    })
    $("#listaBusqueda").on("change", function(){
        relistaAnimal();
        const select = document.getElementById('listaBusqueda');
        const selectedOption = select.options[select.selectedIndex];
        const idEspecie = selectedOption.getAttribute('idespecie');
        const busquedaRaza = document.getElementById("adopcionListas");
        var atributos = "";   
        var especieVal = "";   
        if(!idEspecie){
            const idRaza = selectedOption.getAttribute('idRaza');
            if(!idRaza){
                relistaAnimal();
                return false;
            }else{
                especieVal = idRaza;
                atributos = "compR";
            }
        }else{
            especieVal = idEspecie;
            atributos = "compE";
        }
        filtrar(busquedaRaza, especieVal, atributos);
    })
    $("#adopcionListas").on("click",'#btnAnimal', function(){
        var imagenBase64 = $(this).attr("imagenAnimal");
        var imagenSrc = "data:image/png;base64," + imagenBase64;
        $("#fotoAnimal").attr("src", imagenSrc);
        var nombreUsuarioDatos = $(this).attr("nombreUsuario");
        var correoDatos = $(this).attr("correo");
        var tellDatos = $(this).attr("tell");
        var direccionDatos = $(this).attr("direccion");
        var nombreAnimalDatos = $(this).attr("nombreAnimal");
        var sexoAnimalDatos = $(this).attr("sexoAnimal");
        var edadAnimalDatos = $(this).attr("edadAnimal");
        var especieDatos = $(this).attr("especie");
        var razaDatos = $(this).attr("raza");
        var descripcionDatos = $(this).attr("descripcion");
        $("#contenedorAdopta").hide();
        $("#contenedorDatosAnimal").fadeIn(1000);
        $("#nombreAnimalDatos").val(nombreAnimalDatos);
        $("#sexoAnimalDatos").val(sexoAnimalDatos);
        $("#edadAnimalDatos").val(edadAnimalDatos);
        $("#especieDatos").val(especieDatos);
        $("#razaDatos").val(razaDatos);
        $("#descripcionDatos").val(descripcionDatos);
        $("#nombreUsuarioDatos").val(nombreUsuarioDatos);
        $("#correoUsuarioDatos").val(correoDatos);
        $("#direccionUsuarioDatos").val(direccionDatos);
        $("#telefonoUsuarioDatos").val(tellDatos);
    })
    $("#btnRegresar").on("click", function(){
        $("#contenedorDatosAnimal").hide();
        $("#contenedorAdopta").fadeIn(1000);
    }) 

})