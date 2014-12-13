/**
 * https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/group.html
 */
define(['validators/util'], function (util) {
    var contentElements = [
      'annotation'
     ];

    var attrs = [
      {n:'id', t:'ID'},
      {n:'maxOccurs', t:'nonNegativeInteger'},
      {n:'minOccurs', t:'nonNegativeInteger'},
      {n:'ref', u:'r', t:'QName'}
    ];

    return {
        getValidationErrors: function(schemaElement) {
            return util.getInstance().validateAll(schemaElement, contentElements, attrs);
        }
    };
});
