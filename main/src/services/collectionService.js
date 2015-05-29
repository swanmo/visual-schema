define(['services/store', 'services/model/collectionModel', 'services/model/collectionFactory'],
    function(store, CollectionModel, collectionFactory) {
        'use strict';


        var assemble = function(collections, schemas) {
            var schemaByCollection = byCollection(schemas);
            var results = [];
            for (var ci = 0; ci < collections.length; ci++) {
                results.push(new CollectionModel(collections[ci], schemaByCollection[collections[ci].id]));
            }
            return results;
        };

        var byCollection = function(schemas) {
            var results = {};
            for (var si = 0; si < schemas.length; si++) {
                var arr = results[schemas[si].collectionId];
                if (arr) {
                    arr.push(schemas[si]);
                } else {
                    results[schemas[si].collectionId] = [];
                    results[schemas[si].collectionId].push(schemas[si]);
                }
            }
        };
        var isInitialized = false;

        var init = function(fnInited) {
            console.log('init ALPHA');
            if (isInitialized) {
                return;
            }
            isInitialized = true;
            console.log('init BRAVO');

            store('collection', function(collectionStore) {
                console.log('init CHARLIE', collectionStore);                
                collectionStore.findAll(function(allCollections) {
                    console.log('init CHARLIE callback');
                    if (allCollections && allCollections.length > 0) {
                        fnInited.call(this);
                    } else {
                        collectionStore.create(collectionFactory('Default collection', undefined, 'local'));
                    }
                });
            });
        };
        init();
        var findAllFn = undefined;
        return {
            findAll: function(fnAll) {
                var c, s;
                console.log('findAll alpha');
                store('collection', function(collectionStore) {
                    console.log('findAll bravo');
                    collectionStore.findAll(function(allCollections) {
                        c = allCollections;
                        if (s) {
                            fnAll.call(this, assemble(c, s));
                        }
                    });
                    store('schema', function(schemaStore) {
                        schemaStore.findAll(function(allSchemas) {
                            s = allSchemas;
                            if (c) {
                                fnAll.call(this, assemble(c, s));
                            }
                        });
                    });
                });
            },

            saveNewCollection: function(coll) {
                init();
                collectionStore.create(coll, 'local');
            },

            saveNewDocument: function(schemaDoc) {
                init();
                schemaStore.create(schemaDoc, 'local');
            }
        };
    }
);
