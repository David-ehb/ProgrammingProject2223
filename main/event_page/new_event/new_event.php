<?php


$name =  $_POST['name'];
$host = "dt5.ehb.be/phpmyadmin/";
$username = "2223PROGPROJGR1";
$password = "NsEo8m";
$dbname = "2223PROGPROJGR1";
$con = mysqli_connect($host, $username, $password, $dbname);
$sql = "INSERT INTO evenementen (eventnaam) VALUES ('$name')";
$result = mysqli_query($con, $sql);
mysqli_close($con);
>
