<?php
include_once("../../php/connect.php");

//var_dump($_REQUEST);

$objects = json_decode($_REQUEST['data']);
$contentBool = true;
$positionBool = true;

if (isset($objects)) {
    for ($i = 0; $i < count($objects); $i++) {
        try {
            $connect = pdoConnect();
            $stmt = $connect->prepare('UPDATE ' . $_REQUEST['page'] . ' SET content_type = :tag, content = :content
    WHERE id = :id');
            $stmt->execute(array('tag' => @$objects[$i]->tag, 'content' => mysql_real_escape_string(@$objects[$i]->content),
                'id' => @$objects[$i]->id));
            $contentBool = true;
        } catch (PDOException $e) {
            var_dump($e);
            $contentBool = false;
        }
    }
}

if (isset($_REQUEST['positions'])) {
    $string = explode("&", $_REQUEST['positions']);
    for ($i = 0; $i < count($string); $i++) {
        try {
            $connect = pdoConnect();
            $stmt = $connect->prepare('UPDATE ' . $_REQUEST['page'] . ' SET pos = :pos WHERE id = :id');
            $stmt->execute(array('pos' => ($i + 1), 'id' => substr($string[$i], 7)));
        } catch (PDOException $e) {
            var_dump($e);
            $positionBool = false;
        }
    }
}
if ($contentBool && $positionBool) {
    echo "Changes made successfully.";
} else {
    echo "Sorry, there was a problem saving the changes.";
}