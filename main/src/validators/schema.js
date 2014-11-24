define(['validators/util'], function (util) {
    var contentElements = [
      'annotation',
      'attribute',
      'attributeGroup',
      'complexType',
      'element',
      'group',
      'import',
      'include',
      'notation',
      'redefine',
      'simpleType',
     ];


    return {
        getValidationErrors: function(schemaElement) {
            return util.getInstance().validateChildren(schemaElement, contentElements);
        }
    };
});
