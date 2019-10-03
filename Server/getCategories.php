<?php
include "db.php";

$json = json_decode(file_get_contents('php://input'), false);

$data = new stdClass();
$data->categories = array();
$data->blocked = array();

// retrieving all categories
$q = mysqli_query($con, "select * from `categorie` order by id asc;");
while ($row = mysqli_fetch_object($q)) {
    $data->categories[] = $row;
}
$q->close();

if (count($json->answered) != 0) {
    // checking if categories are accessible
    $stmt = $con->prepare("select id_categorie, count(*) as count from `question` where id_niveau=? group by id_categorie;");
    $stmt->bind_param('i', $json->level_id);
    $stmt->execute();
    $result = $stmt->get_result();
    while ($row = $result->fetch_object()) {
        foreach ($json->answered as &$answered) {
            if ($answered->level == $json->level_id && $answered->category == $row->id_categorie && count($answered->id) == $row->count) {
                $data->blocked[] = $answered->category;
            }
        }
    }
    $stmt->close();
}

echo json_encode($data);

$con->close();
?>