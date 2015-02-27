/**
 * Created by Shiner on 26/01/2015.
 */
$(document).ready(function () {

    setup();

    //Functions
    function setup(){
        getStyle();

    }

    function getStyle(){

        var CookieSet = $.cookie('stylesheet');
        if (CookieSet === 'undefined') {
            console.log("Can't find stylesheet.");
            $.cookie("stylesheet", 'css/visitor.css');
            console.log("stylesheet visitor added.");
        }
        if (jQuery.cookie('stylesheet')) {
            $('head').append('<link rel="stylesheet" type="text/css" href="'+jQuery.cookie('stylesheet')+'">');
        }
        console.log(jQuery.cookie("stylesheet"));
    }

    $('#visitor').click(function(){
        $.cookie('stylesheet', 'css/visitor.css');
        console.log("visitor css cookie added");
        location.reload();
    });

    $('#member').click(function(){
        $.cookie('stylesheet', 'css/member.css');
        console.log("member css cookie added");
        location.reload();
    })

});