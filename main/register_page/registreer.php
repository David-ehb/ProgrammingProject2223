<?php

// get the form data
$voornaam = $_POST['voornaam'];
$achternaam = $_POST['naam'];
$geboortedatum = $_POST['geboortedatum'];
$postcode = $_POST['postcode'];
$gemeente = $_POST['gemeente'];
$straat = $_POST['straat'];
$huisnummer = $_POST['huisnummer'];
$gsm = $_POST['gsm'];
$email = $_POST['email'];
$username = $_POST['username'];
$password = $_POST['wachtwoord'];
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

// insert the form data into the database
$sql = "INSERT INTO gebruikers (voornaam, naam, geboortedatum, postcode, gemeente, straat, huisnummer, telefoonnr, email, gebruikersnaam, wachtwoord) VALUES ('$voornaam', '$achternaam', '$geboortedatum', '$postcode', '$gemeente', '$straat', '$huisnummer', '$gsm', '$email', '$username', '$password')";

if ($conn->query($sql) === TRUE) {
  echo "Data inserted successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

// Retrieve data from database
$sql = "SELECT * FROM gebruikers";
$result = $conn->query($sql);


// Convert result to JSON format
$data = array();
while ($row = $result->fetch_assoc()) {
  $data[] = $row;
}
echo json_encode($data);

$conn->close();
?>