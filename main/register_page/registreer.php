<?php
$servername = "dt5.ehb.be";
$username = "2223PROGPROJGR1";
$password = "NsEo8m";
$dbname = "2223PROGPROJGR1";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Retrieve data from database
$sql = "SELECT * FROM yourtable";
$result = $conn->query($sql);

// Convert result to JSON format
$data = array();
while ($row = $result->fetch_assoc()) {
  $data[] = $row;
}
echo json_encode($data);

$conn->close();
?>