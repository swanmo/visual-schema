define(['validators/util'], function (util) {

	var attrs = [
      {n:'fixed', t:'boolean'},
      {n:'id', t:'ID'},
      {n:'value', u:'r', t:'nonNegativeInteger'}
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
