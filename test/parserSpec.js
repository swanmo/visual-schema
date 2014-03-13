define(['parser', 'model', 'xmlTestSource'], function(sut, model, xmlSource) {

    describe("Parser", function() {
		beforeEach(function() {
			model.roots = [];
		});

        it("should be able to extract namespaces", function() {
			sut.parse(xmlSource.getEmptySchemaWithNs());

			expect(model.roots.length).toEqual(1);
			expect(model.roots[0].children.length).toEqual(0);
			expect(model.roots[0].linkedEntry).toBeNull();

			expect(model.roots[0].nsMap['tns']).toEqual("http://domain.org/path/to/happiness_1.0");
			expect(model.roots[0].nsMap['targetNamespace']).toEqual("http://domain.org/path/to/happiness_1.0");
			expect(model.roots[0].nsMap['xs']).toEqual("http://www.w3.org/2001/XMLSchema");
			expect(model.roots[0].nsMap['xmlns']).toEqual("http://www.w3.org/2001/XMLSchema");
        });

        it("should be able to parse an empty xsd", function() {
			sut.parse(xmlSource.getUnqualifiedSchema());

			expect(model.roots.length).toEqual(1);
			expect(model.roots[0].children.length).toEqual(1);
			expect(model.roots[0].children[0].attrs.name).toEqual('teresa');

        });

    });
});