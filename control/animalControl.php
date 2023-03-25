<?php
include_once "../modelo/animalControlModelo.php";

$maxLifetime = 1800;

ini_set('session.gc_maxlifetime', $maxLifetime);

session_start();

class ctrAnimal{

    public $objRespuesta;

    public function ctrListarBusquedaAnimal(){
        $objRespuesta=mdlAnimal::mdlListarBusquedaAnimal();
        echo json_encode($objRespuesta);
    }
    public function ctrListarAnimal(){
        $objRespuesta=mdlAnimal::mdlListarAnimal();
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
if(isset($_POST["listarBusquedaAnimal"]) && $_POST["listarBusquedaAnimal"] == "ok"){
    $objAnimal = new ctrAnimal();
    $objAnimal->ctrListarBusquedaAnimal();
}
if(isset($_POST["listarAnimal"]) && $_POST["listarAnimal"] == "ok"){
    $objAnimal = new ctrAnimal();
    $objAnimal->ctrListarAnimal();
}

class ctrGuardarDatosAnimal{

    public $objRespuesta;

    public function ctrGuardarAnimal(){
        $objRespuesta=mdlGuardarAnimal::mdlGuardarAnimal($this->animalIdUsuario,$this->nombreAnimal, $this->imagenAnimal, $this->SexoAnimal, $this->EdadAnimal, $this->especieRegistro, $this->razaRegistro, $this->descripcionRegistro);
        // $this->ctrGuardarDatosDoc();
        echo json_encode($objRespuesta);
    }
    public function ctrGuardarDatosDoc(){
        $objRespuesta=mdlGuardarAnimal::mdlGuardarDatosDoc();
    }

    public function listarAnimalUpp(){
        if($_SESSION["iniciadoSesion"] !== false){
            $objRespuesta=mdlAnimal::mdlListarAnimal();
            $respuesta = array();
            foreach ($objRespuesta as $animal) {
                if ($animal['usuario_Id_Formato'] == $_SESSION["usuarioCom"]) {
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
                        'descripcion' => $animal['descripcion'],
                    );
                }

            }
            echo json_encode($respuesta);
        }
    }
}
if(isset($_POST["listarAnimalUpp"]) && $_POST["listarAnimalUpp"] == "ok"){
    $objAnimal = new ctrGuardarDatosAnimal();
    $objAnimal->listarAnimalUpp();
}
if(isset($_POST["idPertenese"],$_POST["nombreAnimal"],$_FILES["imagenAnimal"],$_POST["SexoAnimal"],$_POST["EdadAnimal"],$_POST["especieRegistro"],$_POST["razaRegistro"],$_POST["descripcionRegistro"])){
    $objRespuesta = new ctrGuardarDatosAnimal();
    $objRespuesta->animalIdUsuario = $_POST["idPertenese"];
    $objRespuesta->nombreAnimal = $_POST["nombreAnimal"];
    $objRespuesta->imagenAnimal = file_get_contents($_FILES["imagenAnimal"]['tmp_name']);
    $objRespuesta->SexoAnimal = $_POST["SexoAnimal"];
    $objRespuesta->EdadAnimal = $_POST["EdadAnimal"];
    $objRespuesta->especieRegistro = $_POST["especieRegistro"];
    $objRespuesta->razaRegistro = $_POST["razaRegistro"];
    $objRespuesta->descripcionRegistro = $_POST["descripcionRegistro"];
    $objRespuesta->ctrGuardarAnimal();
}

class ctrDatosAnimal{

    public $objRespuesta;

    public function ctrDatos(){
        $objRespuesta=mdlDatosAnimal::mdlLDatosArchivo($this->nesDatosArchivo);
        echo json_encode($objRespuesta);
    }

}

if(isset($_POST["nesDatosArchivo"]) && $_POST["nesDatosArchivo"] != ""){
    $objAnimal = new ctrDatosAnimal();
    $objAnimal->nesDatosArchivo = $_POST["nesDatosArchivo"];
    $objAnimal->ctrDatos();
}



?>
