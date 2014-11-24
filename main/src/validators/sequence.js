define(['validators/util'], function (util) {
    var contentElements = [
      'annotation',
      'any',
      'choice',
      'element',
      'group',
      'sequence'
     ];

    return {
        getValidationErrors: function(schemaElement) {
            return util.getInstance().validateChildren(schemaElement, contentElements);
        }
    };
});
