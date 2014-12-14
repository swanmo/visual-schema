// https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/restriction.html
define(['validators/util'], function (util) {
    var u = util.getInstance();
    var attrs = [
        { n: 'id' },
        { n: 'base', u:'r', t: 'QName' }
     ];
    var contentElements = [
      'all',
      'annotation',
      'anyAttribute',
      'attribute',
      'attributeGroup',
      'choice',
      'group',
      'sequence'
     ];

     xs:attributeGroup (type xs:attributeGroupRef), xs:choice, xs:group (type xs:groupRef), xs:sequence

    return {
        getValidationErrors: function(schemaElement) {
            return u.concat(
                u.validateAttr(schemaElement, attrs),
                u.validateChildren(schemaElement, contentElements));
        }
    };
});
