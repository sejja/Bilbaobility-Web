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
$sql = "SELECT * FROM Incidencia";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
  // output data of each row
  $emparray = array();
  while($row = $result->fetch_assoc()) {

    $emparray[] = $row;
  }
  echo json_encode($emparray);
} else {
  echo "0 results";
}
$conn->close();

?> 
