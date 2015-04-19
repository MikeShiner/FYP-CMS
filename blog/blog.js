$(document).ready(function () {
        var offset = 0;
        setup();


        function setup() {
            loadElements(0);
        }

        $('#blogPrev').click(function () {

            if (!offset > 0) {
                return false;
            }

            offset = offset - 10;
            loadElements(offset);
        });


        $('#blogNext').click(function () {
            offset = offset + 10;
            loadElements(offset);
        });

        $('#save').click(function () {
            var posttitle = $('#title').text();
            var postcontent = $('#content').text();
            saveEntry(posttitle, postcontent);
        });

        function loadElements(offset) {

            $.ajax({
                type: "GET",
                url: "../php/blogGET.php?offset=" + offset,
                success: function (result) {
                    $('#pageElements').html("");
                    displayContent(result);
                }
            });

            console.log("10 blogs from: " + offset);
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
                    'class': "entry_container",
                    'html': decoded[i]['title']
                });
                var time = $('<div>', {
                    'id': "timestamp-" + id,
                    'class': "timestamp",
                    'html': decoded[i]['time']
                });
                var content = $('<div>', {
                    'class': "blog_paragraph",
                    'html': decoded[i]['content']
                });

                // Testing if event is public or not:

                itemContainer.append(title).append(time)
                    .append(content).appendTo('#blog_section');
            }
        }

});

