/**
 * https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/element_1.html
 * @param  {[type]} util [description]
 * @return {[type]}      [description]
 */
define(['validators/util'], function (util) {
  var u = util.getInstance();
    var contentElements = [
      'annotation',
      'complexType',
      'key',
      'keyref',
      'simpleType',
      'unique'
     ];

     var attrs = [
      {n:'abstract', t:'boolean'},
      {n:'block', t:'blockSet'},
      {n:'default', t:'string'},
      {n:'final'},
      {n:'fixed'},
      {n:'form', u:'p'},
      {n:'id'},
      {n:'maxOccurs', u:'p'},
      {n:'minOccurs', u:'p'},
      {n:'name', u:'r'},
      {n:'nillable', t:'boolean'},
      {n:'ref', u:'p'},
      {n:'substitutionGroup', t:'QName'},
      {n:'type', t:'QName'}
     ];

    return {
        getValidationErrors: function(schemaElement) {
          return u.concat(
              u.validateAttr(schemaElement, attrs),
              u.validateChildren(schemaElement, contentElements)
              );
        }
    };
});
