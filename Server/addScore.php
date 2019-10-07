<?php
include "db.php";

$json = json_decode(file_get_contents('php://input'), false);

$stmt = $con->prepare("insert into score (value) values (?);");
$stmt->bind_param('i', $json->score);
if($stmt->execute() !== TRUE) {
    $data = new stdClass();
    $data->error = $con->error;
    echo json_encode($data);
}

$stmt->close();
$con->close();
?>