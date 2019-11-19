<?php
	$servidor = "localhost";
	$usuarioSevidor="root";
	$passwordServidor= "";
	$base="n_agenda"; //base de datos única
	$conexion = new mysqli($servidor, $usuarioSevidor, $passwordServidor);
	if (!$conexion->error){
		mysqli_query ($conexion,  "CREATE DATABASE IF NOT EXISTS agenda;");
		mysqli_select_db($conexion, $base);
		mysqli_query($conexion, "CREATE TABLE IF NOT EXISTS usuarios ( id integer primary key AUTO_INCREMENT  ,
								 email varchar (20) not null unique,
								 nombre varchar (50),
								 password varchar(250),
								 fecha_nacimiento  date);
								");
		mysqli_query($conexion, "CREATE TABLE IF NOT EXISTS agenda ( id integer primary key AUTO_INCREMENT  ,
								 title varchar (20) not null unique,
								 start date,
								 start_hour  time,
								 end  date,
								 end_hour time,
								 allDay boolean,
								 fk_usuario integer);
								");
		$conexion = new mysqli($servidor, $usuarioSevidor, $passwordServidor, $base);
		$php_response["msg"] = "OK";
		include 'create_user.php';
	}else{
		echo 	$php_response["msg"] ="Error de conexión con el servidor ";
	}
?>