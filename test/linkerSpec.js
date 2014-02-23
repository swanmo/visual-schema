define(['linker', 'entry'], function(sut, Entry) {
    describe("Linker", function() {
		var fabricateElement = function(_xsPrefix, _xsName, _name, _type, _ref, _base) {
			return {
				prefix: _xsPrefix,
        		name: _xsName,
        		parent: null,
        		children: [],
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


    	var fabricateModel = function() {
			return {
				roots: [
					fabricateElement("x", "element", "test", "testType", null),
					fabricateElement("x", "complexType", "testType", null, null),
                    fabricateElement("x", "complexType", "anotherType", null, null)
				]
			};
    	};

        var fabricateModelWithNs = function() {
            var x = {
                roots: [
                    fabricateElement("x", "element", "sampleName", null, null),
                    fabricateElement("x", "complexType", "testType", null, null)
                ]
            };
            var x1 = fabricateElement("xs", "complexType", null, null, null);
            x.roots[0].children.push(x1);
            var x1a = fabricateElement("xs", "sequence", null, null, null);
            x1.children.push(x1a);

            var elemWitRef = fabricateElement("xs", "element", "test", "tns:testType", null);
            x1a.children.push(elemWitRef);
            var elemWitNestedExtension = fabricateElement("xs", "element", "testX", null, null);
            x1a.children.push(elemWitNestedExtension);
            var elemWitNestedExtensionCT = fabricateElement("xs", "complexType", null, null, null);
            elemWitNestedExtension.children.push(elemWitNestedExtensionCT);
            var elemWitNestedExtensionCC = fabricateElement("xs", "complexContent", null, null, null);
            elemWitNestedExtensionCT.children.push(elemWitNestedExtensionCC);
            var elemWitNestedExtensionCC = fabricateElement("xs", "extension", null, null, null);
            elemWitNestedExtensionCT.children.push(elemWitNestedExtensionCC);
            return x;
        };

        var fabricateStringModel = function() {
            return {
                roots: [
                    fabricateElement("x", "element", "test", "xs:string", null),
                    fabricateElement("x", "complexType", "string", null, null)
                ]
            };
        };

        it ("should be possible to init with two arrays", function() {
            sut.init(["xs"], ["tns"]);
            expect(sut.xsdNamespacePrefix.length).toBe(1);
            expect(sut.targetNamespacePrefix.length).toBe(1);
        });

        it ("should link types, when referenced type is on top-level", function() {
        	var testModel = fabricateModel();
			sut.link(testModel.roots);
			expect(testModel.roots[0].linkedEntry).toBe(testModel.roots[1]);
        });

        it ("should link types, when referenced has namespace prefix and type is on top-level", function() {
            var model = fabricateModelWithNs();
            sut.init([], ["tns"]);
            sut.link(model.roots);
            //           roots[0].children[0=x1].children[0=x1a].children[0..1]
            expect(model.roots[0].children[0].children[0].children[0].linkedEntry).toBe(model.roots[1]);
        });


        it ("should not link types, prefixed with xsd-prefix", function() {
            var model = fabricateStringModel();
            sut.init(["xs"], ["tns"]);
            sut.link(model.roots);
            expect(model.roots[0].linkedEntry).toBeUndefined();
        });
    });
});