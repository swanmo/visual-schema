/**
 * https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/attributeGroup.html
 */
define(['validators/util'], function (util) {
    var u = util.getInstance();
    var contentElements = [
      'annotation',
      'anyAttribute',
      'attribute',
      'attributeGroup'
     ];
     var attrs = [
      {n:'id'},
      {n:'name', t:'NCName', u:'r'}
     ];

    return {
        getValidationErrors: function(schemaElement) {
            return u.errorsOnly(u.validateAll(schemaElement, contentElements, attrs));
        }
    };
});
