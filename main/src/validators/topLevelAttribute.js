/**
 * https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/schema.html
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
      {n:'form', u:'p'},
      {n:'id'},
      {n:'name', u:'r', t:'NCName'},
      {n:'ref', u:'p'},
      {n:'type', t:'QName'},
      {n:'use', u:'p'}
     ];

    return {
        getValidationErrors: function(schemaElement) {
            return u.errorsOnly(u.validateAll(schemaElement, contentElements, attrs));
        }
    };
});
