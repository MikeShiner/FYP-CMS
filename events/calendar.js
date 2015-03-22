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
    var month = fullDate.getMonth();
    var curYear = fullDate.getFullYear();
    var year = fullDate.getFullYear();
    var events;

    var listSwitch = $('#listSwitch');
    listSwitch.hide();
    init();
    listSwitch.slideDown();

    function init() {
        // Initialize Events
        getEvents(month);
        // Get Default View
        changeRadioView($('input[name=form]:checked', '#radForm').attr('id'));
    }

    function getEvents(month) {
        //$('#debug').append("<p>month: " + month+"</p>");
        console.log(month);
        events = $.ajax({
            type: "GET",
            url: "../php/events.php?month=" + month,
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
        changeRadioView($('input[name=form]:checked', '#radForm').attr('id'));
    });

    $('#next').click(function () {
        month++;
        if (month > 11) {
            month = 0;
            year++
        }
        getEvents(month);
        changeRadioView($('input[name=form]:checked', '#radForm').attr('id'));
    });

    listSwitch.on("click", "td", function () {
        var infoMonth, daycheck = $(this).text(), infoSpace = $('#info');
        infoSpace.html("");
        infoMonth = (month+1);
        if(infoMonth < "10"){
            infoMonth = "0"+infoMonth;
        }
        if (!(parseInt(daycheck) > 10)) {
            daycheck = "0" + daycheck;
        }
        console.log(daycheck + " Month: " + infoMonth);
        for (var i = 0; i < events.length; i++) {
            if(events[i].date.substr(-2) == daycheck &&
                events[i].date.substr(5, 2) == infoMonth &&
                events[i].date.substr(0, 4) == year){
                console.log("Event name: " + events[i].name);
                infoSpace.append("<h4>"+ events[i].name +"</h4><p class='infoType'>" +
                events[i].type + " - " + events[i].time +"</p><p>"+ events[i].description +"</p>");
            }
        }
        if(infoSpace.html() == ""){
            infoSpace.html("<p>No event current scheduled for this day.</p>");
        }
        console.log("");
    });

    function changeRadioView(e) {
        $('#month_label').html(month_labels[month] + " " + year);
        if (e == "calView") {
            //listSwitch.slideUp("normal", function () {});
            console.log("Calendar Logged");
            drawCalendar(fullDate, month, year);
            //listSwitch.slideDown();
        } else if (e == "listView") {
            //listSwitch.slideUp("normal", function () {});
            console.log("List Logged");
            drawListView(fullDate, month, year);
            //listSwitch.slideDown();
        }
    }

    $('.radioCont #radForm input:radio').change(function (e) {
        changeRadioView(e.target.id);
        console.log("Change " + e.target.id);
    });

    //////////////////////////////////////////////////////////
    //////// Draw List View //////////////////////////////////
    //////////////////////////////////////////////////////////
    function drawListView(fullDate, month, year) {
        var listViewCont = $('<div></div>');
        listViewCont.addClass("listViewCont");
        for (var i = 0; i < events.length; i++) {
            var date;
            switch (events[i].date.substr(-2)) {
                case "01":
                    date = "1st";
                    break;
                case "02":
                    date = "2nd";
                    break;
                case "03":
                    date = "3rd";
                    break;
                default:
                    date = (events[i].date.substr(-2) + "th");
            }

            var container = $('<div></div>');
            container.addClass("eventElement");

            var timeCont = $('<div></div>');
            timeCont.addClass("timeCont");
            timeCont.html(events[i].time.substr(0, 5) + " " + date);

            var infoCont = $('<div></div>');
            infoCont.addClass("infoCont");
            infoCont.html(events[i].name);

            listViewCont.append(container.append(timeCont).append(infoCont));
        }
        $('#listSwitch').html(listViewCont);

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
            '<div class="calDayItem">Sun</div><div class="calDayItem">Mon</div><div class="calDayItem">Tue</div>' +
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

                            html += '<td class="eventDay">';
                            html += curDay;
                            //html += '<p class="eventCap">' + events[k].name + '</p>';
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
        html += "</table>";
        $('#listSwitch').html(html);

        // get Events

        // DEBUG
        //    console.log("Day: " + day_labels[day] + " (" + day + ")");
        //    console.log("Date: " + date);
        //    console.log("Month: " + month_labels[month] + " (" + month + ")");
        //    console.log("Year: " + year);
        //    console.log("Days in this month: " + dIM);
        //    console.log("Starting Day: " + day_labels[startingDay] + " (" + startingDay + ")");
    }
})
;