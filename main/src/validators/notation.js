define(['validators/util'], function (util) {
    var contentElements = [
      'annotation'
     ];

    return {
        getValidationErrors: function(schemaElement) {
            return util.getInstance().validateChildren(schemaElement, contentElements);
        }
    };
});
