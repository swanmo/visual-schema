/**
 * https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/element_1.html
 * @param  {[type]} util [description]
 * @return {[type]}      [description]
 */
define(['validators/util'], function (util) {
    var u = util.getInstance();
    var attrs = [
      {n:'abstract', u:'p'},
      {n:'block', u:'p'},
      {n:'final', u:'p'},
      {n:'id'},
      {n:'mixed', t:'boolean'},
      {n:'name', u:'p'}
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
