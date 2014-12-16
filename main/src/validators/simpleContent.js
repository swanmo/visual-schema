/**
 * https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/simpleContent.html
 */
define(['validators/util'], function (util) {
    var contentElements = [
      'annotation',
      'extension',
      'restriction'
     ];

     var attrs = [
      {n:'id', t:'ID'}
    ];

    return {
        getValidationErrors: function(schemaElement) {
            return util.getInstance().validateAll(schemaElement, contentElements, attrs);
        }
    };
});
