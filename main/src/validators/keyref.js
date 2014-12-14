// TODO https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/extension.html
define(['validators/util'], function (util) {
  var contentElements = [
    'annotation',
    'field',
    'selector'
  ];

  var attrs = [
    {n:'id', t:'ID'},
    {n:'name', t:'NCName', u:'r'},
    {n:'refer', t:'QName', u:'r'}
  ];

  return {
    getValidationErrors: function(schemaElement) {
      return u.validateAll(schemaElement, contentElements, attrs);
    }
  };
});
