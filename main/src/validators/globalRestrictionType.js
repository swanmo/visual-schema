// https://www.evolveum.com/downloads/midpoint/1.9/midpoint-xsddocs-1.9/schemas/XMLSchema_xsd/elements/restriction_2.html
define(['validators/util'], function (util) {
    var u = util.getInstance();
    var attrs = [
        { n: 'id' },
        { n: 'base', u:'o', t: 'QName' }
     ];

    var contentElements = [
      'annotation',

      'anyAttribute',
      'attribute',
      'attributeGroup',
      'enumeration',
      'fractionDigits',
      'length',
      'maxExclusive',
      'maxInclusive',
      'maxLength',
      'minExclusive',
      'minInclusive',
      'minLength',
      'pattern',
      'simpleType',
      'totalDigits',
      'whiteSpace'
     ];
  xs:annotation?, xs:simpleType?, (xs:minExclusive | xs:minInclusive | xs:maxExclusive | xs:maxInclusive | xs:totalDigits | xs:fractionDigits | xs:length | xs:minLength | xs:maxLength | xs:enumeration | xs:whiteSpace | xs:pattern)*
    return {
        getValidationErrors: function(schemaElement) {
            return u.concat(
                u.validateAttr(schemaElement, attrs),
                u.validateChildren(schemaElement, contentElements));
        }
    };
});
