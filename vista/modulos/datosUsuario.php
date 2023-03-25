<script src='vista/js/usuario.js'></script>

<div class="col" id="contenedorDatosUsuario">
<!-- style="display: none;" -->
    <br>
    <br>
    <br>
    <br>
    <center>
        <h1>USUARIO</h1>
    </center>        
    <div class="card text-white" style="margin: auto; width: 400px; background-color:#b46743a1;">
        <div class="card-body">
            <div class="mb-3 mt-3">
                    <label for="text" class="form-label">Nombre:</label>
                    <input type="text" class="form-control" id="nombreUsuario" placeholder="Escriba su nombre" name="nombre" disabled>
                <div class="mb-3 mt-3">
                    <label for="text" class="form-label">Apellido:</label>
                    <input type="text" class="form-control" id="apellidoUsuario" placeholder="Escriba su apellido" name="nombre" disabled>
                </div>
                <div class="mb-3 mt-3">
                    <label for="number" class="form-label">Documento:</label>
                    <input type="number" class="form-control" id="documentoUsuario" maxlength="10" placeholder="Escriba su N° de documento" name="documento" disabled>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="mb-3 mt-3">
                            <label for="text" class="form-label">Departamento:</label>
                            <input type="text" list="listaDepartamento" name="browser" class="form-control" placeholder="Escriba el departamento" id="departamentoUsuario" disabled>
                            <datalist id="listaDepartamento">
                                <!-- ARCHIVO -->
                            </datalist> 
                        </div>
                    </div>
                    <div class="col">
                        <div class="mb-3 mt-3">
                            <label for="text" class="form-label">Ciuadad:</label>
                            <input type="text" list="listaCiuadad" name="browser" class="form-control" placeholder="Escriba la ciudad" id="ciudadUsuario" disabled>
                            <datalist id="listaCiuadad">
                                <!-- ARCHIVO -->
                            </datalist>
                        </div>
                    </div>
                </div>
                <div class="mb-3 mt-3">
                    <label for="number" class="form-label">Teléfono:</label>
                    <input type="number" class="form-control" id="telefonoUsuario" maxlength="10" placeholder="Escriba un número de teléfono" name="telefono" disabled>
                </div>
                <div class="mb-3 mt-3">
                    <label for="email" class="form-label">Correo:</label>
                    <input type="email" class="form-control" id="correoUsuario" placeholder="Escriba un correo" name="nombre" disabled>
                </div>
                <div class="mb-3 mt-3">
                    <label for="pwd" class="form-label">Contraseña:</label>
                    <input type="password" class="form-control" id="pwdUsuario" placeholder="Enter password" name="pswd" disabled>
                </div>
                <button  type="button" id="cerrarSecionBtn" Style="color:aliceblue;" class="btn">Cerrar sesión</button>
                <button  type="button" id="editarUsuario" Style="color:aliceblue;" class="btn">Editar</button>
            </div>
        </div>
    </div>
</div>