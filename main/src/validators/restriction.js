// https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/simpleType_1.html
define(['validators/util'], function (util) {
    var contentElements = [
      'annotation',
      'enumeration',
      'fractionDigits',
      'length',
      'maxExclusive',
      'maxInclusive',
      'maxLength',
      'minExclusive',
      'minInclusive',
      'minLength',
      'pattern',
      'simpleType',
      'totalDigits',
      'whiteSpace'
     ];

    return {
        getValidationErrors: function(schemaElement) {
            return util.getInstance().validateChildren(schemaElement, contentElements);
        }
    };
});
