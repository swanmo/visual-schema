// http://code.tutsplus.com/tutorials/working-with-indexeddb--net-34673

define([], function() {
	var idbSupported = false;
	var db = undefined;
	var dbName = 'exs-v0';
	var dbVer = 1;
	var subscribers = [];
 

    if ('indexedDB' in window) {
        idbSupported = true;
        if (idbSupported) {
	        var openRequest = window.indexedDB.open(dbName, dbVer);
	 
	        openRequest.onupgradeneeded = function(e) {
                console.log('running onupgradeneeded', e);
	            var thisDB = e.target.result;
	 
	            if(!thisDB.objectStoreNames.contains('schema')) {
	                thisDB.createObjectStore('schema');
	            }
	        };
	 
	        openRequest.onsuccess = function(e) {
	            console.log('Open success', e);
	            db = e.target.result;
	        };
	 
	        openRequest.onerror = function(e) {
	            console.log('Error', e);
	            console.dir(e);
	        };
	    }
    }
	
	var makeItem = function(_id, xsdStr, initiatedBy) {
		var storeItem = {
			id:_id,
			saved: JSON.stringify(new Date()),
			type: 'usr',
			owner: initiatedBy,
			xsdData: xsdStr
		};
		return storeItem;
	};

	var generateUUID = function() {
	    var d = new Date().getTime();
	    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = (d + Math.random()*16)%16 | 0;
	        d = Math.floor(d/16);
	        return (c === 'x' ? r : (r&0x3|0x8)).toString(16);
	    });
	    return uuid;
	};

	var notifySubscribers = function(action, item) {
		console.log('notifySubscribers', subscribers);
		for (var i = subscribers.length - 1; i >=0; i--) {
			console.log('notify', item);
			item.saved = JSON.parse(item.saved);
			subscribers[i].call(this, action, item);
		}
	};
	
	return {
		addItem: function(item, initiatedBy) {
			console.log('addItem, initiatedBy', initiatedBy);
			var id = generateUUID();
			var storeItem = makeItem(id, item, initiatedBy);
			var transaction = db.transaction(['schema'], 'readwrite');
			var store = transaction.objectStore('schema');

			var request = store.add(storeItem, id);
			request.onerror = function(e) {
			    console.log('error', e.target.error.name);
			    window.alert('Sorry, its not possible to store this document on your computer\n' + e.target.error.name);
			};
			 
			request.onsuccess = function(e) {
			    console.log('OK, item saved', e);
			    notifySubscribers('new', storeItem);
			};
		},
		subscribe: function(fnSubscriber) {
			subscribers.push(fnSubscriber);
		},
		findAll: function(fnAll) {
			var objectStore = db.transaction('schema').objectStore('schema');
			var all = [];
			objectStore.openCursor().onsuccess = function(event) {
			  var cursor = event.target.result;
			  if (cursor) {
			  	var stored = {key: cursor.key, value: cursor.value};
			  	stored.value.saved = JSON.parse(stored.value.saved);
			    all.push({key: cursor.key, value: cursor.value});
			    cursor.continue();
			  }
			  else {
			    fnAll.call(this, all);
			  }
			};
		}
	};
});