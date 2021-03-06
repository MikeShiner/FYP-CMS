$(document).ready(function () {
    day_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    month_labels = ['January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'];
    daysIM = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    ////////////////////////////////////////////////////////////////////////////
    // Date Variables //////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    var fullDate = new Date();
    var curMonth = fullDate.getMonth();
    var month = curMonth;
    var curYear = fullDate.getFullYear();
    var year = curYear;

    var events = $.ajax({
        type: "GET",
        url: "php/events.php?month=" + month,
        async: false
    });
    console.log(events);
    events = JSON.parse(events.responseText);

    var listSwitch = $('#listSwitch');
    listSwitch.hide();
    getEvents(month);
    drawCalendar(fullDate, month, year);
    listSwitch.slideDown();

    function getEvents(month) {
        events = $.ajax({
            type: "GET",
            url: "php/events.php?month=" + month,
            async: false
        });
        console.log(events);
        events = JSON.parse(events.responseText);
    }

    //////////////////////////////////////////////////////////
    //// Click Events/////////////////////////////////////////
    //////////////////////////////////////////////////////////

    $('#prev').click(function () {
        month--;
        if (month < 0) {
            month = 11;
            year--
        }
        getEvents(month);
        drawCalendar(fullDate, month, year);
    });

    $('#next').click(function () {
        month++;
        if (month > 11) {
            month = 0;
            year++
        }
        getEvents(month);
        drawCalendar(fullDate, month, year);
    });

    $('#calTable').on("click", "td", function () {
        console.log($(this).text() + " Month: " + month)
    });

    $('.radioCont form input:radio').change(function (e) {
        if (e.target.id == "calForm") {
            listSwitch.slideUp("normal", function () {
                drawCalendar(fullDate, month, year)
            });
            listSwitch.slideDown();
            console.log(e.target.id);
        } else if (e.target.id == "listForm") {
            listSwitch.slideUp("normal", function () {
                drawListView(fullDate, month, year)
            });
            listSwitch.slideDown();
            console.log(e.target.id);
        }
    });

    //////////////////////////////////////////////////////////
    //////// Draw List View //////////////////////////////////
    //////////////////////////////////////////////////////////
    function drawListView(fullDate, month, year) {
        html = "<div id='listViewCont'>";
        for (var i; i < events.length; i++){
        $('#listSwitch').html(events[0].name);
    }


    //////////////////////////////////////////////////////////
    //////// draw Calendar ///////////////////////////////////
    //////////////////////////////////////////////////////////
    function drawCalendar(fullDate, month, year) {
        // Year
        // Month || Jan = 0. Feb = 1, Mar = 2
        // Day label
        var day = fullDate.getDay();
        var date = fullDate.getDate();
        // Days in Month -- Auto Leap Year
        var dIM = new Date(year, (month + 1), 0).getDate();
        // Month starts on day
        var startingDay = new Date(year, month, 1).getDay();
        // How many weeks in month to draw
        var rows = Math.ceil((dIM + startingDay - 1) / 7);

        console.log("True dIM = 'Days In Month + Days into month it starts at." + month_labels[month] +
        ": " + dIM + " + " + (startingDay - 1) + "/7 = " + Math.ceil((dIM + startingDay - 1) / 7));
        console.log(rows);

        var html = '<div id="dayHead">' +
        '<div class="calDayItem">Sun</div><div class="calDayItem">Mon</div><div class="calDayItem">Tue</div>'+
        '<div class="calDayItem">Wed</div><div class="calDayItem">Thu</div><div class="calDayItem">Fri</div>' +
        '<div class="calDayItem">Sat</div></div><table id="calTable">';

        console.log(events);
        // Drawing Calendar
        var curDay = 1;
        // Loop for rows -- Over compensating 9.
        for (var i = 0; i < rows; i++) {
            html += '<tr>';
            // this loop is for weekdays (cells)
            for (var j = 0; j <= 6; j++) {

                if (date == curDay && month == curMonth && year == curYear) {
                    html += '<td class="curDay">';
                    html += curDay;
                    html += '</td>';
                    curDay++
                } else if (curDay <= dIM && (i > 0 || j >= startingDay)) {
                    // Valid Day
                    var eventBool = false;
                    for (var k = 0; k <= events.length - 1; k++) {

                        if (events[k].date.substr(-2) == curDay && events[k].date.substr(0, 4) == year &&
                            (events[k].date.substr(5, 2) - 1) == month) {
                            console.log(events);

                            html += '<td class="eventDay">';
                            html += curDay;
                            html += '<p class="eventCap">' + events[k].name + '</p>';
                            html += '</td>';
                            curDay++;
                            eventBool = true;
                        }
                    }
                    if (!eventBool) {
                        html += '<td class="validDay">';
                        html += curDay;
                        html += '</td>';
                        curDay++;
                    }
                } else {
                    html += '<td class="invalidDay">';
                    html += '</td>';
                }
            }
            html += '</tr>';
        }
        html += '</table>';
        $('#listSwitch').html(html);
        $('#month_label').html(month_labels[month] + " " + year);

        // get Events

        // DEBUG
        console.log("Day: " + day_labels[day] + " (" + day + ")");
        console.log("Date: " + date);
        console.log("Month: " + month_labels[month] + " (" + month + ")");
        console.log("Year: " + year);
        console.log("Days in this month: " + dIM);
        console.log("Starting Day: " + day_labels[startingDay] + " (" + startingDay + ")");
    }
})
;