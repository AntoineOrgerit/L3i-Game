<?php
include "db.php";

// getting ids of questions to exclude
$ids_to_exclude = array();
foreach ($_REQUEST["answered"] as &$value) {
    $answered = json_decode($value);
    if($answered->niveau == $_REQUEST["niveau_id"] && $answered->categorie == $_REQUEST["category_id"]) {
        $ids_to_exclude = $answered->ids;
    }
}

// random question by category, only one, and not selecting same ids
$query = "select id, intitule from `question` where id_categorie=? and id_niveau=? and id not in (";
for ($i = 0; $i < count($ids_to_exclude); $i++) {
    $query = $query . $ids_to_exclude[$i];
    if ($i != count($ids_to_exclude) - 1) {
        $query = $query . ", ";
    }
}
$query = $query . ") order by rand() limit 1;";
var_dump($query);
$stmt = $con->prepare($query);
$stmt->bind_param('ii', $_REQUEST["category_id"], $_REQUEST["niveau_id"]);
$stmt->execute();
$result = $stmt->get_result();
$data = new stdClass();
$row = $result->fetch_object();
$data->id = $row->id;
$data->intitule = $row->intitule;
$data->answers = array();

// getting possible answers
$stmt = $con->prepare("select id_reponse from `question_reponse` where id_question=?;");
$stmt->bind_param('i', $data->id);
$stmt->execute();
$result = $stmt->get_result();
while($row = $result->fetch_object()) {
    $answer = new stdClass();
    $answer->id = $row->id_reponse;
    $stmt_answers = $con->prepare("select intitule from `reponse` where id=?;");
    $stmt_answers->bind_param('i', $row->id_reponse);
    $stmt_answers->execute();
    $result_answers = $stmt_answers->get_result();
    $row_answer = $result_answers->fetch_object();
    $answer->intitule = $row_answer->intitule;
    $data->answers[] = $answer;
}

echo json_encode($data);

$stmt->close();
$con->close();
?>