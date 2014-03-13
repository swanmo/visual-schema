define(['linker', 'entry'], function(sut, Entry) {
    describe("Linker", function() {
		var fabricateElement = function(_xsPrefix, _xsName, _name, _type, _ref, _base, kids) {
			return {
				prefix: _xsPrefix,
        		name: _xsName,
        		parent: null,
        		children: kids,
                linkedEntry: null,
				attrs:{
					name: _name,
        			type: _type,
        			minOccurs: null,
        			maxOccurs: null,
        			ref: _ref,
                    base:_base
				}
			};
		}

        var fabricateSampleWithTnsPrefix = function () {
            var testSubject = [
                    fabricateElement("xs", "schema", null, null, null, null, [
                        fabricateElement("xs", "element", "test", "tns:testType", null, null, null, []),
                        fabricateElement("xs", "complexType", "testType", null, null, null, null,[
                            fabricateElement("xs", "sequence", null, null, null, null, [
                                fabricateElement("xs", "element", "species", "xs:string", null, null, []),
                                fabricateElement("xs", "element", "color", "xs:string", null, null, [])
                                ])
                            ])
                        ]),
                ];
            testSubject[0].nsMap = {};
            testSubject[0].nsMap['targetNamespace'] = "sample.org";
            testSubject[0].nsMap['tns'] = "sample.org";
            testSubject[0].nsMap['xs'] = "http://www.w3.org/2001/XMLSchema";
            return testSubject;
        }

        var fabricateSampleWithoutPrefix = function () {
            var testSubject = [
                    fabricateElement("xs", "schema", null, null, null, null, [
                        fabricateElement("xs", "element", "test", "testType", null, null, null, []),
                        fabricateElement("xs", "complexType", "testType", null, null, null, null,[
                            fabricateElement("xs", "sequence", null, null, null, null, [
                                fabricateElement("xs", "element", "species", "xs:string", null, null, []),
                                fabricateElement("xs", "element", "color", "xs:string", null, null, [])
                                ])
                            ])
                        ]),
                ];
            testSubject[0].nsMap = {};
            testSubject[0].nsMap['targetNamespace'] = "sample.org";
            testSubject[0].nsMap['tns'] = "sample.org";
            testSubject[0].nsMap['xs'] = "http://www.w3.org/2001/XMLSchema";
            return testSubject;
        }

        it ("should link tns-prefixed type-reference", function() {
            var arrTest = fabricateSampleWithTnsPrefix();
            sut.link(arrTest);
            expect(arrTest[0].children[0].linkedEntry).not.toBe(null);

        });

        it ("should link non-prefixed type-reference", function() {
            var arrTest = fabricateSampleWithoutPrefix();
            sut.link(arrTest);
            expect(arrTest[0].children[0].linkedEntry).not.toBe(null);

        });

    });
});