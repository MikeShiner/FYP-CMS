/**
 * Created by Shiner on 06/03/2015.
 */
$(document).ready(function (){

    month_labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
        'October', 'November', 'December'];

    var highestId = 0;
    var fullDate = new Date();
    var curYear = fullDate.getFullYear();
    var curMonth = fullDate.getMonth()+1;

    var varMonth = curMonth;
    var varYear = curYear;

    $('#dateIn').datepicker();
    $('#calPrev').click(function(){
        varMonth = varMonth - 1;
        if (varMonth < 1){
            varMonth = 12;
            varYear = varYear - 1;
        }
        getContent(varMonth, varYear);
    });

    $('#calNext').click(function(){
        varMonth = varMonth + 1;
        if (varMonth > 12){
            varMonth = 1;
            varYear = varYear + 1;
        }
        getContent(varMonth, varYear);
    });

    $('#save').click(function(){
        if(errorCheck()) {
            saveResults();
        }
    });

    $('#pageElements').on('click', '.toolbarBut', function(e) {
        console.log(e.target.id);
        if(e.target.id.substr(0, 4)== "dele"){
            deleteEvent(e.target.id.substr(8));
        } else if (e.target.id.substr(0, 4)== "edit"){
            editEvent(e.target.id.substr(8));
        }
    });

    setup();

    //Functions
    function setup() {
        //console.log(curMonth);
        getContent(curMonth, curYear);
    }

    function getContent(baseMonth, year) {
        var midMonth, endMonth;
        $('#pageElements').html("");

        console.log(baseMonth + " " + year);
        $('#calRange').html(month_labels[baseMonth-1] + " " + year);

        var url = "?m="+baseMonth+"&y="+year;
        // Ajax request:
        $.ajax({
            type: "GET",
            url: "../php/Calget.php"+url,
            success: function (result) {
                displayContent(result);
                //console.log(result);
            }
        });
    }

    function displayContent(data) {
        var decoded = JSON.parse(data), tag, id;
        console.log(decoded);
        for (var i = 0; i < decoded.length; i++) {

            if (highestId < parseInt(decoded[i]['id'])) {
                highestId = decoded[i]['id'];
            }

            //tag = decoded[i]['content_type'];
            id = decoded[i]['id'];

            var itemContainer = $('<div>', {
                'class': 'eventContainer',
                'id': 'event-' + id
            });

            //
                var name = $('<div>', {
                    'class': "eventItem eventName",
                    'id': "name-"+id,
                    'html': decoded[i]['name']
                });
            var type = $('<div>', {
                'class': "eventItem",
                'id': "type-"+id,
                'html': decoded[i]['type']
            });
            var time = $('<div>', {
                'class': "eventItem",
                'id': "time-"+id,
                'html': decoded[i]['time']
            });

            // Putting the date round the right way:
            var pieces = decoded[i]['date'].split('-');
            pieces.reverse();
            var reversed = pieces.join('/');

            var date = $('<div>', {
                'class': "eventItem",
                'id': "date-"+id,
                'html': reversed
            });
            var duration = $('<div>', {
                'class': "eventItem",
                'id': "duration-"+id,
                'html': decoded[i]['duration']+" Hour"
            });

            // Testing if event is public or not:
            var isPublic = "Public Event";
            if (decoded[i]['public'] == "0"){
                isPublic = "Private Event";
            }

            var publicVal = $('<div>', {
                'class': "eventItem",
                'id': "publicVal-"+id,
                'html': isPublic
            });
            var toolbar = $('<div>', {
                'class': "eventToolbar"
            });
            var deleteButton = $('<button>', {
                'type': "button",
                'class': "toolbarBut",
                'id': "delebut-"+id,
                'html': "Delete"
            });
            var editButton = $('<button>', {
                'type': "button",
                'class': "toolbarBut",
                'id': "editbut-"+id,
                'html': "Edit"
            });

            var desbreak = $('<br>');

            var description = $('<div>', {
                'class': "eventDes",
                'id': "descrip-"+id,
                'html': decoded[i]['description']
            });

            itemContainer.append(name).append(type)
                .append(time).append(date).append(duration).append(publicVal).append(toolbar.append(deleteButton).append(editButton))
                 .append(desbreak).append(description).appendTo('#pageElements');
        }
    }

    function saveResults(){
        // Gather results
        var data = {
            'name': $('#title').val(),
            'type': $('#type').val(),
            'time': $('#timeIn').val(),
            'date': $('#dateIn').val(),
            'duration': $('#durationIn').val(),
            'public': $('#publicBool').prop('checked'),
            'description': $('#description').val()
        };
        var stringify = {
            data: JSON.stringify(data)
         };

        $.ajax({
            type: "POST",
            url: "../php/eventsPOST.php",
            data: stringify,
            success: function (result) {
                getContent(curMonth, curYear);
            }
        });

        $('#eventForm')[0].reset();
    }

    function errorCheck(){

        if ($('#title').val() == "" || null){
            console.log("Title error");
            return false;
        }

        var datePat = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/;
        var timeInput = $('#timeIn').val();

        if(!datePat.test(timeInput)){
            console.log("Date is wrong "+ timeInput);
            return false;
        }
        if($('#description').val() == "" || null){
            console.log("Description error");
            return false;
        }

        return true;
    }

    function deleteEvent(id){
        var data = {id: id};
        var stringify = {
            data: JSON.stringify(data)
        };
        $.ajax({
            type: "POST",
            url: "../php/eventsDELETE.php",
            data: stringify,
            success: function (result) {
                getContent(curMonth, curYear);
            }
        });
    }

    function editEvent(id){

        $('#title').val($('#name-'+id).html());
        $('#type').val($('#type-'+id).html());
        $('#timeIn').val($('#time-'+id).html().substr(0, 5));
        var date = $('#date-'+id).html();
        var day = date.substr(0,2);
        var month = date.substr(3,2);
        var year = date.substr(6);

        $('#dateIn').val(month+"/"+day+"/"+year);

        $('#durationIn').val($('#duration-'+id).html());
        if($('#publicVal-'+id).html() == "Public Event"){
            $('#publicBool').prop("checked", true);
        } else {
            $('#publicBool').prop("checked", false);
        }
        $('#description').val($('#descrip-'+id).html());

        deleteEvent(id);

    }

});