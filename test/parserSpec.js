define(['parser', 'model', 'xmlTestSource'], function(sut, model, xmlSource) {

    describe("Parser", function() {
		beforeEach(function() {
			model.roots = [];
		});

        it("should extract namespaces", function() {
			sut.parse(xmlSource.getEmptySchemaWithNs());

			expect(model.roots.length).toEqual(1);
			expect(model.roots[0].children.length).toEqual(0);
			expect(model.roots[0].linkedEntry).toBeNull();

			expect(model.roots[0].nsMap['tns']).toEqual("http://domain.org/path/to/happiness_1.0");
			expect(model.roots[0].nsMap['targetNamespace']).toEqual("http://domain.org/path/to/happiness_1.0");
			expect(model.roots[0].nsMap['xs']).toEqual("http://www.w3.org/2001/XMLSchema");
			expect(model.roots[0].nsMap['xmlns']).toEqual("http://www.w3.org/2001/XMLSchema");
		});

		it("should be able to parse an unqualified xsd (with one child)", function() {
			sut.parse(xmlSource.getUnqualifiedSchema());

			expect(model.roots.length).toEqual(1);
			expect(model.roots[0].children.length).toEqual(1);
			expect(model.roots[0].children[0].attrs.name).toEqual('teresa');

		});

		it("should recognize multiple elements", function() {
			sut.parse(xmlSource.getXsdWithMultipleRoots());

			expect(model.roots[0].children.length).toEqual(3);
			/* First child */
			expect(model.roots[0].children[0].name).toEqual("element");
			expect(model.roots[0].children[0].attrs.name).toEqual("birdList");
			expect(model.roots[0].children[0].children[0].name).toEqual("complexType");
			expect(model.roots[0].children[0].children[0].children[0].name).toEqual("sequence");
			expect(model.roots[0].children[0].children[0].children[0].children[0].name).toEqual("element");
			expect(model.roots[0].children[0].children[0].children[0].children[0].attrs.ref).toEqual("tns:bird");
			expect(model.roots[0].children[0].children[0].children[0].children[0].attrs.minOccurs).toEqual("0");
			expect(model.roots[0].children[0].children[0].children[0].children[0].attrs.maxOccurs).toEqual("unbounded");


			/* Second child */
			expect(model.roots[0].children[1].name).toEqual("element");
			expect(model.roots[0].children[1].attrs.name).toEqual("bird");
			expect(model.roots[0].children[1].attrs.type).toEqual("tns:birdType");
			/* Third child */

			expect(model.roots[0].children[2].name).toEqual("complexType");
			expect(model.roots[0].children[2].attrs.name).toEqual("birdType");
			expect(model.roots[0].children[2].children[0].children[0].name).toEqual("sequence");
			expect(model.roots[0].children[2].children[0].children[0].children.length).toEqual(3);
			expect(model.roots[0].children[2].children[0].children[0].children[0].children[0].children[0].children[0].name).toEqual("element");
			expect(model.roots[0].children[2].children[0].children[0].children[0].children[0].children[0].children[0].attrs.name).toEqual("predominantColor");
			expect(model.roots[0].children[2].children[0].children[0].children[0].children[0].children[0].children[0].attrs.type).toEqual("xs:string");
		});
    });
});