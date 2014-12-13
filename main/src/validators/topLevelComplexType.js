/**
 * https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/element_1.html
 */
define(['validators/util'], function (util) {
    var u = util.getInstance();
    var attrs = [
      {n:'abstract'},
      {n:'block'},
      {n:'final'},
      {n:'id'},
      {n:'mixed', t:'boolean'},
      {n:'name', u:'r', t:'NCName'}
     ];

    var contentElements = [
      'all',
      'annotation',
      'anyAttribute',
      'attribute',
      'attributeGroup',
      'choice',
      'complexContent',
      'group',
      'sequence',
      'simpleContent'
     ];

    return {
        getValidationErrors: function(schemaElement) {
          return u.concat(
            u.validateAttr(schemaElement, attrs),
            u.validateChildren(schemaElement, contentElements));
        }
    };
});
