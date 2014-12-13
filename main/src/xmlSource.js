define(function() {

    var sample =
        '<?xml version="1.0"?>\n' +
'<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">\n\n' +

'<xs:element name="note">\n' +
'  <xs:complexType>\n' +
'    <xs:sequence>\n' +
'      <xs:element name="to" type="xs:string"/>\n' +
'      <xs:element name="from" type="xs:string"/>\n' +
'      <xs:element name="heading" type="xs:string"/>\n' +
'      <xs:element name="body" type="xs:string"/>\n' +
'    </xs:sequence>\n' +
'  </xs:complexType>\n' +
'</xs:element>\n\n' +

'</xs:schema>';

var sample2 = '<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema" \n' +
'elementFormDefault="qualified">\n\n' +
'<xsd:element name="PurchaseOrder" type="tns:PurchaseOrderType"/>\n' +
'<xsd:complexType name="PurchaseOrderType">\n' +
' <xsd:sequence>\n' +
'  <xsd:element name="ShipTo" type="tns:USAddress" maxOccurs="2"/>\n' +
'  <xsd:element name="BillTo" type="tns:USAddress"/>\n' +
' </xsd:sequence>\n' +
' <xsd:attribute name="OrderDate" type="xsd:date"/>\n' +
'</xsd:complexType>\n' +

'<xsd:complexType name="USAddress">\n' +
' <xsd:sequence>\n' +
'  <xsd:element name="name"   type="xsd:string"/>\n' +
'  <xsd:element name="street" type="xsd:string"/>\n' +
'  <xsd:element name="city"   type="xsd:string"/>\n' +
'  <xsd:element name="state"  type="xsd:string"/>\n' +
'  <xsd:element name="zip"    type="xsd:integer"/>\n' +
' </xsd:sequence>\n' +
' <xsd:attribute name="country" type="xsd:NMTOKEN" fixed="US"/>\n' +
'</xsd:complexType>\n' +
'</xsd:schema>';

    return {
    	getXml:function() {return sample2},
        getTestXml:function() {return sample}
    }
});