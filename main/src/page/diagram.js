define(['jquery', 'root', 'xsd', 'page/editor'],
    function($, $root, xsd, editor) {
        'use strict';
        return {
            init: function() {
                $('#showXsd').on('click', function() {

                    // $('#headRow').addClass('closed').removeClass('semi-open');

                    $('#editor').slideUp(function() {
                        // $('#leftie').slideToggle('fast');

                        $(this).hide();
                        // $('#showOptions').hide();

                        $root.show();
                        xsd.show(editor.val());
                    });
                }); // on
            } // init: function
        }
    });
