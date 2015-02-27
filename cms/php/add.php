<?php
include_once("../../php/connect.php");
/**
 * Created by PhpStorm.
 * User: Shiner
 * Date: 09/02/2015
 * Time: 17:20
 */

$objects = json_decode($_REQUEST['data']);


if (isset($objects)){

    $connect = pdoConnect();
    $stmt = $connect->prepare('INSERT INTO ' . $_REQUEST['page'] . ' (id, pos, content_type, content) VALUES
                                (:id, :pos, :content_type, :content)');
    $stmt->execute(array('id' => $objects->id, 'pos' =>  $objects->id,
        'content_type' => $objects->tag, 'content' => mysql_real_escape_string(@$objects->content)));
    }