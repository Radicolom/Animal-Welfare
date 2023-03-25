<script src='vista/js/darAdopcion.js'></script>

<div class="mt-5 container" id="contenedorDarAdopcion">
    <br>
    <div class="mt-5 row">
        <div class="col-sm-5" id="listaDarAdopcion">
            <div class="card text-white" style="width: 400px; background-color:#b46743a1;" >
                <div class="card-body">
                    <center>
                        <img id="preview" src="#" alt="Vista previa de la foto" class="rounded-circle" style="width: 170px; height: 170px; display: none; ">
                    </center>
                    <div class="mb-3 mt-3">
                        <label for="text" class="form-label">Nombre:</label>
                        <input type="text" class="form-control" id="nombreAnimal" placeholder="Escriba el nombre" name="nombre">
                    </div>
                    <div class="mb-3 mt-3">
                        <label for="imagenAnimal" class="form-label">Foto:</label>
                        <input type="file" class="form-control" id="imagenAnimal" name="imagenAnimal" accept="image/jpeg" size="65536">
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3 mt-3">
                                <label for="text" class="form-label">Sexo:</label>
                                <select class="form-select"  id="selectSexo">
                                    <!-- ARCHIVO -->
                                </select>    
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3 mt-3">
                                <label for="text" class="form-label">Edad:</label>
                                <select class="form-select" id="selectEdadAnimal">
                                    <!-- ARCHIVO -->
                                </select>     
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3 mt-3">
                                <label for="text" class="form-label">Tiempo:</label>
                                <select class="form-select" id="selectTiempo">
                                    <!-- ARCHIVO -->
                                </select>     
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="mb-3 mt-3">
                                <label for="text" class="form-label">Especie:</label>
                                <input type="text" list="listaRegistroEspecie" name="browser" class="form-control" placeholder="Escriba la especie" id="especieRegistro">
                                <datalist id="listaRegistroEspecie">
                                    <!-- ARCHIVO -->
                                </datalist>    
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-3 mt-3">
                                <label for="text" class="form-label">Raza:</label>
                                <input type="text" list="listaRegistroRaza" name="browser" class="form-control" placeholder="Escriba la raza" id="razaRegistro">
                                <datalist id="listaRegistroRaza">
                                    <!-- ARCHIVO -->
                                </datalist>        
                            </div>
                        </div>
                    </div>
                    <label for="comment">Description:</label>
                    <textarea class="form-control" rows="5" name="text" id="descripcionRegistrar"></textarea>
                    
                    <div class="form-check mb-3">
                        <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" name="remember"> Remember me
                        </label>
                    </div>
                    <button type="button" class="btn btn-primary" id="btnRegistrarAnimal" value="0">Registrar peludito🙈</button>
                </div>
            </div>
        </div>
        <div class="col-sm-7">
            <div class="row" id="darAdopcionListas">
                <!-- ARCHIVO -->
            </div>
        </div>
    </div>
</div>

<div class="mt-5 container" id="contenedorDatosDarAdopcionAnimal" style="display: none;">
    <br>
    <div class="card text-white" style="background-color:#b46743a1;">
        <div class="mt-5 row">
            <center>
                <h1>🐶 DATOS DEL ANIMAL 🐯</h1>
            </center>
            <br>
            <div class="col">       
                <div class="card-body">
                    <center>
                        <label for="text" class="form-label">Foto:</label>
                        <br>
                        <img id="fotoActualizarAnimal" src="#" alt="Vista previa de la foto" class="rounded-circle" style="width: 170px; height: 170px;">
                    </center>
                    <div class="mb-3 mt-3">
                        <label for="imagenAnimal" class="form-label">Foto:</label>
                        <input type="file" class="form-control" id="actualizarImagenAnimal" name="imagenAnimal" accept="image/jpeg" size="65536">
                    </div>
                </div>
                <center>
                    <button id="pdfbt" type="button" class="btn-1">pdfbt</button>    
                </center>
                <center>
                    <button id="btnRegresar" type="button" class="btn-1">Regresar</button>    
                </center> 
            </div>
            <div class="col">      
                <div class="mb-3 mt-3">
                    <label for="text" class="form-label">Nombre:</label>
                    <input type="text" class="form-control" id="datoNombreAnimal" name="datoNombreAnimal" disabled>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="mb-3 mt-3">
                            <label for="text" class="form-label">Sexo:</label>
                            <input type="text" class="form-control" id="datoSexoAnimal" name="datoSexoAnimal" disabled>
                        </div>
                    </div>
                    <div class="col">
                        <div class="mb-3 mt-3">
                            <label for="text" class="form-label">Edad:</label>
                            <input type="text" class="form-control" id="datoEdadAnimal" name="datoEdadAnimal" disabled>

                            <!-- <label for="text" class="form-label">Edad:</label>
                            <select class="form-select" id="selectActualizaEdadAnimal">
                                ARCHIVO
                            </select>      -->
                        </div>
                    </div>
                    <!-- <div class="col">
                        <div class="mb-3 mt-3">
                            <label for="text" class="form-label">Tiempo:</label>
                            <select class="form-select" id="selectActualizaTiempo">
                                ARCHIVO
                            </select>     
                        </div>
                    </div> -->
                </div>
                <div class="row">
                    <div class="col">
                        <div class="mb-3 mt-3">
                            <label for="text" class="form-label">Especie:</label>
                            <input type="text" class="form-control" id="datoEspecieAnimal" name="datoEspecieAnimal" disabled>

                            <!-- <label for="text" class="form-label">Especie:</label>
                            <input type="text" list="listaActualizaEspecie" name="browser" class="form-control" placeholder="Escriba la especie" id="especieRegistro">
                            <datalist id="listaRegistroEspecie">
                                ARCHIVO
                            </datalist>     -->
                        </div>
                    </div>
                    <div class="col">
                        <div class="mb-3 mt-3">
                            <label for="text" class="form-label">Raza:</label>
                            <input type="text" class="form-control" id="datoRazaAnimal" name="datoRazaAnimal" disabled>

                            <!-- <label for="text" class="form-label">Raza:</label>
                            <input type="text" list="listaActualizaRaza" name="browser" class="form-control" placeholder="Escriba la raza" id="razaRegistro">
                            <datalist id="listaRegistroRaza">
                                ARCHIVO
                            </datalist>         -->
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="mb-3 mt-3">
                            <label for="text" class="form-label">Departamento:</label>
                            <input type="text" class="form-control" id="datoDepartamentoAnimal" name="datoDepartamentoAnimal" disabled>

                            <!-- <label for="text" class="form-label">Especie:</label>
                            <input type="text" list="listaActualizaEspecie" name="browser" class="form-control" placeholder="Escriba la especie" id="especieRegistro">
                            <datalist id="listaRegistroEspecie">
                                ARCHIVO
                            </datalist>     -->
                        </div>
                    </div>
                    <div class="col">
                        <div class="mb-3 mt-3">
                            <label for="text" class="form-label">Ciudad:</label>
                            <input type="text" class="form-control" id="datoCiudadAnimal" name="datoCiudadAnimal" disabled>

                            <!-- <label for="text" class="form-label">Raza:</label>
                            <input type="text" list="listaActualizaRaza" name="browser" class="form-control" placeholder="Escriba la raza" id="razaRegistro">
                            <datalist id="listaRegistroRaza">
                                ARCHIVO
                            </datalist>         -->
                        </div>
                    </div>
                </div>
                <label for="comment">Descripción:</label>
                <textarea class="form-control" rows="5" name="datoDescripciónAnimal" id="datoDescripciónAnimal" disabled></textarea>
            </div>
        </div>             
    </div>
</div>
