<?php
/**
 * Created by PhpStorm.
 * User: Shiner
 * Date: 12/02/2015
 * Time: 10:37
 */

if (isset($_REQUEST['id'])){

    $id = $_REQUEST['id'];
    $connect = new PDO("mysql:host=localhost;dbname=cl49-cms-h1t", "cl49-cms-h1t", "shinerfyp");
    $stmt = $connect->prepare('DELETE FROM `page_content` WHERE id = :id');
    $stmt->execute(array('id' =>  $id));
    echo "Element deleted.";
} else {
    echo "Error in deletion";
}