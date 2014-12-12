/**
 * https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/annotation.html
 */
define(['validators/util'], function (util) {
	var u = util.getInstance();
    var attrs = [
    	{ n: 'abstract', u:'p' },
    	{ n: 'block', u:'p' },
    	{ n: 'final', u:'p' },
        { n: 'id' }
     ];

    var contentElements = [
      'appinfo',
      'documentation'
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
