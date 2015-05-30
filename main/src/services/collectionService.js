define(['services/store',
    'services/model/collectionModel',
    'services/model/collectionFactory',
    'services/model/schemaFactory'],
    function(store, CollectionModel, collectionFactory,schemaFactory) {
        'use strict';
        var cStore, sStore;

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
                        if (fnInited)
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

            saveNewCollection: function(name, fnDone) {
                init();
                store('collection', function(collectionStore) {
                    collectionStore.create(collectionFactory(name, undefined, 'local'), fnDone);
                });
            },

            saveNewDocument: function(title, collectionId, xsdStr, fnDone) {
                init();
                store('schema', function(schemaStore) {
                    schemaStore.create(schemaFactory(title, collectionId, xsdStr, undefined), fnDone);
                }); 
            }
        };
    }
);