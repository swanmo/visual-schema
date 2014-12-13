/**
 * https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/choice.html
 */
define(['validators/util'], function (util) {
  var u = util.getInstance();
  var contentElements = [
    'annotation',
    'any',
    'choice',
    'element',
    'group',
    'sequence'
   ];

  var attrs = [
    {n:'id', t:'ID'},
    {n:'maxOccurs', t:'nonNegativeInteger'},
    {n:'minOccurs', t:'nonNegativeInteger'}
   ];

  return {
    getValidationErrors: function(schemaElement) {
      return u.errorsOnly(u.validateAll(schemaElement, contentElements, attrs));
    }
  };
});
