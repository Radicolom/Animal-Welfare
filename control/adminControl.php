<?php

include_once "../modelo/adminControlModelo.php";
include_once "../modelo/animalControlModelo.php";

$maxLifetime = 1800;

ini_set('session.gc_maxlifetime', $maxLifetime);

session_start();

class ctrUsuarios{

    public function ctrListarDatosUsuarios(){
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
    public function listarAnimalUpp(){
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
    public function listarDatosAnimal(){
            $objRespuesta=mdlAnimal::mdlListarAnimalUsuario();
            $respuesta = array();
            foreach ($objRespuesta as $animal) {
                if ($_SESSION["admin"] === "esADMIN") {
                    $imagen = base64_encode($animal['imagenAnimal']);
                    $respuesta[] = array(
                        'imagen' => $imagen,
                        'idAnimal' => $animal['idAnimal'],
                        'nombreAnimal' => $animal['nombreAnimal'],
                        'sexo' => $animal['sexo'],
                        'edad' => $animal['edad'],
                        'especie' => $animal['nombreEspecie'],
                        'raza' => $animal['nombreRaza'],
                        'ciudad' => $animal['nombreCiudad'],
                        'departamento' => $animal['nombreDepartamento'],
                        'descripcion' => $animal['descripcion']
                    );
                }

            }
            echo json_encode($respuesta);
    }
}

if(isset($_POST["listarDatos"]) && $_POST["listarDatos"] == "ok"){
    $objRespuesta = new ctrUsuarios();
    $objRespuesta->ctrListarDatosUsuarios();
}

if(isset($_POST["listarDatosUpp"]) && $_POST["listarDatosUpp"] != ""){
    $objRespuesta = new ctrUsuarios();
    $objRespuesta-> idAnimal =  $_POST["listarDatosUpp"];
    $objRespuesta->listarAnimalUpp();
}

if(isset($_POST["listarDatosAnimal"]) && $_POST["listarDatosAnimal"] == "ok"){
    $objRespuesta = new ctrUsuarios();
    $objRespuesta->listarDatosAnimal();
}







?>
