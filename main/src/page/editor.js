define([],
    function() {
        'use strict';
        var globalEditor;
        return {
        	val: function(value) {
        		if (globalEditor) {
                    if (value) {
                        globalEditor.setValue(value);
                        globalEditor.gotoLine(0);
                    } else {
                        return globalEditor.getValue();
                    }
        		}
        		return '';
        	},
            init: function() {
                globalEditor = ace.edit("editor");
                var editor = globalEditor;
                editor.setTheme('ace/theme/crimson_editor');
                editor.getSession().setMode('ace/mode/xml');

                editor.setShowPrintMargin(false);
                editor.setShowFoldWidgets(false);
                editor.setValue('<?xml version="1.0" encoding="UTF-8" ?>\n' +
                    '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">\n' +
                    '<!-- definition of simple elements -->\n' +
                    '<xs:element name="orderperson" type="xs:string"/>\n' +
                    '<xs:element name="name" type="xs:string"/>\n' +
                    '<xs:element name="address" type="xs:string"/>\n' +
                    '<xs:element name="city" type="xs:string"/>\n' +
                    '<xs:element name="country" type="xs:string"/>\n' +
                    '<xs:element name="title" type="xs:string"/>\n' +
                    '<xs:element name="note" type="xs:string"/>\n' +
                    '<xs:element name="quantity" type="xs:positiveInteger"/>\n' +
                    '<xs:element name="price" type="xs:decimal"/>\n' +

                    '<!-- definition of attributes -->\n' +
                    '<xs:attribute name="orderid" type="xs:string"/>\n' +

                    '<!-- definition of complex elements -->\n' +
                    '<xs:element name="shipto">\n' +
                    '  <xs:complexType>\n' +
                    '    <xs:sequence>\n' +
                    '      <xs:element ref="name"/>\n' +
                    '      <xs:element ref="address"/>\n' +
                    '      <xs:element ref="city"/>\n' +
                    '      <xs:element ref="country"/>\n' +
                    '    </xs:sequence>\n' +
                    '  </xs:complexType>\n' +
                    '</xs:element>\n' +

                    '<xs:element name="item">\n' +
                    '  <xs:complexType>\n' +
                    '    <xs:sequence>\n' +
                    '      <xs:element ref="title"/>\n' +
                    '      <xs:element ref="note" minOccurs="0"/>\n' +
                    '      <xs:element ref="quantity"/>\n' +
                    '      <xs:element ref="price"/>\n' +
                    '    </xs:sequence>\n' +
                    '  </xs:complexType>\n' +
                    '</xs:element>\n' +

                    '<xs:element name="shiporder">\n' +
                    '  <xs:complexType>\n' +
                    '    <xs:sequence>\n' +
                    '      <xs:element ref="orderperson"/>\n' +
                    '      <xs:element ref="shipto"/>\n' +
                    '      <xs:element ref="item" maxOccurs="unbounded"/>\n' +
                    '    </xs:sequence>\n' +
                    '    <xs:attribute ref="orderid" use="required"/>\n' +
                    '  </xs:complexType>\n' +
                    '</xs:element>\n\n' +

                    '</xs:schema>');
                editor.gotoLine(0);
            } // init: function()
        };

    }
);
