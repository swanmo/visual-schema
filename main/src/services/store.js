// http://code.tutsplus.com/tutorials/working-with-indexeddb--net-34673

define(['services/notificationService'], function(notification) {
    
    var stores = ['schema', 'collection'];
    var all = {};
    function dbRepository(_repoName, doneFn) {
        var isInitialized = false;

        function initAll(whenDoneFn) {
            var idbSupported = false;
            var db;
            var dbName = 'exs-v1';
            var dbVer = 3;

            if (!isInitialized) {
                isInitialized = true;
                if ('indexedDB' in window) {
                    idbSupported = true;
                    if (idbSupported) {
                        var openRequest = window.indexedDB.open(dbName, dbVer);

                        openRequest.onupgradeneeded = function(e) {
                            console.log('onupgradeneeded');
                            var thisDB = e.target.result;
                            for (var i = 0; i < stores.length; i++) {
                                if (!thisDB.objectStoreNames.contains(stores[i])) {
                                    console.log('onupgradeneeded creating', stores[i]);
                                    thisDB.createObjectStore(stores[i]);
                                }
                            }

                        };

                        openRequest.onsuccess = function(e) {
                            db = e.target.result;
                            whenDoneFn.call(this, db);
                        };

                        openRequest.onerror = function(e) {
                            console.log('onerror');
                            console.dir(e);
                        };
                        openRequest.onblocked = function(e) {
                            console.log('blocked', _repoName, e);
                        };

                    }
                } else {
                    window.alert('Browser db cannot be initialized');
                }
            }
        }

    
        if (all[_repoName]) {
            console.log('store 1.a', _repoName, all[_repoName]);
            doneFn.call(this, all[_repoName]);
        } else {
            console.log('store 1.b', _repoName);
            initAll(function(db) {
                console.log('store 2 inited', db);
                all[_repoName] = itemStore(db);
                console.log('store 3 callback', all[_repoName]);
                doneFn.call(this, all[_repoName]);
            });   
        }

        var repoName = _repoName;

        var notifySubscribers = function(action, item) {
            // setTimeout(function() {
            //     console.log('notifySubscribers', subscribers);
            //     for (var i = subscribers.length - 1; i >= 0; i--) {
            //         console.log('notify', item);
            //         if (item.saved) {
            //             item.saved = JSON.parse(item.saved);
            //         }

            //         subscribers[i].call(this, action, item);
            //     }
            // }, 30);
        };

        function itemStore(db) {
            var xdb = db;
            var objectStore = function(dbMode) {
                var transaction = xdb.transaction([repoName], dbMode);
                return transaction.objectStore(repoName);
            };
            return {
                create: function(storeItem, doneFn) {
                    var store = objectStore('readwrite');


                    var request = store.add(storeItem, storeItem.id);
                    request.onerror = function(e) {
                        notification.error('creation error', e.target.error.name);
                        window.alert('Sorry, its not possible to store this document on your computer\n' + e.target.error.name);
                    };

                    request.onsuccess = function(e) {
                        console.debug('OK, item saved 22', e);
                        doneFn.call(this, storeItem);
                    };
                },
                find: function(_id, fnFound) {
                    var store = objectStore('readonly');
                    var objectStoreRequest = store.get(_id);

                    objectStoreRequest.onsuccess = function() {
                        var results = objectStoreRequest.result;
                        fnFound.call(this, results);
                    };
                    objectStoreRequest.onerror = function(e) {
                        notification.error('read error', e.target);
                        window.alert('Sorry, its not possible to read this document on your computer\n' + e.target.error.name);
                    };
                },
                delete: function(_id, fnDone) {
                    var store = objectStore('readwrite');

                    var delRequest = store.delete(_id);

                    delRequest.onsuccess = function() {
                        console.log('delete successful');
                        fnDone.call(this);
                        notifySubscribers('deleted', {
                            id: _id
                        });
                    };
                    delRequest.onerror = function(e) {
                        console.log('delete error', e.target);
                        window.alert('Sorry, its not possible to delete this document from your computer\n' + e.target.error.name);
                    };
                },
                findAndUpdate: function(_id, fnFound, _xsdData) {
                    var store = objectStore('readwrite');
                    var req = store.get(_id);

                    req.onsuccess = function() {
                        var results = req.result;

                        results.accessed = new Date();
                        results.xsdData = _xsdData;
                        var request = store.put(results, _id);
                        fnFound.call(this, results);

                        request.onerror = function(e) {
                            console.log('error', e.target.error.name);
                            window.alert('Sorry, its not possible to update this document on your computer\n' + e.target.error.name);
                        };

                        request.onsuccess = function(e) {
                            console.log('OK, item updated', e);
                        };
                    };
                },
                findAll: function(fnAll) {
                    console.log('store findAll alpha', objectStore);
                    var os = objectStore('readonly');
                    var all = [];
                    os.openCursor().onsuccess = function(event) {
                        var cursor = event.target.result;
                        if (cursor) {
                            var stored = {
                                key: cursor.key,
                                value: cursor.value
                            };
                            stored.value.saved = JSON.parse(stored.value.saved);
                            all.push({
                                key: cursor.key,
                                value: cursor.value
                            });
                            cursor.continue();
                        } else {
                            fnAll.call(this, all);
                        }
                    };
                }
            };
        };
    };
    return dbRepository;
});
