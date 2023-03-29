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
                'nombreAnimal' => $animal['nombreAnimal'], 
                'nombre' => $animal['nombre'],  
                'apellido' => $animal['apellido'], 
                'documento' => $animal['documento'], 
                'nomClaseUsuario' => $animal['nomClaseUsuario']
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
