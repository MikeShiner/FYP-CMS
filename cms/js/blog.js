/**
 * Created by Shiner on 25/03/2015.
 */
$(document).ready(function () {
    var offset = 0;
    setup();


    function setup() {
        loadElements(0);
    }

    $('#blogPrev').click(function() {

        if (!offset > 0) {return false;}

        offset = offset - 10;
        loadElements(offset);
    });


    $('#blogNext').click(function() {
        offset = offset + 10;
        loadElements(offset);
    });

    $('#save').click(function() {
       var posttitle = $('#title').text();
        var postcontent = $('#content').text();
        saveEntry(posttitle, postcontent);
    });

    function loadElements(offset){

        $.ajax({
            type: "GET",
            url: "../php/blogGET.php?offset=" + offset,
            success: function (result) {
                $('#pageElements').html("");
                displayContent(result);
            }
        });

        console.log("10 blogs from: "+ offset);
    }

    function displayContent(data) {
        var decoded = JSON.parse(data), id;
        console.log(decoded);
        for (var i = 0; i < decoded.length; i++) {

            //tag = decoded[i]['content_type'];
            id = decoded[i]['id'];

            var itemContainer = $('<div>', {
                'class': 'eventContainer',
                'id': 'blog-' + id
            });

            // Putting the date round the right way: LATER
            var title = $('<div>', {
                'class': "eventItem blogtitle",
                'html': decoded[i]['title']
            });
            var time = $('<div>', {
                'class': "eventItem blogtime",
                'html': decoded[i]['time']
            });
            var content = $('<div>', {
                'class': "eventDes",
                'html': decoded[i]['content']
            });

            // Testing if event is public or not:

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


            itemContainer.append(title).append(time)
                .append(content).appendTo('#pageElements');
        }
    }

    function saveEntry(posttitle, postcontent){

        var stringify = JSON.stringify({title: posttitle, content: postcontent});
        var data = {
            data: stringify
        };

        $.ajax({
            type: "POST",
            url: "../php/blogPOST.php",
            data: data,
            success: function (result) {
                loadElements(offset);
            }
        });
    }

});