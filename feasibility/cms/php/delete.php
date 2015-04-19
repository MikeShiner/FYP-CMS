<?php
include_once("../../php/connect.php");
/**
 * Created by PhpStorm.
 * User: Shiner
 * Date: 12/02/2015
 * Time: 10:37
 */

if (isset($_REQUEST['page']) && isset($_REQUEST['id'])){

    $id = $_REQUEST['id'];
    $connect = pdoConnect();
    $stmt = $connect->prepare('DELETE FROM ' . $_REQUEST['page'] .' WHERE id = :id');
    $stmt->execute(array('id' =>  $id));
}

echo "Element deleted.";