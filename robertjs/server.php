<?php
print_r($_POST);
$data = array("one"=>"first", "two"=>"second");
echo json_encode($data);