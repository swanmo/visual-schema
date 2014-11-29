// TODO https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/extension.html
define(['validators/util'], function (util) {
    var contentElements = [
      'all',
      'annotation',
      'anyAttribute',
      'attribute',
      'attributeGroup',
      'attributeGroupRef',
      'choice',
      'group',
      'sequence'
     ];

    return {
        getValidationErrors: function(schemaElement) {
            return util.getInstance().validateChildren(schemaElement, contentElements);
        }
    };
});
