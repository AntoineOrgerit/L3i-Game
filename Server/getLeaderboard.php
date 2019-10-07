<?php
include "db.php";

$data = new stdClass();
$data->leaderboard = array();
$stmt = $con->prepare("select value from `score` where value<>0 order by value desc limit 10;");
$stmt->execute();
$result = $stmt->get_result();
while($row = $result->fetch_object()) {
    $data->leaderboard[] = $row->value;
}

echo json_encode($data);

$stmt->close();
$con->close();
?>