/**
 * https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/group.html
 */
define(['validators/util'], function (util) {
    var contentElements = [
      'all',
      'annotation',
      'choice',
      'sequence'
     ];

    var attrs = [
      {n:'id', t:'ID'},
      {n:'name', u:'r', t:'NCName'}
    ];

    return {
        getValidationErrors: function(schemaElement) {
            return util.getInstance().validateAll(schemaElement, contentElements, attrs);
        }
    };
});
