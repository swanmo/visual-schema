define(['jquery', 'pagejs', 'root', 'xsd', 'page/editor', 'root'],
    function($, page, $root, xsd, editor) {
        'use strict';

        function show(ctx) {
            console.log('show', ctx.params.name);
            $root.show();
        }

        function load(ctx, next) {
            $('.header').addClass('small');
            $('.perifer').addClass('small-header');

            $('#showXsd').hide();
            $('#saveXsd').hide();
            
            $('#editor').slideUp(function() {
                next();
            });
            xsd.show(editor.val());

            console.log('load', ctx.params.name);
        }

        function notfound(ctx) {
            console.log('notfound', ctx);
        }

        function index() {
            $root.hide();
            $('.header').removeClass('small');
            $('.perifer').removeClass('small-header');
          $('#editor').slideDown(function() {
            $('#showXsd').show();
            $('#saveXsd').show();
          });
          console.log('index');
        }

        function learn() {
          console.log('learn');
        }

        function about() {
          console.log('about');
        }

        return {
            init: function() {
                page.base('/');
                page('/', index);
                page('learn', learn);
                page('about', about);
                page('xsd/', load, show);
                page('xsd/:name', load, show);
                page('*', notfound);
                page();
            }
        };

    }
);
