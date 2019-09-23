<?php
include "db.php";

// random question by category, only one
$stmt = $con->prepare("select id, intitule from `question` where id_categorie=? order by rand() limit 1;");
$stmt->bind_param('i', $_REQUEST["category_id"]);
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