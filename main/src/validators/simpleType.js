// https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/simpleType_1.html
define(['validators/util'], function (util) {
  var u = util.getInstance();
  var contentElements = [
    'annotation',
    'list',
    'restriction',
    'union'
  ];

  var attrs = [
    {n:'id'}
  ];

  return {
    getValidationErrors: function(schemaElement) {
      return u.validateAll(schemaElement, contentElements, attrs);
    }
  };
});
