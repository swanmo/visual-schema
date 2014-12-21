// TODO https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/extension.html
define(['validators/util'], function (util) {
  var u = util.getInstance();
    var contentElements = [
      'all',
      'annotation',
      'anyAttribute',
      'attribute',
      'attributeGroup',
      'attributeGroupRef',
      'choice',
      'group',
      'sequence'
     ];

     var attrs = [
      {n:'base', t:'QName', u:'r'},
      {n:'id', t:'ID', u:'r'}
    ];

    return {
        getValidationErrors: function(schemaElement) {
            return u.validateAll(schemaElement, contentElements, attrs);
        }
    };
});
