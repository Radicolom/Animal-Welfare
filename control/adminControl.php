<?php

include_once "../modelo/adminControlModelo.php";
include_once "../modelo/animalControlModelo.php";

$maxLifetime = 1800;

ini_set('session.gc_maxlifetime', $maxLifetime);

session_start();

class ctrUsuarios{
    public function ctrListarDatosAnimalUsuarios(){
        $objRespuesta=mdlDatosTodo::mdlListarDatosUsuarios();
        $respuesta = array();
        foreach ($objRespuesta as $animal) {
            $imagen = base64_encode($animal['imagenAnimal']);
            $respuesta[] = array(
                'imagen' => $imagen,
                'nombreAnimal' => $animal['nombreAnimal'], 
                'nombre' => $animal['nombre'],  
                'apellido' => $animal['apellido'], 
                'documento' => $animal['documento'], 
                'nomClaseUsuario' => $animal['nomClaseUsuario']
            );
        }
        echo json_encode($respuesta);
    }
    public function ctrListarAnimalUpp(){
        $objRespuesta=mdlDatosTodo::mdlListarDatosAnimalUpp($this->idAnimal);
        $respuesta = array();
        foreach ($objRespuesta as $animal) {
            $imagen = base64_encode($animal['imagenAnimal']);
            $respuesta[] = array(
                'imagen' => $imagen,
                'nombreAnimal' => $animal['nombreAnimal'], 
                'nombre' => $animal['nombre'],  
                'apellido' => $animal['apellido'], 
                'documento' => $animal['documento'], 
                'nomClaseUsuario' => $animal['nomClaseUsuario']
            );
        }
        echo json_encode($respuesta);
    }
    public function ctrListarDatosAnimal(){
            $objRespuesta=mdlDatosTodo::mdlListarAnimal();
            $respuesta = array();
            foreach ($objRespuesta as $animal) {
                if ($_SESSION["admin"] === "esADMIN") {
                    $imagen = base64_encode($animal['imagenAnimal']);
                    $respuesta[] = array(
                        'imagen' => $imagen,
                        'idAnimal' => $animal['idAnimal'],
                        'nombreAnimal' => $animal['nombreAnimal']
                    );
                }

            }
            echo json_encode($respuesta);
    }
    public function ctrListarDatosUsuario(){
        $objRespuesta=mdlDatosTodo::mdlListarUsuarios();
        echo json_encode($objRespuesta);
    }
    public function ctrGuardarAdoptante(){
        $objRespuesta=mdlGuardar::mdlGuardarAdoptante($this->idAnimalAdopto,$this->idUsuarioAdopto);
        echo json_encode($objRespuesta);
    }
}
if(isset($_POST["listarDatos"]) && $_POST["listarDatos"] == "ok"){
    $objRespuesta = new ctrUsuarios();
    $objRespuesta->ctrListarDatosAnimalUsuarios();
}
if(isset($_POST["listarDatosUpp"]) && $_POST["listarDatosUpp"] != ""){
    $objRespuesta = new ctrUsuarios();
    $objRespuesta-> idAnimal =  $_POST["listarDatosUpp"];
    $objRespuesta->ctrListarAnimalUpp();
}
if(isset($_POST["listarDatosAnimal"]) && $_POST["listarDatosAnimal"] == "ok"){
    $objRespuesta = new ctrUsuarios();
    $objRespuesta->ctrListarDatosAnimal();
}
if(isset($_POST["listarDatosUsuarioLista"]) && $_POST["listarDatosUsuarioLista"] == "ok"){
    $objRespuesta = new ctrUsuarios();
    $objRespuesta->ctrListarDatosUsuario();
}
if(isset($_POST["idAnimalAdopto"],$_POST["idUsuarioAdopto"])){
    $objRespuesta = new ctrUsuarios();
    $objRespuesta-> idAnimalAdopto =  $_POST["idAnimalAdopto"];
    $objRespuesta-> idUsuarioAdopto =  $_POST["idUsuarioAdopto"];
    $objRespuesta->ctrGuardarAdoptante();
}





?>
