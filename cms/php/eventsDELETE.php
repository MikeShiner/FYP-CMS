<?php
/**
 * Created by PhpStorm.
 * User: Shiner
 * Date: 16/03/2015
 * Time: 17:37
 */
$data = json_decode($_REQUEST['data']);

var_dump($data->id);

try {
    $connect = new PDO("mysql:host=localhost;dbname=cl49-cms-h1t", "cl49-cms-h1t", "shinerfyp");
    $stmt = $connect->prepare('DELETE FROM `calendar-events` WHERE id = :id');
    $stmt->execute(array('id' => @$data->id));
} catch (PDOException $e) {
    var_dump($e);
}