// https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/union.html
define(['validators/util'], function (util) {
    var contentElements = [
      'annotation',
      'simpleType'
    ];
    var attrs = [
      {n:'id', t:'ID'},
      {n:'memberTypes'}
    ];

    return {
        getValidationErrors: function(schemaElement) {
            return util.getInstance().validateAll(schemaElement, contentElements, attrs);
        }
    };
});
