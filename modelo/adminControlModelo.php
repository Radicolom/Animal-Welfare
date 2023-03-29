<?php
include_once "../modelo/conexion.php";

class mdlDatosTodo{

    public static function mdlListarDatosUsuarios(){
        $respuesta="";
        try{
        $objRespuesta=conexion::conectar()->prepare("SELECT * FROM animal, formato, departamento, raza, especie, usuario, ciudad, claseUsuario
        WHERE raza.idRaza = animal.raza_Id_Animal
        AND especie.idEspecie = raza.especie_Id_Raza
        AND formato.usuario_Id_formato = usuario.idUsuario 
        AND usuario.ciudad_Id_usuario = ciudad.idCiudad
        AND ciudad.depertamento_Id_Ciudad = departamento.idDepartamento
        AND animal.idAnimal = formato.animal_Id_Formato
        AND claseUsuario.idClaseUsuario = formato.clase_Id_Usuario
        ORDER BY idAnimal ASC");
        $objRespuesta->execute();
        $respuesta = $objRespuesta->fetchAll(PDO::FETCH_ASSOC);
        $objRespuesta = null;

        }catch(Exception $e){
            $respuesta = $e;
        }
    return $respuesta;
    }
    public static function mdlListarDatosAnimalUpp($idAnimal){
        $respuesta="";
        try{
        $objRespuesta=conexion::conectar()->prepare("SELECT * FROM animal, formato, departamento, raza, especie, usuario, ciudad, claseUsuario
        WHERE raza.idRaza = animal.raza_Id_Animal
        AND especie.idEspecie = raza.especie_Id_Raza
        AND formato.usuario_Id_formato = usuario.idUsuario 
        AND usuario.ciudad_Id_usuario = ciudad.idCiudad
        AND ciudad.depertamento_Id_Ciudad = departamento.idDepartamento
        AND animal.idAnimal = formato.animal_Id_Formato
        AND animal.idAnimal = :idAnimal
        AND claseUsuario.idClaseUsuario = formato.clase_Id_Usuario
        ORDER BY idAnimal ASC");
        $objRespuesta->bindparam(":idAnimal",$idAnimal);
        $objRespuesta->execute();
        $respuesta = $objRespuesta->fetchAll(PDO::FETCH_ASSOC);
        $objRespuesta = null;

        }catch(Exception $e){
            $respuesta = $e;
        }
    return $respuesta;
    }
}






?>
