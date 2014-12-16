//https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/sequence_1.html
define(['validators/util'], function (util) {
    var contentElements = [
      'annotation',
      'any',
      'choice',
      'element',
      'group',
      'sequence'
    ];

    var attrs = [
      {n:'id', t:'ID', u:'o'}
    ];

    return {
        getValidationErrors: function(schemaElement) {
            return util.getInstance().validateAll(schemaElement, contentElements, attrs);
        }
    };
});
