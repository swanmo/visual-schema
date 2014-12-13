define(['validators/util'], function (util) {
    var contentElements = [
      'annotation'
    ];
    var attrs = [
      {n:'id', t:'ID'},
      {n:'schemaLocation', u:'r'}
     ];

    return {
        getValidationErrors: function(schemaElement) {
        	return util.getInstance().validateAll(schemaElement, contentElements, attrs);
        }
    };
});
