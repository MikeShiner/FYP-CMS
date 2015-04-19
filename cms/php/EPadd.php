<?php
/**
 * Created by PhpStorm.
 * User: Shiner
 * Date: 09/02/2015
 * Time: 17:20
 */

if (isset($_REQUEST['id'])){
    $connect = new PDO("mysql:host=localhost;dbname=cl49-cms-h1t", "cl49-cms-h1t", "shinerfyp");
    $stmt = $connect->prepare('INSERT INTO `page_content` (id, pos, content_type, content, page) VALUES
                                (:id, :pos, :content_type, :content, :page)');
    $stmt->execute(array('id' => $_REQUEST['id'], 'pos' =>  $_REQUEST['pos'],
        'content_type' => $_REQUEST['tag'], 'page' => $_REQUEST['page'], 'content' => mysql_real_escape_string(@$objects->$_REQUEST['content'])));
    echo "Element added.";
} else {
    echo "Error adding element";
}