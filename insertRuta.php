<?php
$servername = "database";
$username = "docker";
$password = "docker";
$dbname = "docker";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error){
 die("Connection failed: " . $conn->connect_error);
}
$idUsuario=$_GET["idUsuario"];
$LatOrigen=$_GET["LatOrigen"];
$LonOrigen=$_GET["LonOrigen"];
$LatDestinon=$_GET["LatDestino"];
$LonDestino=$_GET["LonDestino"];

$sql = "INSERT INTO rutas (idUsuario, timestamp , latOrigen, lonOrigen, latDest,lonDest)
VALUES ($idUsuario,now(), $LatOrigen,$LonOrigen, $LatDestinon,$LonDestino )";

if ($conn->query($sql) === TRUE) {
  //echo $sql;
} else {
//  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?> 