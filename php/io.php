<?php

$page = $_REQUEST['page'];
getContent($page);

function getContent($page){
    $connect = new PDO("mysql:host=localhost;dbname=cl49-cms-h1t", "cl49-cms-h1t", "shinerfyp");
    $stmt = $connect->prepare("SELECT * FROM `$page` ORDER BY `pos` ASC");
    $stmt->execute();
    $result = $stmt->fetchAll();
    $contentItems = packContent($result);
//    echo $contentItems;
}

function packContent($data){

    $itemdata = array();
    foreach ($data as $row) {
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