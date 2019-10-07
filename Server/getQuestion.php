<?php
include "db.php";

$json = json_decode(file_get_contents('php://input'), false);

if(count($json->answered) != 0) {
// getting ids of questions to exclude
    $ids_to_exclude = array();
    foreach ($json->answered as &$answered) {
        if ($answered->level == $json->level_id && $answered->category == $json->category_id) {
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
$stmt->bind_param('ii', $json->category_id, $json->level_id);
$stmt->execute();
$result = $stmt->get_result();
$data = new stdClass();
$row = $result->fetch_object();
$data->id = $row->id;
$data->category_id = $json->category_id;
$data->question = $row->intitule;
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

// getting scoring information
$stmt = $con->prepare("select * from `niveau` where id=?;");
$stmt->bind_param('i', $json->level_id);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_object();
$data->points = $row->points;
$data->wrong_answer_penalty = $row->penalite_mauvaise_reponse;
$data->lower_time_bound = $row->temps_basse_limite;
$data->higher_time_bound = $row->temps_haute_limite;
$data->lower_bound_multiplier = $row->coefficient_temps_basse_limite;
$data->higher_bound_multiplier = $row->coefficient_temps_haute_limite;

echo json_encode($data);

$stmt->close();
$con->close();
?>