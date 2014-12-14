// https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/redefine.html
define(['validators/util'], function (util) {
    var contentElements = [
      'annotation',
      'attributeGroup',
      'complexType',
      'group',
      'simpleType'
    ];
    var attrs = [
      {n:'id', t:'ID'},
      {n:'schemaLocation', u:'r'}
    ];

    return {
        getValidationErrors: function(schemaElement) {
            return util.getInstance().validateAll(schemaElement, contentElements, attrs);
        }
    };
});
