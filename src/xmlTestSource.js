define(function() {


    var testXml =
        '<?xml version="1.0" encoding="UTF-8"?>\n' + 
        '<!-- edited with XMLSpy v2012 rel. 2 sp1 (x64) (http://www.altova.com) by \n' +
        '    Tore W (blah bla) -->\n' +
        '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"\n' +
        '    xmlns:tns="http://integration.sjv.se/hanteraprogram/programinfo/model/program_1.0"\n' +
        '    targetNamespace="http://integration.sjv.se/hanteraprogram/programinfo/model/program_1.0"\n' +
        '    elementFormDefault="qualified">\n' +
        '    <xs:element name="atgardList">\n' +
        '        <xs:complexType>\n' +
        '            <xs:sequence>\n' +
        '                <xs:element ref="tns:atgard" minOccurs="0" maxOccurs="unbounded" />\n' +
        '            </xs:sequence>\n' +
        '        </xs:complexType>\n' +
        '    </xs:element>\n\n' +

        '<xs:element name="atgard" type="tns:atgardType" />\n' +

        '<xs:complexType name="atgardType">\n' +
        '    <xs:complexContent>\n' +
        '        <xs:extension base="tns:grunddataType">\n' +
        '            <xs:sequence>\n' +
        '                <xs:element name="program">\n' +
        '                    <xs:complexType>\n' +
        '                        <xs:complexContent>\n' +
        '                            <xs:extension base="tns:grunddataBasType">\n' +
        '                                <xs:sequence />\n' +
        '                            </xs:extension>\n' +
        '                        </xs:complexContent>\n' +
        '                    </xs:complexType>\n' +
        '                </xs:element>\n' +
        '                <xs:element name="delatgardList">\n' +
        '                    <xs:complexType>\n' +
        '                        <xs:sequence>\n' +
        '                            <xs:element name="delatgard" type="tns:delatgardType"\n' +
        '                                minOccurs="1" maxOccurs="unbounded" />\n' +
        '                        </xs:sequence>\n' +
        '                    </xs:complexType>\n' +
        '                </xs:element>\n' +
        '            </xs:sequence>\n' +
        '        </xs:extension>\n' +
        '    </xs:complexContent>\n' +
        '</xs:complexType>\n\n' +
        '<xs:complexType name="delatgardType">\n' +
        '    <xs:complexContent>\n' +
        '        <xs:extension base="tns:grunddataType">\n' +
        '            <xs:sequence>\n' +
        '                <xs:element name="fokusomradenList">\n' +
        '                    <xs:complexType>\n' +
        '                        <xs:sequence>\n' +
        '                            <xs:element name="fokusomradekod" type="xs:string"\n' +
        '                                minOccurs="0" maxOccurs="unbounded" />\n' +
        '                        </xs:sequence>\n' +
        '                    </xs:complexType>\n' +
        '                </xs:element>\n' +
        '                <xs:element name="insatstypList">\n' +
        '                    <xs:complexType>\n' +
        '                        <xs:sequence>\n' +
        '                            <xs:element name="insatstyp" type="tns:insatstypType"\n' +
        '                                minOccurs="1" maxOccurs="unbounded" />\n' +
        '                        </xs:sequence>\n' +
        '                    </xs:complexType>\n' +
        '                </xs:element>\n' +
        '            </xs:sequence>\n' +
        '        </xs:extension>\n' +
        '    </xs:complexContent>\n' +
        '</xs:complexType>\n\n' +
        '<xs:complexType name="grunddataBasType">\n' +
        '<xs:sequence>\n' +
        '    <xs:element name="kod" type="xs:string" />\n' +
        '    <xs:element name="namn" type="xs:string" />\n' +
        '</xs:sequence>\n' +
        '</xs:complexType>\n' +
        '</xs:schema>\n';
    var xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"' +
        '   xmlns:tns="http://integration.sjv.se/hanteraprogram/programinfo/model/program_1.0"' +
        '   targetNamespace="http://integration.sjv.se/hanteraprogram/programinfo/model/program_1.0"' +
        '   elementFormDefault="qualified">\n' +
        '   <xs:elem>sample-a</xs:elem>\n' +
        '   <xs:elem>sample-b</xs:elem>\n' +
        '   <xs:element name="employee">\n' +
        '     <xs:complexType>\n' +
        '       <xs:sequence>\n' +
        '         <xs:element name="firstname" type="xs:string"/>\n' +
        '         <xs:element name="midname" type="xs:string"/>\n' +
        '         <xs:element name="lastname" type="xs:string"/>\n' +
        
        '         <xs:complexType name="trash">\n' +
        '           <xs:sequence>\n' +
        '             <xs:element name="whatver" type="xs:string"/>\n' +
        '             <xs:element name="trash" type="xs:int"/>\n' +
        '          </xs:sequence>\n' +
        '         </xs:complexType>\n' +

        '       </xs:sequence>\n' +
        '     </xs:complexType>\n' +
        '   </xs:element>\n' +
        '</xs:schema>\n';

    var emptySchemaWithNs = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"' +
        '   xmlns="http://www.w3.org/2001/XMLSchema"' +
        '   xmlns:tns="http://domain.org/path/to/happiness_1.0"' +
        '   targetNamespace="http://domain.org/path/to/happiness_1.0"' +
        '   elementFormDefault="qualified">\n' +
        '</xs:schema>\n';
    return {
        getEmptySchemaWithNs:function() {return emptySchemaWithNs}
    }


});