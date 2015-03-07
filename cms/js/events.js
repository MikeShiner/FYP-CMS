/**
 * Created by Shiner on 06/03/2015.
 */
$(document).ready(function () {
    var changePos, highestId = 0;
    setup();

    var fullDate = new Date();
    var month = fullDate.getMonth();

    //Functions
    function setup() {
        getContent();
    }

    function getContent() {
        //get current page
        var url = "?page=" + page;
        // Ajax request:
        $.ajax({
            type: "GET",
            url: "php/events.php",
            success: function (result) {
                displayContent(result);
            }
        });
    }

    function displayContent(data) {
        var decoded = JSON.parse(data), tag, id;
        console.log(decoded);
        //for (var i = 0; i < decoded.length; i++) {
        //
        //    if (highestId < parseInt(decoded[i]['id'])){
        //        highestId = decoded[i]['id'];
        //    }
        //
        //    tag = decoded[i]['content_type'];
        //    id = decoded[i]['id'];
        //
        //    var itemContainer = $('<div>', {
        //        'class': 'itemContainer',
        //        'id': 'item-' + id
        //    });
        //
        //    var item = $('<' + tag + '/>', {
        //        'class': "item",
        //        'id': id,
        //        'html': decoded[i]['content'],
        //        'contentEditable': 'true'
        //    });
        //
        //    var toolbar = $('<img>', {
        //        'src': 'img/delete.png',
        //        'id': "del"+id,
        //        'class': 'toolbar',
        //        'width': '25px',
        //        'height': '25px'
        //    });
        //
        //    itemContainer.append(item).append(toolbar).appendTo('#elements');
        //    $(tag, {
        //        'class': 'myClass'
        //    }).appendTo('#elements');
        //}
    }





});