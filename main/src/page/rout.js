define(['jquery', 'pagejs', 'root', 'xsd', 'page/editor', 'root'],
    function($, page, $root, xsd, editor) {
        'use strict';

        function show(ctx) {
            console.log('show', ctx.params.name);
            $root.show();
            $('#back').show();
        }

        function showNew(ctx) {
            $('#saveXsd').hide();
            $('#cancelSave').show();
            $('#saveNewForm').show();
            $('#showXsd').hide();
            $('.new-input').addClass('show');
        }

        function load(ctx, next) {
            $('.header').addClass('small');
            $('.perifer').addClass('small-header');

            $('#showXsd').hide();
            $('#saveXsd').hide();
            
            $('#editor').addClass('ina');
            setTimeout(
                function(){
                    xsd.show(editor.val());
                    next();
                },
                200);
            console.log('load', ctx.params.name);
        }

        function notfound(ctx) {
            console.log('notfound', ctx);
        }

        function index() {
            $root.hide();

            $('.header').removeClass('small');
            $('.perifer').removeClass('small-header');
            $('#editor').removeClass('ina');
            $('#back').hide();
            $('#cancelSave').hide();
            $('#saveNewForm').hide();
            $('#showXsd').show();
            $('#saveXsd').show();
            $('.new-input').removeClass('show');
          console.log('index');
        }

        function learn() {
          console.log('learn');
        }

        function about() {
          console.log('about');
        }

        function setupNavigation() {
            $('#showXsd').on('click', function() {
                page('/xsd');
                // $('#headRow').addClass('closed').removeClass('semi-open');
            }); // on

            $('#saveXsd').on('click', function() {
                page('/new');
            }); // on

            $('#cancelSave').on('click', function() {
                page('/');
            }); // on


        }

        return {
            init: function() {
                page.base('/');
                page('/', index);
                page('learn', learn);
                page('about', about);
                page('xsd/', load, show);
                page('new/', showNew);
                page('xsd/:name', load, show);
                page('*', notfound);
                page();

                setupNavigation();
            }
        };

    }
);
