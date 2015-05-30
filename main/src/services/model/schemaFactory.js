define([],
    function() {
        'use strict';

        var statusCreated = 1,
            statusEdited = 2,
            statusDeleted = 3;

        var makeSchema = function(_id, _title, _collectionId, _xsdData, initiatedBy) {
            var item = {
                id: _id,
                status: statusCreated,
                title: _title,
                description: undefined,
                collectionId: _collectionId,
                saved: JSON.stringify(new Date()),
                accessed: JSON.stringify(new Date()),
                type: 'usr',
                xsdData: _xsdData,
                owner: initiatedBy
            };
            return item;
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

        return function(title, collectionId, xsdStr, initiatedBy) {
            return makeSchema(generateUUID(), title, collectionId, xsdStr, initiatedBy);
        };

    }
);
