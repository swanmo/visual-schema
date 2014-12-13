// https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/key.html
define(['validators/util'], function (util) {
  var u = util.getInstance();
  var contentElements = [
    'annotation',
    'field',
    'selector'
  ];

  var attrs = [
    {n:'id', t:'ID'},
    {n:'name', t:'NCName', u:'r'}
  ];

  return {
    getValidationErrors: function(schemaElement) {
      return u.errorsOnly(u.validateAll(schemaElement, contentElements, attrs));
    }
  };
});
