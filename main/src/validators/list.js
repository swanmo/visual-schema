define(['validators/util'], function (util) {
    var contentElements = [
      'annotation',
      'simpleType'
    ];
    var attrs = [
      {n:'id', t:'ID'},
      {n:'itemType', t:'QName'}
     ];

    return {
        getValidationErrors: function(schemaElement) {
        	return util.getInstance().validateAll(schemaElement, contentElements, attrs);
        }
    };
});
