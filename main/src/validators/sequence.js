//https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/complexTypes/explicitGroup.html
define(['validators/util'], function (util) {
    var contentElements = [
      'annotation',
      'element',
      'group',
      'choice',
      'sequence',
      'any'
    ];

    var attrs = [
      {n:'id', t:'ID'},
      {n:'maxOccurs', t:'nonNegativeInteger'},
      {n:'minOccurs', t:'nonNegativeInteger'},
      {n:'name', t:'nonNegativeInteger', u:'p'},
      {n:'ref', t:'nonNegativeInteger', u:'p'}
    ];

    return {
        getValidationErrors: function(schemaElement) {
            return util.getInstance().validateAll(schemaElement, contentElements, attrs);
        }
    };
});
