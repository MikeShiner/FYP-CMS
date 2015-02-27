/**
 * Created by Shiner on 30/01/2015.
 */
/**
 * Created by Shiner on 26/01/2015.
 */
$(document).ready(function () {
    var changePos, highestId=0;
    setup();

    //Functions
    function setup() {
        dbConnect();
        getContent();
    }


    function dbConnect() {
        $.ajax({
            type: "GET",
            url: "../php/connect.php",
            success: function (result) {
                $('#debug').append(result);
            }
        });
    }

    function getContent() {
        //get current page
        var page = $('#options').find('h3').html().substring(6);
        var url = "?page=" + page;
        // Ajax request:
        $.ajax({
            type: "GET",
            url: "php/io.php" + url,
            success: function (result) {
                displayContent(result);
            }
        });
    }

    function displayContent(data) {
        var decoded = JSON.parse(data), tag, id;
        for (var i = 0; i < decoded.length; i++) {

            if (highestId < parseInt(decoded[i]['id'])){
                highestId = decoded[i]['id'];
            }

            tag = decoded[i]['content_type'];
            id = decoded[i]['id'];

            var itemContainer = $('<div>', {
                'class': 'itemContainer',
                'id': 'item-' + id
            });

            var item = $('<' + tag + '/>', {
                'class': "item",
                'id': id,
                'html': decoded[i]['content'],
                'contentEditable': 'true'
            });

            var toolbar = $('<img>', {
                'src': 'img/delete.png',
                'id': "del"+id,
                'class': 'toolbar',
                'width': '25px',
                'height': '25px'
            });

            itemContainer.append(item).append(toolbar).appendTo('#elements');
            $(tag, {
                'class': 'myClass'
            }).appendTo('#elements');
        }
    }

    function addElement(tag){
        highestId++;
        var id = highestId;
        var html = "New " + tag;
        var itemContainer = $('<div>', {
            'class': 'itemContainer',
            'id': 'item-' + id
        });
        var item = $('<' + tag + '/>', {
            'class': "item",
            'id': id,
            'html': "New " + tag,
            'contentEditable': 'true'
        });
        itemContainer.append(item).appendTo('#elements');
        dataArray = {id: id, tag: tag, content: html};

        var page = $('#options').find('h3').html().substring(6);
        $stringify = JSON.stringify(dataArray);
        var data = {
            page: page,
            data: $stringify
        };
        $.ajax({
            type: "POST",
            url: "php/add.php",
            data: data,
            success: function (result) {
                $('#debug').html(result);
                $('#addElement').selectmenu();
            }
        });
    }

    $('#addElement').selectmenu({
        change : function (e){
            var input = $('#addElement').val();
            if (input == "Heading"){
                addElement("H1");
            } else if (input == "Paragraph"){
                addElement("P");
            }
        }
    });

    //Activates when an edit is made
    $('#elements').on('blur', '.item', function(e){
        var tag, id, content;
        tag = e.target.tagName;
        id = e.target.id;
        content = $('#' + id).html();
        addToLocal(tag, id, content);
    }).on('click', '.toolbar', function(e){
        deleteItem(e.target.id.substr(3));
    }).sortable({
        cancel: '.item', update: function (event, ui) {
            changePos = $('#elements').sortable('serialize');
            console.log("Serialize: " + changePos);
        }
    });

    function deleteItem(id){
        $('#item-'+id).remove();
        var page = $('#options').find('h3').html().substring(6);
        console.log(id);
        var data = {
            id: id,
            page: page
        };
    console.log(data);
        $.ajax({
            type: "POST",
            url: "php/delete.php",
            data: data,
            success: function (result) {
                $('#debug').html(result);

            }
        });
    }

    function addToLocal(tag, id, content){
        console.log("ID: " + id + " Tag: " + tag + " Content: " + content);
        object = {
            'id':id,
            'tag': tag,
            'content': content
        };
        console.log(localStorage);
        localStorage.setItem(id, JSON.stringify(object));
    }

    function postContent(dataArray) {
        var page = $('#options').find('h3').html().substring(6);
        $stringify = JSON.stringify(dataArray);
        var data = {
            page: page,
            data: $stringify
        };
        if (changePos != 'NULL'){
            data.positions = changePos
        }
        console.log(data);
        $.ajax({
            type: "POST",
            url: "php/update.php",
            data: data,
            success: function (result) {
                $('#debug').html(result);
                console.log(localStorage);
            }
        });
    }

    $('#clearStorage').click(function () {
        clearLocalStorage();
    });

    function clearLocalStorage() {
        localStorage.clear();
        window.location = window.location;
    }

    $('#homeSubmit').click(function () {
        var page = $('#options').find('h3').html().substring(6);
        var objectArray = [];
        console.log(localStorage);
        //Get new positions of data
        //foreach()
        console.log(changePos);
        for (var i = 0, len = localStorage.length; i < len; ++i) {
            storageObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
            objectArray.push({id: storageObj['id'], tag: storageObj['tag'], content: storageObj['content']});
        }
        console.log(objectArray);
        //Perform some validation here
        postContent(objectArray);
    });

});