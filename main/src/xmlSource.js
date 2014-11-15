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

    return {
    	getXml:function() {return sample},
        getTestXml:function() {return sample}
    }


});