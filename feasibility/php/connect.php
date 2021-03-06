<?php


$mysqli = accessDB();
print_r($mysqli);

function accessDB()
{
    try {
        new PDO("mysql:host=localhost;dbname=cms", "root", "");
} catch (PDOException $e) {
        createDB("cms");
        createTables();
        insertDummy();
    }
}

function pdoConnect(){
    $connect = new PDO("mysql:host=localhost;dbname=cms", "root", "");
    return $connect;
}

function createDB($nameDB)
{
    try {
        $dbh = new PDO("mysql:host=localhost", "root", "");
        $dbh->exec("CREATE DATABASE $nameDB;")
        or die(print_r($dbh->errorInfo(), true));
    } catch (PDOException $e) {
        die("DB ERROR: ". $e->getMessage());
    }
}

function createTables()
{

// Insert Dummy Data

    try {
        $dbh = new PDO("mysql:host=localhost;dbname=cms", "root", "");
        $stmt = $dbh->prepare('CREATE TABLE IF NOT EXISTS home (id int(100) NOT NULL auto_increment,
        pos INT(100) NOT NULL, content_type VARCHAR(20), content TEXT, PRIMARY KEY (id))');
        $stmt->execute();
    } catch (PDOException $e) {
        die("Couldn't create table: ". $e->getMessage());
    }
}

function insertDummy() {

    try {
        $dbh = new PDO("mysql:host=localhost;dbname=cms", "root", "");
        $stmt = $dbh->prepare('INSERT INTO home (pos, content_type, content) VALUES (:pos, :content_type, :content)');
        $pos = '1';
        $ct = 'h1';
        $content = 'Top Level Heading';

        $stmt->execute(array(
            'pos' => $pos,
            'content_type' => $ct,
            'content' => $content
        ));
    } catch (PDOException $e) {
        die("Couldn't insert data: ". $e->getMessage());
    }
}