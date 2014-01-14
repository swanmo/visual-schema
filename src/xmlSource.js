define(function() {

    var complexTypeXml =
        '<?xml version="1.0" encoding="UTF-8"?>' + 
        '<!-- edited with XMLSpy v2012 rel. 2 sp1 (x64) (http://www.altova.com) by ' +
        '    Mathias Malmberg (Jordbruksverket) -->' +
        '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"' +
        '    xmlns:tns="http://integration.sjv.se/hanteraprogram/programinfo/model/program_1.0"' +
        '    targetNamespace="http://integration.sjv.se/hanteraprogram/programinfo/model/program_1.0"' +
        '    elementFormDefault="qualified">' +
        '    <xs:element name="atgardList">' +
        '        <xs:complexType>' +
        '            <xs:sequence>' +
        '                <xs:element ref="tns:atgard" minOccurs="0" maxOccurs="unbounded" />' +
        '            </xs:sequence>' +
        '        </xs:complexType>' +
        '    </xs:element>' +

        '<xs:element name="atgard" type="tns:atgardType" />' +

        '<xs:complexType name="atgardType">' +
        '    <xs:complexContent>' +
        '        <xs:extension base="tns:grunddataType">' +
        '            <xs:sequence>' +
        '                <xs:element name="program">' +
        '                    <xs:complexType>' +
        '                        <xs:complexContent>' +
        '                            <xs:extension base="tns:grunddataBasType">' +
        '                                <xs:sequence />' +
        '                            </xs:extension>' +
        '                        </xs:complexContent>' +
        '                    </xs:complexType>' +
        '                </xs:element>' +
        '                <xs:element name="delatgardList">' +
        '                    <xs:complexType>' +
        '                        <xs:sequence>' +
        '                            <xs:element name="delatgard" type="tns:delatgardType"' +
        '                                minOccurs="1" maxOccurs="unbounded" />' +
        '                        </xs:sequence>' +
        '                    </xs:complexType>' +
        '                </xs:element>' +
        '            </xs:sequence>' +
        '        </xs:extension>' +
        '    </xs:complexContent>' +
        '</xs:complexType>' +
        '</xs:schema>';


    var xml = '<?xml version="1.0" encoding="UTF-8"?>' +
        '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"' +
        '   xmlns:tns="http://integration.sjv.se/hanteraprogram/programinfo/model/program_1.0"' +
        '   targetNamespace="http://integration.sjv.se/hanteraprogram/programinfo/model/program_1.0"' +
        '   elementFormDefault="qualified">' +
        '   <xs:elem>sample-a</xs:elem>' +
        '   <xs:elem>sample-b</xs:elem>' +
        '   <xs:element name="employee">' +
        '     <xs:complexType>' +
        '       <xs:sequence>' +
        '         <xs:element name="firstname" type="xs:string"/>' +
        '         <xs:element name="lastname" type="xs:string"/>' +
        '       </xs:sequence>' +
        '     </xs:complexType>' +
        '   </xs:element>' +
        '</xs:schema>';
    return {
    	getXml:function() {return complexTypeXml}
    }


});