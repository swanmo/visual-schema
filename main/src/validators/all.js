/**
 * https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/annotation.html
 */
define(['validators/util'], function(util) {
    var u = util.getInstance();
    var attrs = [
        {
            n: 'id'
        },
        {
            n: 'maxOccurs',
            t: 'nonNegativeInteger'
        },
        {
            n: 'minOccurs',
            t: 'nonNegativeInteger'
        }
     ];

    var contentElements = [
      'annotation',
      'element'
     ];

    return {
        getValidationErrors: function(schemaElement) {
            return u.concat(
                u.validateAttr(schemaElement, attrs),
                u.validateChildren(schemaElement, contentElements)
            );
        }
    };
});
