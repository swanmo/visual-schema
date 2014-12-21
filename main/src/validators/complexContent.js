/**
 * https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/complexContent.html
 */
define(['validators/util'], function(util) {
    var u = util.getInstance();
    var attrs = [
        { n: 'id' },
        { n: 'mixed', t: 'boolean' }
     ];

    var contentElements = [
      'annotation',
      'extension',
      'restriction'
     ];

    return {
        getValidationErrors: function(schemaElement) {
            return u.concat(
                u.validateAttr(schemaElement, attrs),
                u.validateChildren(schemaElement, contentElements));
        }
    };
});
