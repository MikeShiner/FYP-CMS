<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>New Web</title>
    <link href="style.css" rel="stylesheet" type="text/css">
</head>
<body class="page-wrapper">
<div class="title-section">
    <section>
        <header>
            <h1><img src="img/header_logo.png" height="61" width="394" alt="header_logo"></h1>
        </header>
        <nav class="navigation">
            <ul>
                <li><a href="">Home</a></li>
                <li><a href="events/index.php">Upcoming Events</a></li>
                <li><a href="recruitment/index.php">Recruitment</a></li>
                <li><a href="blog/index.php">Blog</a></li>
                <li><a href="concerts/index.php">Concerts &amp; Festivals</a></li>
                <li><a href="gallery/index.php">Gallery</a></li>
                <li><a href="contactus/index.php">Contact Us</a></li>
                <li><a href="aboutus/index.php">About Us</a></li>
                <li><a href="community/index.php">Choir in the Community</a></li>
            </ul>
        </nav>
        <div class="header-image"></div>
    </section>
</div>
<div class="intro">
    <?php $page="Home";
    require 'php/get_content.php';?>
</div>
</body>
</html>