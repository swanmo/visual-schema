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
                results.push(new CollectionModel(collections[ci].value, schemaByCollection[collections[ci].value.id]));
            }
            return results;
        };

        var byCollection = function(schemas) {
            var results = {};

            for (var si = 0; si < schemas.length; si++) {
                var schema = schemas[si].value;
                var arr = results[schema.collectionId];
                if (arr) {
                    arr.push(schema);
                } else {
                    results[schema.collectionId] = [];
                    results[schema.collectionId].push(schema);
                }
            }
            return results;
        };

        var isInitialized = false;

        var init = function(fnInited) {
            if (isInitialized) {
                return;
            }
            isInitialized = true;

            store('collection', function(collectionStore) {
                collectionStore.findAll(function(allCollections) {
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
            find: function(schemaId, fnFound) {
                store('schema', function(schemaStore) {
                    schemaStore.find(schemaId, function(schema) {
                        fnFound.call(this, schema);
                    });
                });
            },
            findAll: function(fnAll) {
                var c, s;
                
                store('collection', function(collectionStore) {
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
            },

            updateDocument:function(id, fnDone, xsdData) {
                store('schema', function(schemaStore) {
                    schemaStore.findAndUpdate(id, fnDone, xsdData);
                });
            }

        };
    }
);