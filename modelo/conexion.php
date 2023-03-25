<?php

class conexion{

   public static function conectar(){

        $nombreServidor = "localhost";
        $usuario = "root";
        $baseDatos = "proyectoW";
        $password = "";

        try {

            $objConexion = new PDO('mysql:host='.$nombreServidor.';dbname='.$baseDatos.';charset=utf8mb4',$usuario,$password);
            $objConexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        }catch(Exception $e){
            $objConexion = $e;
        }

        return $objConexion;
   }


}
?>
