define(['validators/util'], function (util) {

	var attrs = [
      {n:'id', t:'ID'},
      {n:'value', u:'r'}
    ];

    var contentElements = [
      'annotation'
     ];

    return {
        getValidationErrors: function(schemaElement) {
            return util.getInstance().validateAll(schemaElement, contentElements, attrs);
        }
    };
});
