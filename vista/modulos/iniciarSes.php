<script src='vista/js/ingreso.js'></script>

<div class="mt-5 container">
    <div class="row p-5">
        <div class="col" id="contenedorFormularioIngreso">
            <center>
                <h1>LOGIN</h1>
            </center>        
            <div class="fondoFormulario2 card text-white" style="margin: auto; width: 400px;">
                <div class="card-body">
                    <form id="formularioIngreso">
                        <div class="mb-3 mt-3">
                            <label for="tex" class="form-label">Email:</label>
                            <input type="email" class="form-control" id="emailIngreso" placeholder="Enter email" required>
                            <span style="color:red; display:none;">Este campo es obligatorio.</span>
                        </div>
                        <div class="mb-3">
                            <label for="pwd" class="form-label">Contraseña:</label>
                            <input type="password" class="form-control" id="pwdIngreso" placeholder="Enter password" name="pswd">
                            <span style="color:red; display:none;">Este campo es obligatorio.</span>
                        </div>
                        <button type="submit" style="color:aliceblue;" class="btn">Ingresar</button>
                        <button  type="button" id="modalRegistroBtn" Style="color:aliceblue;" class="btn">Registrarme</button>
                    </form>
                </div>
            </div>
        </div>
        
        <div class="col">
            <br>
                <center>
                    <button id="btnRegresar" type="button" class="btn-1" style="display: none;">Regresar</button>    
                </center> 
                <br>
            <div id="carousel" class="carousel slide" data-bs-ride="carousel">
                <div id="contenedorFormulariosUsuariosFotos" class="carousel-inner">
                    <!-- ARCHIVO -->
                </div>      
            </div>          
        </div>          
        <div class="col" id="contenedorFormularioRegistro" style="display: none;">
            <center>
                <h1>REGISTRO</h1>
            </center>
            <div class="fondoFormulario2 card text-white" style="margin: auto; width: 400px; background-color:#b46743a1;" >
                <div class="card-body">
                    <form id="formularioRegistro">
                        <div class="mb-3 mt-3">
                            <label for="text" class="form-label">Nombre:</label>
                            <input type="text" class="form-control" id="nombreRegistro" placeholder="Escriba su nombre" name="nombre">
                            <span style="color:red; display:none;">Este campo es obligatorio.</span>
                        <div class="mb-3 mt-3">
                            <label for="text" class="form-label">Apellido:</label>
                            <input type="text" class="form-control" id="apellidoRegistro" placeholder="Escriba su apellido" name="apellido">
                            <span style="color:red; display:none;">Este campo es obligatorio.</span>
                        </div>
                        <div class="mb-3 mt-3">
                            <label for="number" class="form-label">Documento:</label>
                            <input type="number" class="form-control" id="documentoRegistro" maxlength="10" placeholder="Escriba su N° de documento" name="documento">
                            <span style="color:red; display:none;">Este campo es obligatorio.</span>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="mb-3 mt-3">
                                    <label for="text" class="form-label">Departamento:</label>
                                    <input type="text" list="listaDepartamento" name="browser" class="form-control" placeholder="Escriba el departamento" id="departamentoRegistro">
                                    <span style="color:red; display:none;">Este campo es obligatorio.</span>
                                    <datalist id="listaDepartamento">
                                        <!-- ARCHIVO -->
                                    </datalist> 
                                </div>
                            </div>
                            <div class="col">
                                <div class="mb-3 mt-3">
                                    <label for="text" class="form-label">Ciudad:</label>
                                    <input type="text" list="listaCiuadad" name="browser" class="form-control" placeholder="Escriba la ciudad" id="ciudadRegistro">
                                    <span style="color:red; display:none;">Este campo es obligatorio.</span>
                                    <datalist id="listaCiuadad">
                                        <!-- ARCHIVO -->
                                    </datalist>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3 mt-3">
                            <label for="number" class="form-label">Teléfono:</label>
                            <input type="number" class="form-control" id="telefonoRegistro" maxlength="10" placeholder="Escriba un número de teléfono" name="telefono">
                            <span id="saltarTel" style="color:red; display:none;">Este campo es obligatorio.</span>
                            <span style="color:red; display:none;">Pon un numero valido.</span>
                        </div>
                        <div class="mb-3 mt-3">
                            <label for="text" class="form-label">Correo:</label>
                            <input type="email" class="form-control" id="correoRegistro" placeholder="Escriba un correo" name="correo">
                            <span style="color:red; display:none;">Este campo es obligatorio.</span>
                        </div>
                        <div class="mb-3 mt-3">
                            <label for="text" class="form-label">Contraseña:</label>
                            <input type="password" class="form-control" id="contrasenaRegistro" placeholder="Escriba la contraseña" name="contraseña">
                            <span id="campoSaltar" style="color:red; display:none;">Este campo es obligatorio.</span>
                            <span style="color:red; display:none;">Las contraseñas no conciden.</span>
                        </div>
                        <div class="mb-3 mt-3">
                            <label for="text" class="form-label">Confirmar Contraseña:</label>
                            <input type="password" class="form-control" id="contraseñaRegistro2" placeholder="Escriba la contraseña" name="confirmar-contraseña">
                            <span id="campoSaltar2" style="color:red; display:none;">Este campo es obligatorio.</span>
                            <span style="color:red; display:none;">Las contraseñas no conciden.</span>
                        </div>
             
                        <button type="submit" id="BtnRegistroUsuario" class="btn btn-outline-dark">Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>