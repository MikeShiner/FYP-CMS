<?php
include_once("connect.php");

$page = $_REQUEST['page'];
getContent($page);

function getContent($page){
    $stmt = new pdoConnect();
    $query = queryDB("SELECT * FROM `$page` ORDER BY `pos` ASC");
//    $contentItems = packContent($query);
    $row = mysqli_fetch_array($query);
   var_dump($row);
}

function packContent($query){

        while ($row = mysqli_fetch_array($query)) {
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