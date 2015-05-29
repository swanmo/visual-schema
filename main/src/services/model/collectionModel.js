define([],
    function() {
        'use strict';

        return function(dbCollection, schemaArr) {
            this.store = dbCollection;
            this.schemas = schemaArr;
        };

    }
);
