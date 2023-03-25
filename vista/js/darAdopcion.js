$(function(){
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
            if(respuesta === false){
                Swal.fire({
                    title: 'Para dar en adopcion a tu mascota debes estar registrado',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonColor: "#5c340bb6",
                    confirmButtonText: 'Ok 🏡'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "iniciarSes";
                    }
                })
            }else{
                usuarioReg();
            }
        })
    }
    function usuarioReg(){
        var objData =new FormData();
        objData.append("usarioCua","ok");
        $.ajax({
        url: "control/inicioControl.php",
        type: "post",
        dataType: "json",
        data: objData,
        cache: false,
        contentType: false,
        processData: false
        }).done(function(respuesta){
          $("#btnRegistrarAnimal").val(respuesta);
        })
        listarTiempo();
        listarSexo();
        listaRagistrosRazEs();
        actualizarAnimal();
    }
    function listarSexo(){
        document.getElementById("selectSexo").innerHTML = "";
        const busquedaSex = document.getElementById('selectSexo');
        busquedaSex.innerHTML += `<option value="0" disabled>Seleccione el sexo</option>`;
        busquedaSex.innerHTML += `<option value="1">Hembra</option>`;
        busquedaSex.innerHTML += `<option value="2">Macho</option>`;
    }
    function listarTiempo(){
        document.getElementById("selectTiempo").innerHTML = "";
        const busquedaTiempo = document.getElementById('selectTiempo');
        busquedaTiempo.innerHTML += `<option value="1">Dias</option>`;   
        busquedaTiempo.innerHTML += `<option value="2">Meses</option>`;   
        busquedaTiempo.innerHTML += `<option value="3">Años</option>`;   
        listarEdadAnimal();
    }
    function listarEdadAnimal(valorComparar){
        var edad = 32;
        document.getElementById("selectEdadAnimal").innerHTML = "";
        if(valorComparar == 3){
            edad = 21;
        }else{
            if(valorComparar == 2){
                edad = 13;
            }
        }
        for (let i = 1; i < edad; i++) {   // propiedad para coleccion, cuenta los datos
            busquedaTiempo = document.getElementById('selectEdadAnimal');    
            busquedaTiempo.innerHTML += `<option value="${[i]}">${[i]}</option>`;
        }
    }
    function listaRagistrosRazEs(){
        document.getElementById("listaRegistroEspecie").innerHTML = "";
        document.getElementById("listaRegistroRaza").innerHTML = "";
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
            var busquedaFiltro = respuesta.filter(item => item.nombreEspecie !== null);
            var registroFiltro = respuesta.filter(item => item.nombreRaza !== null);
            busquedaFiltro.forEach(ListarBusqueda);
            function ListarBusqueda(item,index){
                const datosEspecieAnimal = document.getElementById('listaRegistroEspecie');
                datosEspecieAnimal.innerHTML += `<option value="${item.nombreEspecie}">`;
            } 
            registroFiltro.forEach(listarRegistross);
            function listarRegistross(item,index){
                const datosRazaAnimal = document.getElementById('listaRegistroRaza');
                datosRazaAnimal.innerHTML += `<option value="${item.nombreRaza}">`;      
            } 
        })
    }
    function actualizarAnimal(){
        var objData =new FormData();
        objData.append("listarAnimalUpp","ok");
        $.ajax({
            url: "control/animalControl.php",
            type: "post",
            dataType: "json",
            data: objData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(respuesta){
            document.getElementById("darAdopcionListas").innerHTML = "";
            respuesta.forEach(listaAnimal);
            function listaAnimal(item, index) {                                
                const FotosDarAdopcion = document.getElementById("darAdopcionListas");
                FotosDarAdopcion.innerHTML +=
                '<div class="col"><button id="btnDarAnimal" type="button" class="btn" idEspecie=' + item.idAnimal + 
                ' imagenAnimal='+ item.imagen + 
                ' nombreAnimal=' + item.nombreAnimal + 
                ' sexoAnimal=' + item.sexo + 
                ' edadAnimal="' + item.edad + 
                '" especie="' + item.especie + 
                '" raza="' + item.raza + 
                '" ciudad="' + item.ciudad + 
                '" departamento="' + item.departamento + 
                '" descripcion="' + item.descripcion + 
                '"><div class="card" style="width: 150px; background-color:#ffc273;"><br><img style="width: 100px; height: 100px; margin: auto;" src="data:image/jpg;base64,' +
                item.imagen +
                '" alt="Mi foto"><div class="card-body"><h4 class="card-title">NOMBRE:</h4><h4 class="card-title">' +
                item.nombreAnimal +
                '</h4></div></div></button></div>';
            }
        })
    }

    //GUARDAR DATOS ANIMAL

    $(document).ready(function() {
        $('#imagenAnimal').on('change', function() {
            var imagenAnimal = this.files[0];
            if (imagenAnimal.type !== "image/jpeg") {
                Swal.fire({
                    icon: 'warning',
                    title: 'El formato de la imagen debe ser JPEG.',
                    showConfirmButton: false,
                    timer: 2500
                })
                $("#preview").hide();
                $("#imagenAnimal").val("");
                return;
            }else{
                if (imagenAnimal.size > 65535) { 
                    Swal.fire({
                        icon: 'warning',
                        title: 'El archivo seleccionado es demasiado grande, debe ser menor a 65 KB.',
                        showConfirmButton: false,
                        timer: 2500
                    })
                    $("#preview").hide();
                    $("#imagenAnimal").val("");
                    return;
                }else{  
                    var urlImagen = URL.createObjectURL(imagenAnimal);
                    $('#preview').attr('src', urlImagen).show();
                }
            }
        })
    })

    function guardarAnimal(){
        const idPertenese = $("#btnRegistrarAnimal").val();
        const nombreRegistro = $("#nombreAnimal").val();
        const imagenAnimalRegistro = $("#imagenAnimal")[0].files[0];
        const sexoRegistro = $("#selectSexo option:selected").text();;
        const edadRegistro = $("#selectEdadAnimal").val() + " " + $("#selectTiempo option:selected").text();
        const especieRegistro = $("#especieRegistro").val();
        const razaRegistro = $("#razaRegistro").val();
        const descripcionRegistro = $("#descripcionRegistrar").val();
        var objData =new FormData();
        objData.append("idPertenese",idPertenese);
        objData.append("nombreAnimal",nombreRegistro);
        objData.append("imagenAnimal",imagenAnimalRegistro);
        objData.append("SexoAnimal",sexoRegistro);
        objData.append("EdadAnimal",edadRegistro);
        objData.append("especieRegistro",especieRegistro);
        objData.append("razaRegistro",razaRegistro);
        objData.append("descripcionRegistro",descripcionRegistro);
        $.ajax({
            url: "control/animalControl.php",
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

            $('#preview').hide();
            $("#nombreAnimal").val("");
            $("#imagenAnimal").val("");
            $("#selectSexo").val("");
            $("#selectEdadAnimal").val("");
            $("#selectTiempo").val("");
            $("#especieRegistro").val("");
            $("#razaRegistro").val("");
            $("#descripcionRegistrar").val("");
        
            Swal.fire({
                icon: 'success',
                title: 'Tu trabajo ha sido guardado',
                showConfirmButton: false,
                timer: 1500
            })
            actualizarAnimal()
            }
        })
    }

    // BTNS
    
    $("#btnRegistrarAnimal").on("click", guardarAnimal)
    $("#selectTiempo").on("change", function(){
        const compararEdadAnimal = $("#selectTiempo").val();
        listarEdadAnimal(compararEdadAnimal);
    })
    $("#btnRegresar").on("click", function(){
        $("#contenedorDatosDarAdopcionAnimal").hide();
        $("#contenedorDarAdopcion").fadeIn(1000);
    })
    $("#darAdopcionListas").on("click",'#btnDarAnimal', function(){
        
        var idEspecie = $(this).attr("idEspecie");

        var imagenBase64 = $(this).attr("imagenAnimal");
        var imagenSrc = "data:image/png;base64," + imagenBase64;
        $("#fotoActualizarAnimal").attr("src", imagenSrc);
        var nombreAnimalDatos = $(this).attr("nombreAnimal");
        var sexoAnimalDatos = $(this).attr("sexoAnimal");
        var edadAnimalDatos = $(this).attr("edadAnimal");
        var especieDatos = $(this).attr("especie");
        var razaDatos = $(this).attr("raza");
        var ciudadDatos = $(this).attr("ciudad");
        var departamentoDatos = $(this).attr("departamento");
        var descripcionDatos = $(this).attr("descripcion");
        $("#contenedorDarAdopcion").hide();
        $("#contenedorDatosDarAdopcionAnimal").fadeIn(1000);

        $("#pdfbt").val(idEspecie); //PENDIENTE ID DEL USUARIO INSERCION
        $("#datoNombreAnimal").val(nombreAnimalDatos);
        $("#datoSexoAnimal").val(sexoAnimalDatos);
        $("#datoEdadAnimal").val(edadAnimalDatos);
        $("#datoEspecieAnimal").val(especieDatos);
        $("#datoRazaAnimal").val(razaDatos);
        $("#datoDepartamentoAnimal").val(departamentoDatos);
        $("#datoCiudadAnimal").val(ciudadDatos);
        $("#datoDescripciónAnimal").val(descripcionDatos);

    })
    
    $("#pdfbt").on("click", function(){
        const idPertenese = $("#pdfbt").val();        
        var objData =new FormData();
        objData.append("nesDatosArchivo",idPertenese);
        $.ajax({
            url: "control/animalControl.php",
            type: "post",
            dataType: "json",
            data: objData,
            cache: false,
            contentType: false,
            processData: false
        }).done(function(respuesta){
            console.log(respuesta)
            var doc = new jsPDF({
                orientation: "portrait", // Orientación vertical
                unit: "in", // Unidades en pulgadas
                format: [8.5, 11], // Tamaño de página carta
            });
            respuesta.forEach(listaAnimal);
            function listaAnimal(item, index) {

                
                doc.text("Animal Welfare", 0.5, 1, { lineHeight: 1.5 }); // Dibuja el primer texto en la posición (0.5, 0.5)
                doc.setFontSize(12); // Establece un tamaño de fuente mayor para el segundo texto
                doc.text("Hola yo " + item.nombre + " " + item.apellido + "", 0.5, 2.5, { lineHeight: 0.5 }); // Dibuja el segundo texto en la posición (0.5, 1.5)
                doc.text("Hola yo " + item.nombreCiudad + " " + item.celular + "", 0.5, 2.7, { lineHeight: 0.5 });
                doc.text("ACEPTO QOE " + item.nombre + " " + item.apellido + "", 0.5, 2.9, { lineHeight: 0.5 }); // Dibuja el segundo texto en la posición (0.5, 1.5)
                // var imgData ="/vista/img/icono.png";
                // doc.addImage(imgData, "PNG", 10, 10, 50, 50, "", "", 0);
                
            }
            
            var blob = new Blob([doc.output()], {type: 'application/pdf'});
            var urlArchivo = window.URL.createObjectURL(blob);
            window.open(urlArchivo, '_blank');

            
            
        })


        // function cal(){
        //     return Math.round( Math.random()*(10-0)+0);
        // }
        // var alumnos = ["Juan","pedro","matias"];

        
        // doc.line(10,10,180,10);

        // alumnos.forEach(alumno => {
        //     doc.addPage("a4","p");
            
        //     var calificacion =cal();

        //     doc.text(alumno+" Calificación: "+calificacion.toString(),10,10)
        //     // var imgData ="data:image/png;base64,";
        //     // doc.addImage(imgData, 140, 10, 60, 30);
        // });

       
        // doc.save("a4.pdf");

        

    })
    
})