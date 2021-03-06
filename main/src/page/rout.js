define(['jquery', 'pagejs', 'root', 'xsd', 'page/editor', 'services/collectionController'],
    function($, page, $root, xsd, editor, collectionController) {
        'use strict';

        function show(ctx) {
            $root.show();
            $('#back').show();
        }

        function fromStore(ctx) {
            console.log('fromStore', ctx.params.name);
            collectionController.fromStore(ctx.params.name);
        }

        function showNew(ctx) {
            $('#saveXsd').hide();
            $('#cancelSave').show();
            $('#saveNewForm').show();
            $('#showXsd').hide();
            $('.new-input').addClass('show');
        }

        function loadStored(ctx, next) {
            $('#saveXsd').hide();
            $('#updateXsd').show();
            next();
        }
        function load(ctx, next) {
            $('.header').addClass('small');
            $('.perifer').addClass('small-header');

            $('#showXsd').hide();
            $('#saveXsd').hide();
            $('#updateXsd').hide();
            
            $('#editor').addClass('ina');
            setTimeout(
                function(){
                    xsd.show(editor.val());
                    next();
                },
                200);
        }

        function notfound(ctx) {
            console.log('notfound', ctx);
        }

        function index() {
            $root.hide();

            $('.header').removeClass('small');
            
            $('#back').hide();
            $('#cancelSave').hide();
            $('#saveNewForm').hide();
            $('#updateXsd').hide();
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

        function saveNew() {
          console.log('saveNew');
          collectionController.create();
        }
        

        function setupNavigation() {
            $('#showXsd').on('click', function() {
                page('/xsd/');
                // $('#headRow').addClass('closed').removeClass('semi-open');
            }); // on

            $('#saveXsd').on('click', function() {
                page('/new');
            }); // on

            $('#updateXsd').on('click', function() {
                collectionController.update();
            }); // on
            
            $('#saveNewForm').on('click', function() {
                page('/xsd/new');
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
                page('xsd/new', saveNew, show);
                page('xsd/:name', loadStored, fromStore);
                page('*', notfound);
                page();

                setupNavigation();
            }
        };

    }
);
