<?php
/**
 * Created by PhpStorm.
 * User: Shiner
 * Date: 06/03/2015
 * Time: 18:31
 */
$month = ($_GET["month"] + 1);

// Changing '1' (Feb) to '01' && Making sure 13 loops to 01 (January)
if ($month < 10) {
    $month = "0" . ($month);
}
if ($month > 12) {
    $month = 01;
}

getContent($month);

function getContent($month)
{
    try {
        $connect = new PDO("mysql:host=localhost;dbname=cl49-cms-h1t", "cl49-cms-h1t", "shinerfyp");
        $stmt = $connect->prepare('SELECT * FROM events WHERE MONTH(date) = :date ORDER BY date ASC');
        $stmt->execute(array('date' => $month));
        $result = $stmt->fetchAll();
        $contentItems = packContent($result);
        echo $contentItems;

    } catch (PDOException $e) {
        var_dump($e);
    }
}

function packContent($data)
{

    $itemdata = array();
    foreach ($data as $row) {
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