define(['simpleNodeRenderer'], function(sut) {
    describe("Simple Node Renderer", function() {
        it ("should be a module", function() {
            expect(sut).toBeDefined();
        });

        it ("should return li tag for any node", function() {
            var results = sut.nodeFromEntry(
                    {   prefix:'',
                        name:'',
                        parent:null,
                        children:[]
                    }
                );
            expect(results).toBeDefined();
        });
    })
});