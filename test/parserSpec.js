define(['parser'], function(sut) {
    describe("Parser", function() {

        it ("should be possible to init with two arrays", function() {
            sut.init(["xs"], ["tns"]);
            expect(sut.xsdNamespacePrefix.length).toBe(1);
            expect(sut.targetNamespacePrefix.length).toBe(1);
        });

    });
});