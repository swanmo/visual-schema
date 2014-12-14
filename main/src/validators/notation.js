define(['validators/util'], function(util) {
    var contentElements = [
      'annotation'
     ];

    var attrs = [
        {
            n: 'id',
            t: 'ID'
        },
        {
            n: 'name',
            t: 'NCName',
            u: 'r'
        },
        {
            n: 'public'
        },
        {
            n: 'system'
        }
     ];

    return {
        getValidationErrors: function(schemaElement) {
            return util.getInstance().validateAll(schemaElement, contentElements, attrs);
        }
    };
});
