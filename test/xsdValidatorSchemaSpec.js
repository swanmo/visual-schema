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

    var xsdCTwithCC = '<?xml version="1.0"?>' +
        '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">' +
        '<xs:complexType name="fullpersoninfo">' +
        '  <xs:complexContent>' +
        '    <xs:extension base="personinfo">' +
        '      <xs:sequence>' +
        '        <xs:element name="address" type="xs:string"/>' +
        '        <xs:element name="city" type="xs:string"/>' +
        '        <xs:element name="country" type="xs:string"/>' +
        '      </xs:sequence>' +
        '    </xs:extension>' +
        '  </xs:complexContent>' +
        '</xs:complexType>' +
        '</xs:schema>';
    var xsdWithSimpleTypeAndRestriction =
        '<?xml version="1.0"?>' +
        '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">' +
        '<xs:element name="car" type="carType"/>' +
        '<xs:simpleType name="carType">' +
        '  <xs:restriction base="xs:string">' +
        '    <xs:enumeration value="Audi"/>' +
        '    <xs:enumeration value="Golf"/>' +
        '    <xs:enumeration value="BMW"/>' +
        '  </xs:restriction>' +
        '</xs:simpleType>' +
        '</xs:schema>';

    var xsdWithAttribute =
        '<?xml version="1.0"?>' +
        '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">' +
        '<xs:element name="name" type="xs:string"/>' +
        '</xs:schema>';


    describe("xsdValidator", function() {
        beforeEach(function() {
        });

        it ("should accept xsd, from xsdComplexType", function() {
            expect(sut.getValidationErrors(xsdComplexType)).toBeUndefined();
        });

        it ("should not accept xsd, with whatever nested under schema (from xsdWhateverType)", function() {
            expect(sut.getValidationErrors(xsdWhateverType)).toBeDefined();
            expect(sut.getValidationErrors(xsdWhateverType).length).toBe(1);
        });

        it ("should accept xsd (from xsdCTwithCC)", function() {
            expect(sut.getValidationErrors(xsdCTwithCC)).toBeUndefined();
        });

        it ("should accept xsd with restriction  (from xsdWithSimpleTypeAndRestriction)", function() {
            expect(sut.getValidationErrors(xsdWithSimpleTypeAndRestriction)).toBeUndefined();
        });

        it ("should accept xsd with attribute-tag  (from xsdWithSimpleTypeAndRestriction)", function() {
            expect(sut.getValidationErrors(xsdWithAttribute)).toBeUndefined();
        });

        
        
    });
});