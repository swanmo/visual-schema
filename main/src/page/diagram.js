define(['jquery', 'pagejs', 'root', 'xsd', 'page/editor'],
    function($, page, $root, xsd, editor) {
        'use strict';
        return {
            init: function() {
                $('#showXsd').on('click', function() {
                    
                    page('/xsd');
                    // $('#headRow').addClass('closed').removeClass('semi-open');


                }); // on
            } // init: function
        }
    });
