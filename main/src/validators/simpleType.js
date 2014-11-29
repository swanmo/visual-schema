// https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/simpleType_1.html
define(['validators/util'], function (util) {
    var contentElements = [
      'annotation',
      'list',
      'restriction',
      'union'
     ];

    return {
        getValidationErrors: function(schemaElement) {
            return util.getInstance().validateChildren(schemaElement, contentElements);
        }
    };
});
