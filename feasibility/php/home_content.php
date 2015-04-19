<?php
require_once 'connect.php';


getContent();
function getContent(){
    $connect = pdoConnect();
    $stmt = $connect->prepare('SELECT * FROM home ORDER BY pos ASC');
    $stmt->execute();
    $result = $stmt->fetchAll();
    buildString($result);

}

function buildString($data){
    $string = "";

    foreach ($data as $row){
            $tag = $row['content_type'];
        $string .= "<".$tag.">".$row['content']."</".$tag.">";
    }

    echo $string;

}
