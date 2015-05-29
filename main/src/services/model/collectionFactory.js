define([],
    function() {
        'use strict';

        var statusCreated = 1,
            statusEdited = 2,
            statusDeleted = 3;

        var makeCollection = function(_id, _title, _desc, _documents, initiatedBy) {
            var collectionItem = {
                id: _id,
                status: statusCreated,
                title: _title,
                description: _desc,
                saved: JSON.stringify(new Date()),
                accessed: JSON.stringify(new Date()),
                type: 'usr',
                owner: initiatedBy,
                docs: _documents
            };
            return collectionItem;
        };

        var generateUUID = function() {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        };

        // var makeDocument = function(_id, _title, _desc, _collectionId, xsdStr, initiatedBy) {
        //     var docItem = {
        //         id: _id,
        //         status: statusCreated,
        //         title: _title,
        //         description: _desc,
        //         saved: JSON.stringify(new Date()),
        //         accessed: JSON.stringify(new Date()),
        //         type: 'usr',
        //         owner: initiatedBy,
        //         xsdData: xsdStr
        //     };
        //     return docItem;
        // };

        return function(title, desc, initiatedBy) {
            return makeCollection(generateUUID(), title, desc, initiatedBy);
        };

    }
);
