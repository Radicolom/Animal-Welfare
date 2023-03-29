<script src='vista/js/admin.js'></script>

<br>
<br>
<br>
<br>
<br>
    <div class="container-fluid p-5 bg-dark text-white text-center">
        <div class="row">
                <div class="col">
                    <button id="btnformulario" type="button" class="btn btn-outline-light text-Secondary">Registrar</button>
                </div>
            <div class="col">
                <select class="form-select form-select-lg" id="contenedorAnimal" aria-label="Disabled select example">
                    <!-- ARCHIVO -->
                </select>
            </div>
                <div class="col">
                    <button id="eliminarCategoria" type="button" class="btn btn-light">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
    
    <div class="container sm-12">
    <div class="row">
        <div class="col-sm-4" id="contenedorFormulario" style="display: none;">

            <div class="form-floating">
                <input type="text" class="form-control" id="nombreProducto" placeholder="Ingrese el producto" name="email">
                <label for="text">Nombre Producto</label>
            </div>

            <div class="form-floating">
                <select class="form-select form-select-lg" id="selectorCategoria" aria-label="Disabled select example">
                </select>
                <label for="text">Categoria</label>
            </div>
                
            <div class="btn-group">
                <div class="btn-group" id="cajaBtnRegistrar" style="display: none;">
                    <button type="button" id="btnGuardarProducto" class="btn btn-dark">Guardar</button>
                </div>

                <div class="btn-group" id="cajaBtnActualizar" style="display: none;">
                    <button type="button form-check-input" id="btnActualizar" class="btn btn-secondary">Editar</button>
                </div>

                <button type="button form-check-input" id="btnCancelar" class="btn btn-secondary">Cancelar</button>
                    
            </div>
        </div>

        <div class="col-sm-4" id="contenedorFormularioCategoria" style="display: none;">

            <div class="form-floating">
                <input type="text" class="form-control" id="nombreClase" placeholder="Ingrese la clase" name="email">
                <label for="text">Nombre Producto</label>
            </div>
   
            <div class="btn-group">
                <button type="button" id="btnGuardarCategoria" class="btn btn-dark">Guardar</button>
                <button type="button form-check-input" id="btnCancelarCategoria" class="btn btn-secondary">Cancelar</button> 
            </div>
        </div>

        <div class="col-sm-12" id="tablaProductosCategoria" >
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
                <tbody>

                </tbody>
            </table>
        
        </div>
    </div>
    </div>