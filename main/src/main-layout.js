requirejs.config({
    paths: {
        'jquery': '../lib/jquery',
        'underscore': '../lib/underscore',
        "jquery.bootstrap": "../lib/bootstrap.min"
    },

    shim: {
        'underscore': {
            exports: '_'
        },
        'jquery.bootstrap': {
            deps: ["jquery"]
        }
    }
});

define(['jquery'],
function ($) {
    $('.collapser').on('click', function(){
        var d = $(this).next().css("display");
        if (d == "none")
            $(this).next().css("display", "inline-block");
        else
            $(this).next().css("display", "none");
    })

    // $( "li.third-item" ).next()

    // domSetup.setup();
});


