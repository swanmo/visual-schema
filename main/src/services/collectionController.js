define(['jquery', 'services/collectionService'],
    function($, collectionService) {
        'use strict';
        return {
            init: function() {
            	collectionService.findAll(function(all) {
            		console.log('all', all);
            	}) ;

            	//var coll = $('#collectionName').val();
            },
            create: function() {
                var coll = $('#collectionName').val();
                if (coll && parseInt(coll) > 0) {
                	console.log('OK collection', coll);
                	createCollection();
                } else {
                	console.log('NULL collection', coll);
                	collectionService.saveNewDocument();
                }
                
                // collectionService
                // collectionName
                // newCollectionName
            }
        };
    }
);
