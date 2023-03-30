<?php
include_once "../modelo/conexion.php";
class mdlUsuario{
    public static function mdlValidarUsuario($correoUsuario,$passwordUsuario){
        $validar="";
        try{
        $objRespuesta=conexion::conectar()->prepare("SELECT * FROM usuario
        INNER JOIN ciudad ON ciudad.idCiudad = usuario.ciudad_Id_usuario
        INNER JOIN departamento ON departamento.idDepartamento = ciudad.depertamento_Id_Ciudad
        WHERE correo = :correoUsuario AND contrasena = :passwordUsuario");
        $objRespuesta->bindparam(":correoUsuario",$correoUsuario);
        $objRespuesta->bindparam(":passwordUsuario",$passwordUsuario);
        $objRespuesta->execute();
        $validar = $objRespuesta->fetchAll();
        $objRespuesta = null;
        }catch(Exception $e){
            $validar = $e;
        }
    return $validar;
    }
    public static function mdlListarUbicacion(){
        $listarUbicacion="";
        try{
            $objRespuesta=conexion::conectar()->prepare("SELECT nombreDepartamento AS nombreDepartamento, NULL AS nombreCiudad FROM departamento
            UNION 
            SELECT NULL AS nombreDepartamento, nombreCiudad AS nombreCiudad FROM ciudad");
            $objRespuesta->execute();
            $listarUbicacion = $objRespuesta->fetchAll();
            $objRespuesta = null;
        }catch(Exception $e){
            $listarUbicacion = $e;
        }
    return $listarUbicacion;
    }

    public static function mdlGuardarUsuario($nombreRegistro,$apellidoRegistro,$documentoRegistro,$telefonoRegistro,$correoRegistro,$contrasenaRegistro,$ciudadRegistro,$departamentoRegistro){
        $guardarUsuario="";
        $conexion = Conexion::conectar(); // Se crea la conexion 
        try{
            $objRespuesta=$conexion->prepare("INSERT INTO departamento (nombreDepartamento) SELECT :departamento -- Se envia el dato a incertar
            WHERE NOT EXISTS (SELECT nombreDepartamento FROM departamento -- Se valida si existe el dato 
            WHERE LOWER(nombreDepartamento) = LOWER(:departamento)  -- Se cambian los valores a minusculas
            AND nombreDepartamento REGEXP '^[^0-9]*$') -- Se despejan los caracteres especiales
            AND :departamento IS NOT NULL"); // El dato no puede ser nulo
            $objRespuesta->bindparam(":departamento",$departamentoRegistro);
            $objRespuesta->execute();
            $objRespuesta = null;
        }catch(Exception $e){
            $objRespuesta = $e;
            return $objRespuesta;
        }
        try{
            $objRespuesta=$conexion->prepare("INSERT INTO ciudad (nombreCiudad, depertamento_Id_Ciudad) SELECT :ciudadRegistro, (SELECT idDepartamento -- Se selecciona el id de la tabla de referencia
            FROM departamento
            WHERE LOWER(nombreDepartamento) = LOWER(:departamentoRegistro)) -- cerramos la busqueda del id
            WHERE NOT EXISTS (SELECT nombreCiudad FROM ciudad -- Se valida si existe el dato
            WHERE LOWER(nombreCiudad) = LOWER(:ciudadRegistro) -- Se cambian los valores a minusculas
            AND  :ciudadRegistro REGEXP '^[^0-9]*$') -- Se despejan los caracteres especiales
            AND  :ciudadRegistro IS NOT NULL"); // El dato no puede ser nulo
            $objRespuesta->bindparam(":ciudadRegistro",$ciudadRegistro);
            $objRespuesta->bindparam(":departamentoRegistro",$departamentoRegistro);
            $objRespuesta->execute();
            $objRespuesta = null;
        }catch(Exception $e){
            $objRespuesta = $e;
            return $objRespuesta;
        }
        try{
            $objRespuesta=$conexion->prepare("INSERT INTO usuario (nombre, apellido, documento, correo, contrasena, celular, rol_Id_Usuario, ciudad_Id_usuario) 
            SELECT :nombre, :apellido, :documento, :correo, :contrasena, :celular, '1', (SELECT idCiudad
            FROM ciudad
            WHERE LOWER(nombreCiudad) = LOWER(:ciudadRegistro))
            WHERE NOT EXISTS (SELECT nombre, apellido, documento, correo, contrasena, celular, rol_Id_Usuario, ciudad_Id_usuario  FROM usuario 
            WHERE LOWER(documento) = LOWER( :documento)
            AND LOWER(correo) = LOWER(:correo)
            AND LOWER(contrasena) = LOWER(:contrasena))"); // El dato no puede ser nulo
            $objRespuesta->bindparam(":nombre",$nombreRegistro);
            $objRespuesta->bindparam(":apellido",$apellidoRegistro);
            $objRespuesta->bindparam(":documento",$documentoRegistro);
            $objRespuesta->bindparam(":correo",$correoRegistro);
            $objRespuesta->bindparam(":contrasena",$contrasenaRegistro);
            $objRespuesta->bindparam(":celular",$telefonoRegistro);
            $objRespuesta->bindparam(":ciudadRegistro",$ciudadRegistro);
        if ($objRespuesta->execute()){
            $mensaje= "ok";
        }else{
            $mensaje= "erro al registrar datos";
        }
        }catch(Exception $e){
            $mensaje = $e;
        }
    return $mensaje;
    }

}

// ANIMAL

class mdlAnimal{

    public static function mdlListarBusquedaAnimal(){
        $ListarEspecie="";
        try{
            $objRespuesta=conexion::conectar()->prepare("SELECT idRaza AS idRaza, nombreRaza AS nombreRaza, especie_Id_Raza AS especie_Id_Raza,  NULL AS idEspecie, NULL AS nombreEspecie FROM raza 
            UNION 
            SELECT NULL AS idRaza, NULL AS nombreRaza, NULL AS especie_Id_Raza, idEspecie AS idEspecie, nombreEspecie AS nombreEspecie FROM especie;");
            $objRespuesta->execute();
            $ListarEspecie = $objRespuesta->fetchAll();
            $objRespuesta = null;
        }catch(Exception $e){
            $ListarEspecie = $e;
        }
    return $ListarEspecie;
    }
    public static function mdlListarAnimal(){
        $ListarAnimal=[];
        try{
            $objConexion = conexion::conectar();
            $objRespuesta = $objConexion->prepare("SELECT * FROM animal, formato, departamento, raza, especie, usuario, ciudad
            WHERE raza.idRaza = animal.raza_Id_Animal
            AND especie.idEspecie = raza.especie_Id_Raza
            AND formato.usuario_Id_formato = usuario.idUsuario 
            AND usuario.ciudad_Id_usuario = ciudad.idCiudad
            AND ciudad.depertamento_Id_Ciudad = departamento.idDepartamento
            AND animal.idAnimal = formato.animal_Id_Formato
            GROUP BY animal.idAnimal
            HAVING COUNT(animal.idAnimal) = 1");
            $objRespuesta->execute();
            $ListarAnimal = $objRespuesta->fetchAll(PDO::FETCH_ASSOC);
            $objRespuesta = null;
            
        }catch(Exception $e){
            $ListarAnimal = $e;
        }
    return $ListarAnimal;
    }
    public static function mdlListarAnimalUsuario(){
        $ListarAnimal=[];
        try{
            $objConexion = conexion::conectar();
            $objRespuesta = $objConexion->prepare("SELECT * FROM animal, formato, departamento, raza, especie, usuario, ciudad
            WHERE raza.idRaza = animal.raza_Id_Animal
            AND especie.idEspecie = raza.especie_Id_Raza
            AND formato.usuario_Id_formato = usuario.idUsuario 
            AND usuario.ciudad_Id_usuario = ciudad.idCiudad
            AND ciudad.depertamento_Id_Ciudad = departamento.idDepartamento
            AND animal.idAnimal = formato.animal_Id_Formato");
            $objRespuesta->execute();
            $ListarAnimal = $objRespuesta->fetchAll(PDO::FETCH_ASSOC);
            $objRespuesta = null;
            
        }catch(Exception $e){
            $ListarAnimal = $e;
        }
    return $ListarAnimal;
    } 
}

class mdlGuardarAnimal{
    public static function mdlGuardarAnimal($animalIdUsuario, $nombreAnimal, $imagenAnimal, $SexoAnimal, $EdadAnimal, $especieRegistro, $razaRegistro, $descripcionRegistro){
        $guardarAnimal="";
        $conexion = Conexion::conectar(); // Se crea la conexion 
        try{
            $objRespuesta=$conexion->prepare("INSERT INTO especie (nombreEspecie) SELECT :especieRegistro -- Se envia el dato a incertar
            WHERE NOT EXISTS (SELECT nombreEspecie FROM especie -- Se valida si existe el dato 
            WHERE LOWER(nombreEspecie) = LOWER(:especieRegistro)  -- Se cambian los valores a minusculas
            AND nombreEspecie REGEXP '^[^0-9]*$') -- Se despejan los caracteres especiales
            AND :especieRegistro IS NOT NULL;"); // El dato no puede ser nulo
            $objRespuesta->bindparam(":especieRegistro",$especieRegistro);
            $objRespuesta->execute();
            $objRespuesta = null;
        }catch(Exception $e){
            $objRespuesta = $e;
            return $objRespuesta;
        }
        try{
            $objRespuesta=$conexion->prepare("INSERT INTO raza (nombreRaza, especie_Id_Raza) SELECT :razaRegistro, (SELECT idEspecie -- Se selecciona el id de la tabla de referencia
            FROM especie
            WHERE LOWER(nombreEspecie) = LOWER(:especieRegistro)) -- cerramos la busqueda del id
            WHERE NOT EXISTS (SELECT nombreRaza FROM raza -- Se valida si existe el dato
            WHERE LOWER(nombreRaza) = LOWER(:razaRegistro) -- Se cambian los valores a minusculas
            AND  :razaRegistro REGEXP '^[^0-9]*$') -- Se despejan los caracteres especiales
            AND  :razaRegistro IS NOT NULL"); // El dato no puede ser nulo
            $objRespuesta->bindparam(":razaRegistro",$razaRegistro);
            $objRespuesta->bindparam(":especieRegistro",$especieRegistro);
            $objRespuesta->execute();
            $objRespuesta = null;
        }catch(Exception $e){
            $objRespuesta = $e;
            return $objRespuesta;
        }
        try{
            $objRespuesta=$conexion->prepare("INSERT INTO animal (imagenAnimal, nombreAnimal, sexo, edad, descripcion, raza_Id_Animal)
            SELECT :imagenAnimal, :nombreAnimal, :sexoAnimal , :edadAnimal, :descripcionRegistro, idRaza -- se indica el ingreso del id de la tabla de referencia
            FROM raza -- Se indica la tabla del dato de referencia
            WHERE LOWER(nombreRaza) = LOWER(:razaRegistro)"); // Se le coloca la condicion a cumplir
            $objRespuesta->bindparam(":imagenAnimal",$imagenAnimal, PDO::PARAM_LOB);
            $objRespuesta->bindparam(":nombreAnimal",$nombreAnimal);
            $objRespuesta->bindparam(":sexoAnimal",$SexoAnimal);
            $objRespuesta->bindparam(":edadAnimal",$EdadAnimal);
            $objRespuesta->bindparam(":descripcionRegistro",$descripcionRegistro);
            $objRespuesta->bindparam(":razaRegistro",$razaRegistro);
            $objRespuesta->execute();
            $objRespuesta = null;
        }catch(Exception $e){
            $objRespuesta = $e;
            return $objRespuesta;
        }
        try{
            $objRespuesta=$conexion->prepare("INSERT INTO formato (usuario_Id_formato, clase_Id_Usuario, animal_Id_Formato)
            SELECT :animalIdUsuario, '1', animal.idAnimal
            FROM animal
            WHERE LOWER(nombreAnimal) = LOWER(:nombreAnimal) 
            AND LOWER(sexo) = LOWER(:sexoAnimal)
            AND LOWER(edad) = LOWER(:edadAnimal)
            AND LOWER(descripcion) = LOWER(:descripcionRegistro)");
            $objRespuesta->bindparam(":animalIdUsuario",$animalIdUsuario);
            $objRespuesta->bindparam(":nombreAnimal",$nombreAnimal);
            $objRespuesta->bindparam(":sexoAnimal",$SexoAnimal);
            $objRespuesta->bindparam(":edadAnimal",$EdadAnimal);
            $objRespuesta->bindparam(":descripcionRegistro",$descripcionRegistro);
            if ($objRespuesta->execute()){
                $mensaje= "ok";
            }else{
                $mensaje= "error al registrar datos";
            }
        }catch(Exception $e){
            $mensaje = $e;
        }
    return $mensaje;
    }
}

class mdlDatosAnimal{
    public static function mdlLDatosArchivo($nesDatosAnimal){
        $ListarAnimal=[];
        try{
            $objConexion = conexion::conectar();
            $objRespuesta = $objConexion->prepare("SELECT * FROM animal, formato, departamento, raza, especie, usuario, ciudad
            WHERE raza.idRaza = animal.raza_Id_Animal
            AND especie.idEspecie = raza.especie_Id_Raza
            AND formato.usuario_Id_formato = usuario.idUsuario 
            AND usuario.ciudad_Id_usuario = ciudad.idCiudad
            AND ciudad.depertamento_Id_Ciudad = departamento.idDepartamento
            AND animal.idAnimal = formato.animal_Id_Formato
            AND formato.animal_Id_Formato = :nesDatosanimal");
            $objRespuesta->bindparam(":nesDatosanimal", $nesDatosAnimal);
            $objRespuesta->execute();
            $ListarAnimal = $objRespuesta->fetchAll(PDO::FETCH_ASSOC);
            $objRespuesta = null;
        }catch(Exception $e){
            $ListarAnimal = $e;
        }
    return $ListarAnimal;
    }
}


?>