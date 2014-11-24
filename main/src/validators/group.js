/**
 * https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/group.html
 * @param  {[type]} util [description]
 * @return {[type]}      [description]
 */
define(['validators/util'], function (util) {
    var contentElements = [
      'all',
      'annotation',
      'choice',
      'sequence'
     ];

    return {
        getValidationErrors: function(schemaElement) {
            return util.getInstance().validateChildren(schemaElement, contentElements);
        }
    };
});
