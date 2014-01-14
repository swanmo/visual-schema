define(['parseUtils'], function(sut) {
    describe("parseUtils", function() {
        it ("should be able to parse prefix from string", function() {
            expect(sut.parsePrefix("prefix:y")).toBe("prefix");
        });

        it ("should be able to accept string without prefix", function() {
            expect(sut.parsePrefix("y")).toBe("");
        });

		it ("should be able to parse name from string with prefix and name", function() {
            expect(sut.parseName("p:nnn")).toBe("nnn");
        });

        it ("should be able to accept string without prefix", function() {
            expect(sut.parseName("y")).toBe("y");
        });

    })
});