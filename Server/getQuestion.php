<?php
include "db.php";

$json = json_decode(file_get_contents('php://input'), false);

if(count($json->answered) != 0) {
// getting ids of questions to exclude
    $ids_to_exclude = array();
    foreach ($json->answered as &$answered) {
        if ($answered->niveau == $json->niveau_id && $answered->categorie == $json->categorie_id) {
            $ids_to_exclude = $answered->id;
        }
    }

// random question by category, only one, and not selecting same ids
    $query = "select id, intitule from `question` where id_categorie=? and id_niveau=? and id not in ('";
    for ($i = 0; $i < count($ids_to_exclude); $i++) {
        $query = $query . $ids_to_exclude[$i];
        if ($i != count($ids_to_exclude) - 1) {
            $query = $query . "', '";
        }
    }
    $query = $query . "') order by rand() limit 1;";
} else {
    $query = "select id, intitule from `question` where id_categorie=? and id_niveau=? order by rand() limit 1;";
}
$stmt = $con->prepare($query);
$stmt->bind_param('ii', $json->categorie_id, $json->niveau_id);
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