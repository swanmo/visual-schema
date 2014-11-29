define(['validators/util'], function (util) {
    return {
        getValidationErrors: function(schemaElement) {
            return util.getInstance().validateChildren(schemaElement, []);
        }
    };
});
