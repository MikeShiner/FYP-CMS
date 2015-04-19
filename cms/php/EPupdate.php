<?php
/**
 * Created by PhpStorm.
 * User: Shiner
 * Date: 07/03/2015
 * Time: 20:40
 */
$objects = json_decode($_REQUEST['data']);
$page = $_REQUEST['page'];
$contentBool = true;
$positionBool = true;

if (isset($objects)) {
    $connect = new PDO("mysql:host=localhost;dbname=cl49-cms-h1t", "cl49-cms-h1t", "shinerfyp");
    for ($i = 0; $i < count($objects); $i++) {
        try {
            $stmt = $connect->prepare('UPDATE `page_content` SET content_type = :tag, content = :content
    WHERE id = :id');
            $stmt->execute(array('tag' => @$objects[$i]->tag, 'content' => mysql_real_escape_string(@$objects[$i]->content),
                'id' => @$objects[$i]->id));
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
            $stmt = $connect->prepare('UPDATE `page_content` SET pos = :pos WHERE id = :id');
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