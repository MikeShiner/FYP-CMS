/**
 * Created by Shiner on 07/03/2015.
 */
$(document).ready(function () {
    var changePos, highestId = 0, page="Home", totalElements =0;
    setup();

    function setup(){
        clearStorage();
        loadElements();
    }

    // #pageElements selectable & blur event
    $('#pageElements').sortable({cancel: '.item', update: function () {
            changePos = $('#pageElements').sortable('serialize');
            console.log("Serialize: " + changePos);
    }})
        .on('blur', '.item', function(e){
        var tag, id, content;
        tag = e.target.tagName;
        id = e.target.id;
        content = $('#' + id).html();
        console.log("ID Change: " + id);
        saveToLocal(tag, id, content);
    })
        .on('click', '.toolbar', function(e){
        deleteItem(e.target.id.substr(3));
    });

    // Click Events
    /////////////////////////////////////////////////////

    //Change Page Dropdown
    $('#pageSelect').change(function(){
        loadElements();
    });

    $('#clearStorage').click(function(){clearStorage()});

    $('#save').click(function(){
            var objectArray = [];
            //Get new positions of data
            //foreach()
            console.log(changePos);
            for (var i = 0, len = localStorage.length; i < len; ++i) {
                storageObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
                objectArray.push({id: storageObj['id'], tag: storageObj['tag'], content: storageObj['content']});
            }
            console.log(objectArray);
            updateContent(objectArray);
    });

    $('#add').click(function(){
        var input = $('#type').val();
        var content = $('#description').val();
        if (input == "Heading"){
            addElement("H1", content);
        } else if (input == "Paragraph"){
            addElement("P", content);
        }
    });
    // Main Functions

    function loadElements(){
        page = $('#pageSelect').val();
        console.log("Sensed page: "+ page);
        // Ajax request:
        $('#pageElements').html("<img src='img/pre.gif' />");
        $.ajax({
            type: "GET",
            url: "php/EPget.php?page=" + page,
            success: function (result) {
                displayElements(result);
            }
        });
        $('#curPage').html("Page: " + page);
    }

    function displayElements (data){
        var decoded = JSON.parse(data), tag, id;

        $('#pageElements').html("");
        //Looping through each result:
        for (var i = 0; i < decoded.length; i++) {
            tag = decoded[i]['content_type'];
            id = decoded[i]['id'];
            //Get the highest ID available (for adding new ones.)
            if (highestId < parseInt(decoded[i]['id'])){
                highestId = decoded[i]['id'];
            }
            //Each item's container.
            var itemContainer = $('<div>', {'class': 'itemContainer', 'id': 'item-' + id});
            //Editable text of each item.
            var item = $('<' + tag + '/>', {'class': "item", 'id': id, 'html': decoded[i]['content'],
                'contentEditable': 'true'});
            var toolbar = $('<img>', {'src': 'img/delete.png', 'id': "del"+id, 'class': 'toolbar', 'width': '25px',
                'height': '25px'});

            itemContainer.append(item).append(toolbar).appendTo('#pageElements');
            totalElements = totalElements+1;
        }
        // Preloader reset

    }

    function updateContent(objectArray){
        var stringify = JSON.stringify(objectArray);
        var data = {
            page: page,
            data: stringify
        };
        // Check if global variable has been update with new positions.
        if (changePos != 'NULL'){
            data.positions = changePos
        }
        $.ajax({
            type: "POST",
            url: "php/EPupdate.php",
            data: data,
            success: function (result) {
                console.log(result);
                $('#feedback').html(result);
                loadElements();
            }
        });

        console.log("Update function, page: "+ page);
    }

    function deleteItem(id){
        var data = {
            id: id
        };
        console.log(data);
        $.ajax({
            type: "POST",
            url: "php/EPdelete.php",
            data: data,
            success: function (result) {
                $('#feedback').html(result);
                loadElements();

            }
        });
    }

    function saveToLocal(tag, id, content){
        //Do we need id in the object when it's the storage id? PHP?
        console.log("ID: " + id + " Tag: " + tag + " Content: " + content);
        object = {
            'id':id,
            'tag': tag,
            'content': content
        };
        console.log(localStorage);
        localStorage.setItem(id, JSON.stringify(object));
    }

    function clearStorage(){
        localStorage.clear();
        console.log(localStorage);
    }

    function addElement(tag, content) {
        var page = $('#pageSelect').val();
        var id = (parseInt(highestId) + 1);
        var itemContainer = $('<div>', {
            'class': 'itemContainer',
            'id': 'item-' + id
        });
        var item = $('<' + tag + '/>', {
            'class': "item",
            'id': id,
            'html': content,
            'contentEditable': 'true'
        });
        itemContainer.append(item).appendTo('#pageElements');
        highestId = parseInt(highestId) + 1;
        var data = {
            id: id,
            pos: (totalElements+1),
            tag: tag,
            content: content,
            page: page};
        $.ajax({
            type: "POST",
            url: "php/EPadd.php",
            data: data,
            success: function (result) {
                $('#feedback').html(result);
                loadElements();

            }
        });
    }
    
});