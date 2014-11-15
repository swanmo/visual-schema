define(function() {

var emptyWithRestriction = '<xs:element name="product">' +
'<xs:complexType>' +
'    <xs:complexContent>' +
'      <xs:restriction base="xs:integer">' +
'        <xs:attribute name="prodid" type="xs:positiveInteger"/>' +
'      </xs:restriction>' +
'    </xs:complexContent>' +
'  </xs:complexType>' +
'</xs:element>';

var sampleWithKey = "<?xml version='1.0' encoding='utf-8' ?>\n" +
"<xs:schema xmlns:xs='http://www.w3.org/2001/XMLSchema'>\n" +
"  <xs:element name='Root'>\n" +
"    <xs:complexType>\n" +
"      <xs:sequence>\n" +
"        <xs:element name='Customers'>\n" +
"          <xs:complexType>\n" +
"            <xs:sequence>\n" +
"              <xs:element name='Customer' type='CustomerType' minOccurs='0' maxOccurs='unbounded' />\n" +
"            </xs:sequence>\n" +
"          </xs:complexType>\n" +
"        </xs:element>\n" +
"        <xs:element name='Orders'>\n" +
"          <xs:complexType>\n" +
"            <xs:sequence>\n" +
"              <xs:element name='Order' type='OrderType' minOccurs='0' maxOccurs='unbounded' />\n" +
"            </xs:sequence>\n" +
"          </xs:complexType>\n" +
"        </xs:element>\n" +
"      </xs:sequence>\n" +
"    </xs:complexType>\n" +
"    <xs:key name='CustomerIDKey'>\n" +
"      <xs:selector xpath='Customers/Customer'/>\n" +
"      <xs:field xpath='@CustomerID'/>\n" +
"    </xs:key>\n" +
"    <xs:keyref name='CustomerIDKeyRef' refer='CustomerIDKey'>\n" +
"      <xs:selector xpath='Orders/Order'/>\n" +
"      <xs:field xpath='CustomerID'/>\n" +
"    </xs:keyref>\n" +
"  </xs:element>\n" +
"  <xs:complexType name='CustomerType'>\n" +
"    <xs:sequence>\n" +
"      <xs:element name='CompanyName' type='xs:string'/>\n" +
"      <xs:element name='ContactName' type='xs:string'/>\n" +
"      <xs:element name='ContactTitle' type='xs:string'/>\n" +
"      <xs:element name='Phone' type='xs:string'/>\n" +
"      <xs:element name='Fax' minOccurs='0' type='xs:string'/>\n" +
"      <xs:element name='FullAddress' type='AddressType'/>\n" +
"    </xs:sequence>\n" +
"    <xs:attribute name='CustomerID' type='xs:token'/>\n" +
"  </xs:complexType>\n" +
"  <xs:complexType name='AddressType'>\n" +
"    <xs:sequence>\n" +
"      <xs:element name='Address' type='xs:string'/>\n" +
"      <xs:element name='City' type='xs:string'/>\n" +
"      <xs:element name='Region' type='xs:string'/>\n" +
"      <xs:element name='PostalCode' type='xs:string' />\n" +
"      <xs:element name='Country' type='xs:string'/>\n" +
"    </xs:sequence>\n" +
"    <xs:attribute name='CustomerID' type='xs:token'/>\n" +
"  </xs:complexType>\n" +
"  <xs:complexType name='OrderType'>\n" +
"    <xs:sequence>\n" +
"      <xs:element name='CustomerID' type='xs:token'/>\n" +
"      <xs:element name='EmployeeID' type='xs:token'/>\n" +
"      <xs:element name='OrderDate' type='xs:dateTime'/>\n" +
"      <xs:element name='RequiredDate' type='xs:dateTime'/>\n" +
"      <xs:element name='ShipInfo' type='ShipInfoType'/>\n" +
"    </xs:sequence>\n" +
"  </xs:complexType>\n" +
"  <xs:complexType name='ShipInfoType'>\n" +
"    <xs:sequence>\n" +
"      <xs:element name='ShipVia' type='xs:integer'/>\n" +
"      <xs:element name='Freight' type='xs:decimal'/>\n" +
"      <xs:element name='ShipName' type='xs:string'/>\n" +
"      <xs:element name='ShipAddress' type='xs:string'/>\n" +
"      <xs:element name='ShipCity' type='xs:string'/>\n" +
"      <xs:element name='ShipRegion' type='xs:string'/>\n" +
"      <xs:element name='ShipPostalCode' type='xs:string'/>\n" +
"      <xs:element name='ShipCountry' type='xs:string'/>\n" +
"    </xs:sequence>\n" +
"    <xs:attribute name='ShippedDate' type='xs:dateTime'/>\n" +
"  </xs:complexType>\n" +
"</xs:schema>";

    var sample =
        '<?xml version="1.0" encoding="UTF-8"?>\n' + 
        '<!-- edited with XMLSpy v2012 (http://www.altova.com) by Tore W -->\n' +
        '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"\n' +
        '    xmlns:tns="http://integration.sjv.se/hanteraprogram/programinfo/model/program_1.0"\n' +
        '    targetNamespace="http://integration.sjv.se/hanteraprogram/programinfo/model/program_1.0"\n' +
        '    elementFormDefault="qualified">\n' +
        '    <xs:element name="atgardList" xmlns:xs="http://www.w3.org/2001/XMLSchema">\n' +
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
        '                                <xs:sequence>\n' +
        '                                    <xs:element name="sample-01" minOccurs="0" type="xs:string" maxOccurs="unbounded" />\n' +
        '                                    <xs:element name="sample-02" minOccurs="0" type="xs:string" />\n' +
        '                                </xs:sequence>\n' +
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
        '        <xs:extension base="tns:grunddataBasType">\n' +
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
        '        <xs:extension base="tns:grunddataBasType">\n' +
        '            <xs:sequence>\n' +
        '                <xs:element name="program" type="xs:string">\n' +
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
        '        <xs:extension base="tns:grunddataBasType">\n' +
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
        '</xs:schema>';


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
    return {
    	getXml:function() {return sample},
        getTestXml:function() {return testXml}
    }


});