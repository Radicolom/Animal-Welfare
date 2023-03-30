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
                listarTiempo();
                listarSexo();
                listaRagistrosRazEs();
                actualizarAnimal();
            }
        })
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

    function guardarAnimal(){
        const nombreRegistro = $("#nombreAnimal").val();
        const imagenAnimalRegistro = $("#imagenAnimal")[0].files[0];
        const sexoRegistro = $("#selectSexo option:selected").text();;
        const edadRegistro = $("#selectEdadAnimal").val() + " " + $("#selectTiempo option:selected").text();
        const especieRegistro = $("#especieRegistro").val();
        const razaRegistro = $("#razaRegistro").val();
        const descripcionRegistro = $("#descripcionRegistrar").val();
        var objData =new FormData();
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

            respuesta.forEach(listaAnimal);
            function listaAnimal(item, index) {
                var doc = new jsPDF({
                    orientation: "portrait",
                    unit: "in",
                    format: "letter"
                });
                doc.setFontSize(20);

                doc.addImage(item.imagen, 'JPEG', 6.5, 0.5, 1, 1);

                doc.setFont("helvetica", "bold");
                doc.text("Animal Welfare", 3, 1, { lineHeight: 1.5 });
                
                doc.setFontSize(12);
                doc.setFont("times", "normal");
                
                var parrafo1 = "Entre _" + item.nombre2 + " " + item.apellido2 +"_ (nombre del adoptante), con número de identificación __" + item.documento2 + "_ de  _" + item.nombreCiudad2 + "/" + item.nombreDepartamento2 + "_ y _" + item.nombre + " " + item.apellido +"_ (nombre de la persona que dio en adopción), con número de identificación _" + item.documento + "_ de  _" + item.nombreCiudad + "/" + item.nombreDepartamento + "_.";
                var lineas1 = doc.splitTextToSize(parrafo1, 7.5);
                doc.text(0.5, 2, lineas1, { unicode: 'UTF-8' });

                parrafo1 = "Acuerdan celebrar el siguiente contrato de adopción de una mascota:";
                lineas1 = doc.splitTextToSize(parrafo1, 7.5);
                doc.text(0.5, 3, lineas1, { unicode: 'UTF-8' });
                doc.setFontSize(13);

                parrafo1 = "Objeto del contrato";
                lineas1 = doc.splitTextToSize(parrafo1, 7.5);
                doc.text(0.5, 3.3, lineas1, { unicode: 'UTF-8' });
                doc.setFontSize(12);

                parrafo1 = "El objeto de este contrato es formalizar la adopción de la mascota identificada como _" + item.nombreEspecie + ", " + item.nombreRaza + ", " + item.nombreAnimal + "_ (especie, raza y nombre de la mascota) por parte del adoptante, quien se compromete a brindarle los cuidados necesarios para su bienestar y desarrollo.";
                lineas1 = doc.splitTextToSize(parrafo1, 7.5);
                doc.text(0.5, 3.8, lineas1, { unicode: 'UTF-8' });
                doc.setFontSize(13);
                
                parrafo1 = "Condiciones de la adopción";
                lineas1 = doc.splitTextToSize(parrafo1, 7.5);
                doc.text(0.5, 4.6, lineas1, { unicode: 'UTF-8' });
                
                doc.setFontSize(12);

                var parrafo1 = "El adoptante se compromete a cumplir con las siguientes condiciones:";
                var lineas1 = doc.splitTextToSize(parrafo1, 7.5);
                doc.text(0.5, 4.8, lineas1, { unicode: 'UTF-8' });
                
                var parrafo1 = "a) Proporcionar al animal un hogar seguro y adecuado, con suficiente espacio, agua fresca y alimentos de calidad.";
                var lineas1 = doc.splitTextToSize(parrafo1, 7.5);
                doc.text(0.5, 5.2, lineas1, { unicode: 'UTF-8' });

                var parrafo1 = "b) Brindarle atención veterinaria periódica, incluyendo vacunas, tratamientos y chequeos de salud.";
                var lineas1 = doc.splitTextToSize(parrafo1, 7.5);
                doc.text(0.5, 5.6, lineas1, { unicode: 'UTF-8' });

                var parrafo1 = "c) Mantenerlo en un ambiente limpio y libre de peligros.";
                var lineas1 = doc.splitTextToSize(parrafo1, 7.5);
                doc.text(0.5, 5.8, lineas1, { unicode: 'UTF-8' });

                var parrafo1 = "d) Proporcionarles ejercicio y estímulos adecuados a sus necesidades.";
                var lineas1 = doc.splitTextToSize(parrafo1, 7.5);
                doc.text(0.5, 6, lineas1, { unicode: 'UTF-8' });

                var parrafo1 = "e) Proporcionarle amor y cariño, y tratarlo con respeto y consideración.";
                var lineas1 = doc.splitTextToSize(parrafo1, 7.5);
                doc.text(0.5, 6.2, lineas1, { unicode: 'UTF-8' });

                var parrafo1 = "f) No utilizar al animal para fines comerciales, experimentación o actividades ilegales.";
                var lineas1 = doc.splitTextToSize(parrafo1, 7.5);
                doc.text(0.5, 6.4, lineas1, { unicode: 'UTF-8' });
                
                var parrafo1 = "g) No abandonarlo en ningún momento ni circunstancia.";
                var lineas1 = doc.splitTextToSize(parrafo1, 7.5);
                doc.text(0.5, 6.6, lineas1, { unicode: 'UTF-8' });

                doc.setFontSize(13);

                var parrafo1 = "Responsabilidades del adoptante";
                var lineas1 = doc.splitTextToSize(parrafo1, 7.5);
                doc.text(0.5, 7, lineas1, { unicode: 'UTF-8' });

                doc.setFontSize(12);

                var parrafo1 = "El adoptante se compromete a cumplir con las siguientes responsabilidades:";
                var lineas1 = doc.splitTextToSize(parrafo1, 7.5);
                doc.text(0.5, 7.2, lineas1, { unicode: 'UTF-8' });

                var parrafo1 = "a) Asumir los gastos relacionados con la alimentación, cuidados veterinarios, vacunas, medicamentos, accesorios y cualquier otra necesidad del animal.";
                var lineas1 = doc.splitTextToSize(parrafo1, 7.5);
                doc.text(0.5, 7.4, lineas1, { unicode: 'UTF-8' });

                var parrafo1 = "b) Notificar a la persona que dio la adopción de cualquier cambio en su situación personal que afecte su capacidad para cuidar al animal.";
                var lineas1 = doc.splitTextToSize(parrafo1, 7.5);
                doc.text(0.5, 7.8, lineas1, { unicode: 'UTF-8' });
                
                var parrafo1 = "c) Permitir a la persona que dio la adopción realizar visitas periódicas al hogar para comprobar las condiciones en que se encuentra el animal.";
                var lineas1 = doc.splitTextToSize(parrafo1, 7.5);
                doc.text(0.5, 8.2, lineas1, { unicode: 'UTF-8' });
                
                var parrafo1 = "d) Notificar a la persona que dio la adopción en caso de pérdida o muerte del animal.";
                var lineas1 = doc.splitTextToSize(parrafo1, 7.5);
                doc.text(0.5, 8.6, lineas1, { unicode: 'UTF-8' });
                
                doc.setFontSize(13);

                var parrafo1 = "Cesión de derechos";
                var lineas1 = doc.splitTextToSize(parrafo1, 7.5);
                doc.text(0.5, 9.1, lineas1, { unicode: 'UTF-8' });
                
                doc.setFontSize(12);

                var parrafo1 = "El adoptante acepta que a la persona que dio la adopción es la propietaria legal del animal y que tiene derecho a realizar visitas al hogar del adoptante para verificar el bienestar del animal. En caso de que el adoptante no cumpla con las condiciones y responsabilidades establecidas en este contrato, la organización o protectora de animales se reserva el derecho de retirar al animal del hogar del adoptante.";
                var lineas1 = doc.splitTextToSize(parrafo1, 7.5);
                doc.text(0.5, 9.4, lineas1, { unicode: 'UTF-8' });
                
                doc.addPage("letter","p");
                doc.setFontSize(13);

                var parrafo1 = "Duración del contrato";
                var lineas1 = doc.splitTextToSize(parrafo1, 7.5);
                doc.text(0.5, 1, lineas1, { unicode: 'UTF-8' });
                
                doc.setFontSize(12);

                var parrafo1 = "Este contrato tendrá una duración indefinida, y sólo podrá ser modificado o rescindido por acuerdo mutuo entre las partes. El adoptante se compromete a informar a la persona que dio la adopción en caso de que decida dar en adopción al animal a un tercero.";
                var lineas1 = doc.splitTextToSize(parrafo1, 7.5);
                doc.text(0.5, 1.3, lineas1, { unicode: 'UTF-8' });
                
                doc.setFontSize(13);

                var parrafo1 = "Firma de las partes";
                var lineas1 = doc.splitTextToSize(parrafo1, 7.5);
                doc.text(0.5, 3, lineas1, { unicode: 'UTF-8' });
                
                doc.setFontSize(12);

                var parrafo1 = "_________________________";
                var lineas1 = doc.splitTextToSize(parrafo1, 3.5);                
                doc.text(0.5, 5, lineas1, { unicode: 'UTF-8' });
                
                var parrafo1 = "Firma del adoptante";
                var lineas1 = doc.splitTextToSize(parrafo1, 3.5);                
                doc.text(0.5, 5.2, lineas1, { unicode: 'UTF-8' });

                var parrafo1 = "_________________________";
                var lineas1 = doc.splitTextToSize(parrafo1, 3.5);
                doc.text(4, 5, lineas1, { unicode: 'UTF-8' });

                var parrafo1 = "Firma de la persona que dio la adopción";
                var lineas1 = doc.splitTextToSize(parrafo1, 3.5);
                doc.text(4, 5.2, lineas1, { unicode: 'UTF-8' });


                var parrafo1 = "El adoptante  y la persona que dio la adopción firman este contrato como muestra de su conformidad con las condiciones y responsabilidades establecidas en el mismo.";
                var lineas1 = doc.splitTextToSize(parrafo1, 7.5);                
                doc.text(0.5, 6, lineas1, { unicode: 'UTF-8' });
                
                doc.save("Animal_welfare.pdf");
                // var nuevaUr = new Blob([doc.output()], {type: 'application/pdf'});
                // var urlArchivo = window.URL.createObjectURL(nuevaUr);
                // window.open(urlArchivo, '_blank');


            }

        })
    })

    $("#btnpdf").on("click",function(){
        window.print($("#textoInicio"));
    })
    
})