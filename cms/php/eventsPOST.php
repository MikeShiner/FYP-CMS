<?php
/**
 * Created by PhpStorm.
 * User: Shiner
 * Date: 16/03/2015
 * Time: 16:49
 */

$data = json_decode($_REQUEST['data']);
var_dump($data);

if ($data->public){
    $publicBool = 1;
} else {
    $publicBool = 0;
}
$duration = substr($data->duration, 0, 2);
if($duration == "30"){
    $newtime = 0.5;
} else if ($duration == "Al"){
    $newtime = 4;
} else {
    $newtime = substr($data->duration, 0, 2);
}

$newdate = date("Y-m-d", strtotime($data->date));

    try {
        $connect = new PDO("mysql:host=localhost;dbname=cl49-cms-h1t", "cl49-cms-h1t", "shinerfyp");
        $stmt = $connect->prepare('INSERT INTO `calendar-events` (name, type, time, date, public, duration, description)
                                    VALUES (:name, :type, :time, :date, :public, :duration, :description)');
        $stmt->execute(array('name' => @$data->name, 'type' => @$data->type, 'time' => @$data->time, 'date' => $newdate,
            'public' => $publicBool, 'duration' => $newtime, 'description' => mysql_real_escape_string(@$data->description)));
//        $result = $stmt->fetchAll();
//        $contentItems = packContent($result);
//        echo $contentItems;

    } catch (PDOException $e) {
        var_dump($e);
}