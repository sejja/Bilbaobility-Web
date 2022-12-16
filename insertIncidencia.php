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
$idTipo=$_GET["idTipo"];
$Lat=$_GET["Lat"];
$Lon=$_GET["Lon"];

$sql = "INSERT INTO Incidencia (idUsuario, idTipo , Lat, Lon, timestamp,Comentarios)
VALUES ($idUsuario,$idTipo, $Lat, $Lon, now(),'Nada' )";

if ($conn->query($sql) === TRUE) {
  echo $sql;
} else {
//  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?> 