// TODO https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/extension.html
define(['validators/util'], function (util) {
  var contentElements = [
    'annotation'
  ];

  var attrs = [
    {n:'id', t:'ID'},
    {n:'value', t:'string', u:'r'}
  ];

  return {
    getValidationErrors: function(schemaElement) {
      return u.validateAll(schemaElement, contentElements, attrs);
    }
  };
});
