define(function() {

//     var sample =

// '<?xml version="1.0" encoding="UTF-8" ?>\n' +
// '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">\n\n' +

// '<xs:element name="w3shiporder">\n' +
// '  <xs:complexType>\n' +
// '    <xs:sequence>\n' +
// '      <xs:element name="orderperson" type="xs:string"/>\n' +
// '      <xs:element name="shipto">\n' +
// '        <xs:complexType>\n' +
// '          <xs:sequence>\n' +
// '            <xs:element name="name" type="xs:string"/>\n' +
// '            <xs:element name="address" type="xs:string"/>\n' +
// '            <xs:element name="city" type="xs:string"/>\n' +
// '            <xs:element name="country" type="xs:string">\n' +
// '              <xs:annotation>\n' +
// '	             <xs:documentation>Land som berödes av Kubakrisen var inte bara de närmaste i regionen utan även...</xs:documentation>\n' +
// '              </xs:annotation>\n' +
// '            </xs:element>\n' +
// '          </xs:sequence>\n' +
// '        </xs:complexType>\n' +
// '      </xs:element>\n' +
// '      <xs:element name="item" maxOccurs="unbounded">\n' +
// '        <xs:complexType>\n' +
// '          <xs:sequence>\n' +
// '            <xs:element name="title" type="xs:string"/>\n' +
// '            <xs:element name="note" type="xs:string" minOccurs="0"/>\n' +
// '            <xs:element name="quantity" type="xs:positiveInteger"/>\n' +
// '            <xs:element name="price" type="xs:decimal"/>\n' +
// '          </xs:sequence>\n' +
// '        </xs:complexType>\n' +
// '      </xs:element>\n' +
// '    </xs:sequence>\n' +
// '    <xs:attribute name="orderid" type="xs:string" use="required"/>\n' +
// '  </xs:complexType>\n' +
// '</xs:element>\n' +
// '</xs:schema>';

var sample2 = '<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema" \n' +
'elementFormDefault="qualified">\n\n' +
'<xsd:element name="PurchaseOrder" type="tns:PurchaseOrderType"/>\n' +
'<xsd:complexType name="PurchaseOrderType">\n' +
' <xsd:sequence>\n' +
'  <xsd:element name="ShipTo" type="tns:Address" maxOccurs="2"/>\n' +
'  <xsd:element name="BillTo" type="tns:Address"/>\n' +
' </xsd:sequence>\n' +
' <xsd:attribute name="OrderDate" type="xsd:date"/>\n' +
'</xsd:complexType>\n' +
'<xsd:complexType name="Address">\n' +
' <xsd:sequence>\n' +
'  <xsd:element name="street" type="xsd:string"/>\n' +
'  <xsd:element name="city"   type="xsd:string"/>\n' +
'  <xsd:element name="state"  type="xsd:string">\n' +
'    <xsd:annotation>\n' +
'  	   <xsd:documentation>\n' +
'  	     State if country is US\n' +
'  	   </xsd:documentation>\n' +
'    </xsd:annotation>\n' +
'  </xsd:element>\n' +
'  <xsd:element name="zip"    type="xsd:integer"/>\n' +
' </xsd:sequence>\n' +
' <xsd:attribute name="country" type="xsd:string">\n' +
' </xsd:attribute>\n' +
'</xsd:complexType>\n' +
'</xsd:schema>';

    return {
    	getXml:function() {return sample2}
    };
});