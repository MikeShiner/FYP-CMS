<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>New Web</title>
    <link href="../style.css" rel="stylesheet" type="text/css">
    <link href="calendar.css" rel="stylesheet" type="text/css">
    <script src="../js/jQuery.js" type="text/javascript"></script>
    <script src="calendar.js" type="text/javascript"></script>
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
                <li class="selected">Upcoming Events</li>
                <li><a href="../recruitment/index.php">Recruitment</a></li>
                <li><a href="../blog/index.php">Blog</a></li>
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
    <?php $page="Events";
    require '../php/get_content.php'; ?>
</div>
<div class="calendar-widget">
    <div id="calandSwitch">
    <div class="radioCont">
        <form id="radForm">
            <input type="radio" id="calView" name="form" checked>
            <label for="calView" id="calFormLabel"><img src="../img/grid.png" width="20" height="20"><span>Calendar</span></label>
            <input type="radio" id="listView" name="form">
            <label for="listView" id="listFormLabel"><img src="../img/list.png" width="20" height="20">
                <span>List</span></label>
        </form>
    </div>
    <div class="calendar">
        <div class="calHead">
            <div class="calHeadItem" id="prev"><< Prev</div>
            <div class="calHeadItem" id="month_label">Month</div>
            <div class="calHeadItem" id="next">Next >></div>
        </div>
        <div id="listSwitch"></div>
        </div>
        </div>
    <div id="eventInfo">
        <h3>View Events:</h3>
        <p>Please select an event on the calendar to view details.</p>
        <div id="info"></div>
    </div>
    <div class="clear"></div>
    </div>
</body>
</html>