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
$LatOrigen=$_GET["Lat"];
$LonOrigen=$_GET["Lon"];


$sql = "INSERT INTO puntosRutas ( lat, lon)
VALUES ($LatOrigen,$LonOrigen)";

if ($conn->query($sql) === TRUE) {
  echo $sql;
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?> 