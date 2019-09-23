<?php
include "db.php";

$data = new stdClass();
$data->categories = array();
$data->blocked = array();

// retrieving all categories
$q = mysqli_query($con, "select * from `categorie` order by id asc;");
while ($row = mysqli_fetch_object($q)) {
    $data->categories[] = $row;
}
$q->close();

// checking if categories are accessible
$stmt = $con->prepare("select id_categorie, count(*) as count from `question` where id_niveau=? group by id_categorie;");
$stmt->bind_param('i', $_REQUEST["niveau_id"]);
$stmt->execute();
$result = $stmt->get_result();
while ($row = $result->fetch_object()) {
    var_dump($row);
    foreach ($_REQUEST["answered"] as &$value) {
        $answered = json_decode($value);
        if($answered->niveau == $_REQUEST["niveau_id"] && $answered->categorie == $row->id_categorie && count($answered->ids) == $row->count) {
               $data->blocked[] = $answered->categorie;
        }
    }
}
$stmt->close();

echo json_encode($data);

$con->close();
?>