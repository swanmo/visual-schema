// https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/complexTypes/topLevelSimpleType.html
define(['validators/util'], function (util) {
  var u = util.getInstance();
    var contentElements = [
      'annotation',
      'list',
      'restriction',
      'union'
     ];
     var attrs = [
      {n:'final'},
      {n:'id'},
      {n:'name', t:'NCName', u:'r'}
     ];

    return {
        getValidationErrors: function(schemaElement) {
            return util.getInstance().validateChildren(schemaElement, contentElements);
        }
    };
});
