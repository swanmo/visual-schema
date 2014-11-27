/**
 * https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/element_1.html
 * @param  {[type]} util [description]
 * @return {[type]}      [description]
 */
define(['validators/util'], function (util) {
    var contentElements = [
      'all',
      'annotation',
      'anyAttribute',
      'attribute',
      'attributeGroup',
      'choice',
      'complexContent',
      'group',
      'sequence',
      'simpleContent'
     ];

    return {
        getValidationErrors: function(schemaElement) {
            return util.getInstance().validateChildren(schemaElement, contentElements);
        }
    };
});
