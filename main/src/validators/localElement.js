define(['validators/util'], function (util) {
    var u = util.getInstance();

    var attrs = [
      {n:'block', t:'blockSet'},
      {n:'default', t:'string'},
      {n:'fixed', t:'string'},
      {n:'form', t:'formChoice'},
      {n:'id', t:'ID'},
      {n:'maxOccurs', t:'nonNegativeInteger'},
      {n:'minOccurs', t:'nonNegativeInteger'},
      {n:'name', t:'NCName'},
      {n:'nillable', t:'boolean'},
      {n:'ref', t:'QName'},
      {n:'type', t:'QName'}
    ];

    var contentElements = [
      'annotation',
      'complexType',
      'key',
      'keyref',
      'simpleType',
      'unique'
     ];

    return {
        getValidationErrors: function(schemaElement) {
            return u.errorsOnly(u.validateAll(schemaElement, contentElements, attrs));
        }
    };
});
