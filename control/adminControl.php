<?php

include_once "../modelo/adminControlModelo.php";

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
                'compRaz' => $animal['idRaza'],  
                'compEsp' => $animal['idEspecie'], 
                'idAnimal' => $animal['idAnimal'],
                'nombreAnimal' => $animal['nombreAnimal'],
                'sexo' => $animal['sexo'],
                'edad' => $animal['edad'],
                'especie' => $animal['nombreEspecie'],
                'raza' => $animal['nombreRaza'],
                'descripcion' => $animal['descripcion'],
                'nombre' => $animal['nombre'],
                'apellido' => $animal['apellido'],
                'correo' => $animal['correo'],
                'tell' => $animal['celular'],
                'departamento' => $animal['nombreDepartamento'],
                'ciudad' => $animal['nombreCiudad']
            );
        }
        echo json_encode($respuesta);
    }
}

if(isset($_POST["listarDatos"]) && $_POST["listarDatos"] == "ok"){
    $objRespuesta = new ctrUsuarios();
    $objRespuesta->ctrListarDatosUsuarios();
}









?>
