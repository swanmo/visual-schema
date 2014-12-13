define(['validators/util'], function (util) {
  var u = util.getInstance();
    var contentElements = [
      'annotation',
      'attribute',
      'attributeGroup',
      'complexType',
      'element',
      'group',
      'import',
      'include',
      'notation',
      'redefine',
      'simpleType'
     ];

    var attrs = [
      {n:'attributeFormDefault', t:'formChoice'},
      {n:'blockDefault', t:'blockSet'},
      {n:'elementFormDefault', t:'formChoice'},
      {n:'finalDefault'},
      {n:'id', t:'ID'},
      {n:'targetNamespace', t:'anyURI'},
      {n:'version', t:'token'},
      {n:'xml:lang', t:'string'}
     ];

    return {
        getValidationErrors: function(schemaElement) {
            return u.errorsOnly(u.validateAll(schemaElement, contentElements, attrs));
        }
    };
});
