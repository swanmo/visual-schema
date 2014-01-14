define(['logger'], function(sut) {
    describe("Logger", function() {
        it ("should be a module", function() {
            expect(sut).toBeDefined();
        });

        it ("should accept info messages", function() {
            sut.info("sample info message");
            expect(sut.messages.length).toEqual(1);

            sut.error("sample error message");
            expect(sut.messages.length).toEqual(2);
        });

    });


});