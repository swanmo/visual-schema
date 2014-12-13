/**
 * https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/attribute_1.html
 */
define(['validators/util'], function (util) {
    var u = util.getInstance();
    var contentElements = [
      'annotation',
      'simpleType'
     ];

     var attrs = [
      {n:'default', t:'string'},
      {n:'fixed', t:'string'},
      {n:'form', t:'formChoice'},
      {n:'id'},
      {n:'name', t:'NCName'},
      {n:'ref', t:'QName'},
      {n:'type', t:'QName'},
      {n:'use', t:'prohibited|optional|required'}
     ];

    return {
        getValidationErrors: function(schemaElement) {
            return u.errorsOnly(u.validateAll(schemaElement, contentElements, attrs));
        }
    };
});
