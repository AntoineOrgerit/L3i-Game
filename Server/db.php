<?php
$ini = parse_ini_file("server.ini");
header("Access-Control-Allow-Origin: *");
$con = mysqli_connect($ini["db_domain"], $ini["db_user"], $ini["db_password"], $ini["db_name"]) or die("Could not connect to database.");
$con->set_charset("utf8");
?>