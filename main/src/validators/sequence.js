/**
 * https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/sequence_1.html
 */
define(['validators/util'], function (util) {
    var contentElements = [
      'annotation',
      'any',
      'choice',
      'element',
      'group',
      'sequence'
     ];

    return {
        getValidationErrors: function(schemaElement) {
          console.log('validating sequence', schemaElement);
            return util.getInstance().validateChildren(schemaElement, contentElements);
        }
    };
});
