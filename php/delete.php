<?php
/**
 * Created by PhpStorm.
 * User: Shiner
 * Date: 27/03/2015
 * Time: 17:37
 */


function getContent($page){
    $connect = new PDO("mysql:host=localhost;dbname=cl49-cms-h1t", "cl49-cms-h1t", "shinerfyp");
    $stmt = $connect->prepare('SELECT * FROM '. $page .' ORDER BY pos ASC');
    $stmt->execute();
    $result = $stmt->fetchAll();
    buildString($result);
}