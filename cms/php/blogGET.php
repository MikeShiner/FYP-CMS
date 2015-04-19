<?php
/**
 * Created by PhpStorm.
 * User: Shiner
 * Date: 25/03/2015
 * Time: 15:06
 */
$offset = $_GET['offset'];
getContent($offset);

function getContent($offset){
    try {
        $connect = new PDO("mysql:host=localhost;dbname=cl49-cms-h1t", "cl49-cms-h1t", "shinerfyp");
        $stmt = $connect->prepare('SELECT * FROM blog_entries ORDER BY time ASC LIMIT 10 OFFSET '.$offset);
        $stmt->execute();
        $result = $stmt->fetchAll();
//        var_dump($result);
        $contentItems = packContent($result);
        echo $contentItems;

    } catch (PDOException $e) {
        var_dump($e);
    }
}
function packContent($data){

    $itemdata = array();
    foreach ($data as $row) {
        $itemdata[] = array(
            'id' => $row['id'],
            'title' => $row['title'],
            'time' => $row['time'],
            'content' => $row['content']
        );
    }
    $jsonitem = json_encode($itemdata);
    return $jsonitem;
}