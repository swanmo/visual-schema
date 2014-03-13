define(function() {


    var xsdWithMultipleRoots =
        '<?xml version="1.0" encoding="UTF-8"?>\n' + 
        '<!-- komentar -->\n' +
        '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"\n' +
        '    xmlns:tns="http://test.org/sample/program_1.1"\n' +
        '    targetNamespace="http://test.org/sample/program_1.1">\n' +
        '<xs:element name="birdList">\n' +
        '    <xs:complexType>\n' +
        '        <xs:sequence>\n' +
        '            <xs:element ref="tns:bird" minOccurs="0" maxOccurs="unbounded" />\n' +
        '        </xs:sequence>\n' +
        '    </xs:complexType>\n' +
        '</xs:element>\n' +

        '<xs:element name="bird" type="tns:birdType" />\n' +
        '<xs:complexType name="birdType">\n' +
        '    <xs:complexContent>\n' +
        '        <xs:sequence>\n' +
        '            <xs:element name="colors">\n' +
        '                <xs:complexType>\n' +
        '                    <xs:sequence>\n' +
        '                        <xs:element name="predominantColor" type="xs:string" minOccurs="1" maxOccurs="1" />\n' +
        '                        <xs:element name="secondaryColor" type="xs:string" minOccurs="0" maxOccurs="unbounded" />\n' +
        '                    </xs:sequence>\n' +
        '                </xs:complexType>\n' +
        '            </xs:element>\n' +
        '            <xs:element name="population" type="xs:int" />\n' +
        '            <xs:element name="taxonomy" type="xs:string" />\n' +
        '        </xs:sequence>\n' +
        '    </xs:complexContent>\n' +
        '</xs:complexType>\n\n' +
        '</xs:schema>\n';
    var schemaWithoutNs = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<schema targetNamespace="http://test.org/ghandi"' +
        '   xmlns="http://www.w3.org/2001/XMLSchema"' +
        '   elementFormDefault="unqualified">\n' +
        '   <element name="teresa" type="string">\n' +
        '   </element>\n' +
        '</schema>\n';

    var emptySchemaWithNs = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"' +
        '   xmlns="http://www.w3.org/2001/XMLSchema"' +
        '   xmlns:tns="http://domain.org/path/to/happiness_1.0"' +
        '   targetNamespace="http://domain.org/path/to/happiness_1.0"' +
        '   elementFormDefault="qualified">\n' +
        '</xs:schema>\n';
    return {
        getEmptySchemaWithNs:function() {return emptySchemaWithNs},
        getUnqualifiedSchema:function() {return schemaWithoutNs},
        getXsdWithMultipleRoots:function() {return xsdWithMultipleRoots}

        
    }


});