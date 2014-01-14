define(['model'], function(sut) {
    describe("Model", function() {
        it ("should be a module", function() {
            expect(sut).toBeDefined();
        });

        it ("should be possible to add a root entry", function() {
        	sut.add({nodeName:"p:n"}, null);
            expect(sut.roots.length).toBe(1);
        });

        it ("should be possible to add an entry with a parent", function() {
        	var initialLength = sut.roots.length;
        	sut.add({nodeName:"p:n"}, {children:[],addChild:function(){}});
            expect(sut.roots.length).toBe(initialLength);
        });


        it ("should be assigned with the element name", function() {
        	var initialLength = sut.roots.length;
        	sut.add({nodeName:"prefix:name"}, null);
            expect(sut.roots[initialLength].name).toBe("name");
        });


        it ("should be assigned with the correct prefix from element name", function() {
            var initialLength = sut.roots.length;
            sut.add({nodeName:"prefix:name"}, null);
            expect(sut.roots[initialLength].prefix).toBe("prefix");
        });

    })
});