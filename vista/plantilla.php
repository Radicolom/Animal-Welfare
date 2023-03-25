<?php

include_once "modulos/cabecera.php";

include_once "modulos/menu.php";

if(isset($_GET["ruta"])){
    if($_GET["ruta"] == "inicio" || $_GET["ruta"] == "adopta" || $_GET["ruta"] == "darAdopcion" || 
    $_GET["ruta"] == "iniciarSes" || $_GET["ruta"] == "datosUsuario"){

        include_once "modulos/".$_GET["ruta"].".php";
    }else{
        include_once "modulos/error.php";
    }
}

include_once "modulos/pie.php";

?>