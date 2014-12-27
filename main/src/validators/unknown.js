define([], function () {
    return {
        getValidationErrors: function(schemaElement) {
            return undefined; //[{level:'E', message: 'Element ' + schemaElement.tagName + ' is invalid at this location'}];
        }
    };
});
