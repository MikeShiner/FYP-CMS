<?php
include_once("../../php/connect.php");

if(isset($_GET['page'])) {
    $page = $_GET['page'];
    getContent($page);
}

function getContent($page){

    try {
        $connect = pdoConnect();
        $stmt = $connect->prepare('SELECT * FROM '.$page.' ORDER BY pos ASC');
        $stmt->execute();
        $result = $stmt->fetchAll();
        $contentItems = packContent($result);
        echo $contentItems;
    } catch (PDOException $e){
        var_dump($e);
    }


//    $query = queryDB("SELECT * FROM `$page` ORDER BY `pos` ASC");
//    $contentItems = packContent($query);
//    echo $contentItems;

}

function packContent($data){

$itemdata = [];
    foreach ($data as $row){
        $itemdata[] = array(
            'id' => $row['id'],
            'pos' => $row['pos'],
            'content_type' => $row['content_type'],
            'content' => $row['content']
        );
    }

    $jsonitem = json_encode($itemdata);
    return $jsonitem;
}