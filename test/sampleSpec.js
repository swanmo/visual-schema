define(['sample'], function(sut) {
    describe("sample", function() {
        it ("should be a module", function() {
        	console.log('s', sut);
            expect(sut).toBeDefined();
        });
    });
});