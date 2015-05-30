define(['jquery', 'page/editor', 'services/collectionService'],
    function($, editor, collectionService) {
        'use strict';
        function createSchema(collection) {
            var docName = $('#docName').val();

            collectionService.saveNewDocument(
                docName, collection.id, editor.val(), function() {});
        }

        return {
            init: function() {
            	collectionService.findAll(function(all) {
            		console.log('all', all);
            	});
            },
            create: function() {
                var coll = $('#collectionName').val();
                if (!coll || coll == '-1') {
                	console.log('OK collection', coll);
                    var newName = $('#newCollectionName').val();
                    collectionService.saveNewCollection(newName, createSchema);
                } else {
                	console.log('NULL collection', coll);
                    
                	createSchema({id: $('#collection').val()});
                }
            }
        };
    }
);
