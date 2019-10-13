<?php
$ini = parse_ini_file("server.ini");
header("Access-Control-Allow-Origin: http://192.168.137.1:3000");
header('Content-Type: application/json');
$con = mysqli_connect($ini["db_domain"], $ini["db_user"], $ini["db_password"], $ini["db_name"]) || die("Could not connect to database.");
$con->set_charset("utf8");
?>