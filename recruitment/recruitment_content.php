<?php
getContent();
function getContent(){
    $connect = new PDO("mysql:host=localhost;dbname=cl49-cms-h1t", "cl49-cms-h1t", "shinerfyp");
    $stmt = $connect->prepare('SELECT * FROM Recruitment ORDER BY pos ASC');
    $stmt->execute();
    $result = $stmt->fetchAll();
    buildString($result);

}

function buildString($data){
    $string = "";

    foreach ($data as $row){
        $tag = $row['content_type'];
        $string .= "<".$tag.">".$row['content']."</".$tag.">";
    }

    echo $string;
}
