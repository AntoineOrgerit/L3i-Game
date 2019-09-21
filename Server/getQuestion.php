<?php
include "db.php";
$post = file_get_contents('php://input');
echo $post;
?>