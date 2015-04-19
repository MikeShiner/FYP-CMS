<?php
include_once("connect.php");

$month = ($_GET["month"]+1);

// Changing '1' (Feb) to '01' && Making sure 13 loops to 01 (January)
if ($month < 10){
    $month = "0" . ($month);
}
if($month > 12){
    $month = 01;
}

getEvents($month);
function getEvents($month){

    try {
        $connect = pdoConnect();
        $stmt = $connect->prepare('SELECT * FROM events WHERE MONTH(date) = :date ORDER BY date ASC');
        $stmt->execute(array(':date' => $month));
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
            'name' => $row['name'],
            'type' => $row['type'],
            'description' => $row['description'],
            'time' => $row['time'],
            'date' => $row['date'],
            'duration' => $row['duration'],
            'public' => $row['public']
        );
    }

    $jsonitem = json_encode($itemdata);
    return $jsonitem;
}