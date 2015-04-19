<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>New Web</title>
    <link href="../style.css" rel="stylesheet" type="text/css">
</head>
<body class="page-wrapper">
<div class="title-section">
    <section>
        <header>
            <h1><img src="../img/header_logo.png" height="61" width="394" alt="header_logo"></h1>
        </header>
        <nav class="navigation">
            <ul>
                <li><a href="../index.php">Home</a></li>
                <li><a href="../events/index.php">Upcoming Events</a></li>
                <li><a href="../recruitment/index.php">Recruitment</a></li>
                <li class="selected">Blog</li>
                <li><a href="../concerts/index.php">Concerts &amp; Festivals</a></li>
                <li><a href="../gallery/index.php">Gallery</a></li>
                <li><a href="../contactus/index.php">Contact Us</a></li>
                <li><a href="../aboutus/index.php">About Us</a></li>
                <li><a href="../community/index.php">Choir in the Community</a></li>
            </ul>
        </nav>
        <div class="header-image"></div>
    </section>
</div>
<div class="intro">
        <?php $page="blog"; require '../php/get_content.php'; ?>
</div>
<div class="blog_container">
    <h2>Blog News</h2>

    <h3>Below find all our posts where we wll keep you up to date on current news within the choir. Please check
        back here from time to time for new news and special features.</h3>

    <div id="blog_section">
        <div class="entry_container"><h3>Blog Post Title</h3>
            <p id="timestamp">91:00:00</p>
            <p class="blog_paragraph">This is a test blog post which will be kep with all the other blog posts to
                show all kinds of information about the choir. Blog posts will be delivered into this body
                dynamically which will allow for information to continuously posted and loaded similatiously.</p>
        </div>
    </div>
</div>
</body>
</html>