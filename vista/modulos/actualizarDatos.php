<script src='vista/js/admin.js'></script>

<br>
<br>
<br>
    <div class="colorest container-fluid p-5 text-white text-center">
        <div class="row">
                <div class="col">
                    <button id="btnformulario" type="button" class="btn btn-outline-light text-Secondary">Usuario adopto</button>
                </div>
            <div class="col">
                <select class="form-select form-select-lg" id="contenedorAnimal" aria-label="Disabled select example">
                    <!-- ARCHIVO -->
                </select>
            </div>
                <div class="col">
                    <!-- <button id="eliminarCategoria" type="button" class="btn btn-light">Eliminar</button> -->
                </div>
            </div>
        </div>
    </div>
    
    <div class="container sm-12">
        <div class="row">
            <div class="col-sm-12" id="tablaDatosAnimalUsuario" >
                <table class="table" id="tablaDatosUsuarios">
                    <thead class="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Animal</th>
                        <th>Nombre animal</th>
                        <th>Usuario</th>
                        <th>Documento</th>
                        <th>Tipo</th>
                    </tr>
                    </thead>
                    <tbody class="coloresfor">

                    </tbody>
                </table> 
            </div>

            <div class="coloresfor col-sm-4" id="contenedorFormularioAdopto" style="display: none;">
                <br>
                <div class="form-floating">
                    <select class="form-select form-select-lg" id="selectorAnimal" aria-label="Disabled select example">
                    <!-- Archivo -->
                    </select>
                    <label for="text">Animal</label>
                </div>

                <div class="form-floating">
                    <select class="form-select form-select-lg" id="selectorUsuario" aria-label="Disabled select example">
                    <!-- Archivo -->
                    </select>
                    <label for="text">Usuario adopto</label>
                </div>

                <div class="btn-group">
                    <button type="button" id="btnGuardarAdopto" class="btn btn-outline-success">Guardar</button>
                    <button type="button form-check-input" id="btnCancelar" class="btn btn-secondary">Cancelar</button>
                        
                </div>
            </div>
        </div>
    </div>