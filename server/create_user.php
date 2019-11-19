<?php
require_once "conect.php";
if ($php_response["msg"]=="OK"){
	$u_exiten = mysqli_query($conexion, "SELECT * FROM usuarios");
	if (mysqli_num_rows($u_exiten) > 0 ){
		$php_response['obser']= "los usuarios ya existen ";
	}else{
		$email = "user1@nextu.com";
		$nombre="Ariel";
		$password =md5("admin1");
		$fecha_nacimiento = "1994/06/04";
		$crear = $conect->prepare("INSERT INTO usuarios (email, nombre, password, fecha_nacimiento) VALUES (?,?,?,?)");
		$crear->bind_param("ssss", $email, $nombre, $password, $fecha_nacimiento);
        $crear->execute();

		$email = "user2@nextu.com";
		$nombre="Pau";
		$password =md5("admin2");
		$fecha_nacimiento = "1993/02/26";
		$crear->bind_param("ssss", $email, $nombre, $password, $fecha_nacimiento);
		$crear->execute();

		$email = "user3@nextu.com";
		$nombre="Jesús";
		$password =md5("admin3");
		$fecha_nacimiento = "1993/12/12";
		$crear->bind_param("ssss", $email, $nombre, $password, $fecha_nacimiento);
		$crear->execute();
	}
	$cumple = date('Y/m/d',strtotime("1982/07/08"));
}

 ?>