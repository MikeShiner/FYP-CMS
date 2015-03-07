<?php
/**
 * Created by PhpStorm.
 * User: Shiner
 * Date: 09/02/2015
 * Time: 17:20
 */

$objects = json_decode($_REQUEST['data']);


if (isset($objects)){

    $connect = new PDO("mysql:host=localhost;dbname=cl49-cms-h1t", "cl49-cms-h1t", "shinerfyp");
    $stmt = $connect->prepare('INSERT INTO ' . $_REQUEST['page'] . ' (id, pos, content_type, content) VALUES
                                (:id, :pos, :content_type, :content)');
    $stmt->execute(array('id' => $objects->id, 'pos' =>  $objects->id,
        'content_type' => $objects->tag, 'content' => mysql_real_escape_string(@$objects->content)));
    }