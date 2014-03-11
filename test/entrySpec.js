define(['entry'], function(sut) {
    describe("Entry", function() {
        it ("should be a module", function() {
            expect(sut).toBeDefined();
        });

        it ("should be possible to set all attributes", function() {
            var nsMap = {};
            var s = new sut("a", "b", {}, "p", nsMap);
            expect(s.prefix).toEqual("a");
            expect(s.name).toEqual("b");
            expect(s.parent).toEqual("p");
            expect(s.nsMap).toEqual(nsMap);
        });

        it ("should set the attrs-atribute for an entry with name=element", function() {
            var s = new sut("prefix", "element", {}, null);
            expect(s.attrs).toBeDefined();
        });

        it ("should set the attrs-attribute for an entry with name=attribute", function() {
            var s = new sut("prefix", "attribute", {}, null);
            expect(s.attrs).toBeDefined();
        });

        it ("should be possible to add children", function() {
            var s = new sut();
            s.addChild({name:"c1"});
			s.addChild({name:"c2"});
			expect(s.children.length).toEqual(2);
        });
    });


});