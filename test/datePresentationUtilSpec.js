define(['datePresentationUtil'], function(sut) {
    var fabricateDate = function(_yr, _mon, _day) {
        var d = new Date();
        d.setFullYear(_yr);
        d.setMonth(_mon);
        d.setDate(_day);
        return d;
    };

    var fabricateTime = function(_yr, _mon, _day, _h, _m, _s) {
        var d = fabricateDate(_yr, _mon, _day);
        d.setHours(_h);
        d.setMinutes(_m);   
        d.setSeconds(_s);
        return d;
    };

    describe("DatePresentationUtil, ", function() {
        it ("should be a module", function() {
            expect(sut).toBeDefined();
        });

        describe("month", function() {
            it ("should be 'Jan'", function() {
                expect(sut.month(fabricateDate(2016, 0, 1))).toBe('Jan');
            });

            it ("should be 'Dec'", function() {
                expect(sut.month(fabricateDate(2016, 11, 1))).toBe('Dec');
            });
        });

        describe("since", function() {
            it ("should be a second ago", function() {
                expect(sut.since(
                    fabricateTime(2016, 0, 1, 7, 9, 58),
                    fabricateTime(2016, 0, 1, 7, 10, 0)
                    
                )).toBe('a second ago');
            });
            it ("should be a few seconds ago", function() {
                expect(sut.since(
                    fabricateTime(2016, 0, 1, 7, 9, 44),
                    fabricateTime(2016, 0, 1, 7, 10, 0)
                    )).toBe('a few seconds ago');
            });
        });

    });


});