/**
 * https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/attributeGroup_1.html
 */
define(['validators/util'], function (util) {
    var u = util.getInstance();
    var contentElements = [
      'annotation'
     ];

     var attrs = [
      {n:'id'},
      {n:'ref', t:'QName', u:'r'}
     ];

    return {
        getValidationErrors: function(schemaElement) {
            return u.errorsOnly(u.validateAll(schemaElement, contentElements, attrs));
        }
    };
});
