<?php

include_once "../modelo/animalControlModelo.php";

$maxLifetime = 1800;

ini_set('session.gc_maxlifetime', $maxLifetime); // Configura el tiempo máximo de vida de las sesiones

session_start();
$iniciadoSesion = false;

class ctrUsuario{
    public $objRespuesta;

    public function ctrValidarUsuario(){
        $objRespuesta = mdlUsuario::mdlValidarUsuario($this->correoUsuario,$this->passwordUsuario);
        if($objRespuesta){
            $_SESSION["iniciadoSesion"] = true;
            foreach ($objRespuesta as $respuesta) {
                $_SESSION["usuarioCom"] = $respuesta['idUsuario'];
                $_SESSION["usuarioDad"] = $respuesta;
                $_SESSION["primerInicio"] = 1;
                if ($respuesta["rol_Id_Usuario"] == 2) {
                    $_SESSION["admin"] = "esADMIN";  
                }
                break; // detener el bucle después de encontrar el primer idUsuario
            }
        }
        echo json_encode($objRespuesta);
    }

    public function ctrUbicacion(){
        $objRespuesta = mdlUsuario::mdlListarUbicacion();
        echo json_encode($objRespuesta);
    }

    public function ctrGuardarUsuario(){
        $objRespuesta = mdlUsuario::mdlGuardarUsuario($this->nombreRegistro,$this->apellidoRegistro,$this->documentoRegistro,$this->telefonoRegistro,$this->correoRegistro,$this->contrasenaRegistro,$this->ciudadRegistro,$this->departamentoRegistro);
        echo json_encode($objRespuesta);
    }

    public function ctrCerrar(){
        $_SESSION["iniciadoSesion"] = false;
        $_SESSION["admin"] = false;
        echo json_encode("ok");
    }

}

if(isset($_POST["usuarioSalir"]) && $_POST["usuarioSalir"] == "ok"){
    $objUsuario = new ctrUsuario();
    $objUsuario->ctrCerrar();
}

if(isset($_POST["listarBusquedaUbicacion"]) && $_POST["listarBusquedaUbicacion"] == "ok"){
    $objUsuario = new ctrUsuario();
    $objUsuario->ctrUbicacion();
}

if(isset($_POST["nombreReg"],$_POST["apellidoReg"],$_POST["documentoReg"],$_POST["telefonoReg"],$_POST["correoReg"],$_POST["contrasenaReg"],$_POST["ciudadReg"],$_POST["departamentoReg"])){
    $objUsuario = new ctrUsuario();
    $objUsuario->nombreRegistro = $_POST["nombreReg"];
    $objUsuario->apellidoRegistro = $_POST["apellidoReg"];
    $objUsuario->documentoRegistro = $_POST["documentoReg"];
    $objUsuario->telefonoRegistro = $_POST["telefonoReg"];
    $objUsuario->correoRegistro = $_POST["correoReg"];
    $objUsuario->contrasenaRegistro = $_POST["contrasenaReg"];
    $objUsuario->ciudadRegistro = $_POST["ciudadReg"];
    $objUsuario->departamentoRegistro = $_POST["departamentoReg"];
    $objUsuario->ctrGuardarUsuario();
}

if(isset($_POST["correoIngreso"],$_POST["passwordIngreso"])){
    $objUsuario = new ctrUsuario();
    $objUsuario->correoUsuario = $_POST["correoIngreso"];
    $objUsuario->passwordUsuario = $_POST["passwordIngreso"];
    $objUsuario->ctrValidarUsuario();
}

class ctrValidar{

    public $objRespuesta;

    public function ctrInicio(){
        $objRespuesta = $_SESSION["iniciadoSesion"];
        echo json_encode($objRespuesta);
    }

    public function ctrAdmin(){
        if($_SESSION["admin"] == "esADMIN") {
            $objRespuesta = "fuerzaMundial456";
        }
        echo json_encode($objRespuesta);
    }
    
    public function ctrDataSear(){
        if (isset($_SESSION["usuarioDad"]) && is_array($_SESSION["usuarioDad"])) {
            $objRespuesta = array($_SESSION["usuarioDad"]);
            echo json_encode($objRespuesta);
        } else {
            echo json_encode(array("error" => "No se encontraron datos de usuario"));
        }
    }

    public function ctrUsucarioCual(){
        $objRespuesta = $_SESSION["usuarioCom"];
        echo json_encode($objRespuesta);
    }

    public function ctrUsucarioIni(){
        if ($_SESSION["primerInicio"] === 1) {
            $_SESSION["primerInicio"] = 2;
            $objRespuesta="ok";
        } else {
            $objRespuesta=null;
        };
        echo json_encode($objRespuesta);
    }
}

if(isset($_POST["verificarIni"]) && $_POST["verificarIni"] == "ok"){
    $objAnimal = new ctrValidar();
    $objAnimal->ctrInicio();
}

if(isset($_POST["verificarAdmin"]) && $_POST["verificarAdmin"] == "ok"){
    $objAnimal = new ctrValidar();
    $objAnimal->ctrAdmin();
}

if(isset($_POST["datosUsuario"]) && $_POST["datosUsuario"] == "ok"){
    $objAnimal = new ctrValidar();
    $objAnimal->ctrDataSear();
}

if(isset($_POST["usarioCua"]) && $_POST["usarioCua"] == "ok"){
    $objAnimal = new ctrValidar();
    $objAnimal->ctrUsucarioCual();
}

if(isset($_POST["primerIni"]) && $_POST["primerIni"] == "ok"){
    $objAnimal = new ctrValidar();
    $objAnimal->ctrUsucarioIni();
}
?>