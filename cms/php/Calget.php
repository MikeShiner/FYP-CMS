<?php
/**
 * Created by PhpStorm.
 * User: Shiner
 * Date: 13/03/2015
 * Time: 13:54
 */
$baseMonth = $_GET["m"];
$year = $_GET["y"];
//$midMonth = $_GET["m2"];
//$endMonth = $_GET["m3"];


getContent($baseMonth, $year);

function getContent($baseMonth, $year)
{
    try {
        $connect = new PDO("mysql:host=localhost;dbname=cl49-cms-h1t", "cl49-cms-h1t", "shinerfyp");
        $stmt = $connect->prepare('SELECT * FROM `calendar-events` WHERE (MONTH(date) = :month1 && YEAR(date) = :year1) ORDER BY date ASC');
        $stmt->execute(array('month1' => $baseMonth, 'year1' => $year));
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