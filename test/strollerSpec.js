define(['stroller'], function(sut) {
    describe("Stroller", function() {
        it ("should be a module", function() {
            expect(sut).toBeDefined();
        });

        it("should assign root with a jquery node", function() {
        	var root = sut.render([]);
        	expect(root).toBeDefined();
			expect(root.children).toBeDefined();

        });

		it("should assign root with a jquery node", function() {
        	var root = sut.render([]);
        	expect(root).toBeDefined();
			expect(root.children).toBeDefined();

        });
        
    });
});