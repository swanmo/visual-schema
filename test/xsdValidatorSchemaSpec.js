define(['xsdValidator'], function(sut) {

    var xsdComplexType = '<?xml version="1.0"?>' +
        '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">' +

        '<xs:element name="note">' +
        '  <xs:complexType>' +
        '    <xs:sequence>' +
        '      <xs:element name="to" type="xs:string"/>' +
        '      <xs:element name="from" type="xs:string"/>' +
        '      <xs:element name="heading" type="xs:string"/>' +
        '      <xs:element name="body" type="xs:string"/>' +
        '    </xs:sequence>' +
        '  </xs:complexType>' +
        '</xs:element>' +
        '</xs:schema>';

    var xsdWhateverType = '<?xml version="1.0"?>' +
        '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">' +
        '  <xs:whatever>' +
        '  </xs:whatever>' +
        '</xs:schema>'; 

    describe("xsdValidator", function() {
        it ("should accept xsd, from xsdComplexType", function() {
            expect(sut.getValidationErrors(xsdComplexType)).toBeUndefined();
        });

        it ("should not accept xsd, with whatever nested under schema (from xsdWhateverType)", function() {
            expect(sut.getValidationErrors(xsdWhateverType)).toBeDefined();
            expect(sut.getValidationErrors(xsdWhateverType).length).toBe(1);
        });
    });
});