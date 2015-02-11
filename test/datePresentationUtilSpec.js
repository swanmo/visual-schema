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
                    
                )).toBe('A second ago');
            });
            it ("should be A few seconds ago", function() {
                expect(sut.since(
                    fabricateTime(2016, 0, 1, 7, 9, 44),
                    fabricateTime(2016, 0, 1, 7, 10, 0)
                    )).toBe('A few seconds ago');
            });

            it ("should be A minute ago", function() {
                expect(sut.since(
                    fabricateTime(2016, 0, 1, 7, 8, 44),
                    fabricateTime(2016, 0, 1, 7, 10, 0)
                    )).toBe('A minute ago');
            });

            it ("should be Seven minutes ago", function() {
                expect(sut.since(
                    fabricateTime(2016, 0, 1, 7, 10, 44),
                    fabricateTime(2016, 0, 1, 7, 18, 0)
                    )).toBe('Seven minutes ago');
            });

            it ("should be 22 minutes ago", function() {
                expect(sut.since(
                    fabricateTime(2016, 0, 1, 7, 10, 44),
                    fabricateTime(2016, 0, 1, 7, 33, 0)
                    )).toBe('22 minutes ago');
            });

            it ("should be an hour ago", function() {
                expect(sut.since(
                    fabricateTime(2016, 0, 1, 7, 10, 44),
                    fabricateTime(2016, 0, 1, 8, 33, 0)
                    )).toBe('An hour ago');
            });

            it ("should be three hours ago", function() {
                expect(sut.since(
                    fabricateTime(2016, 0, 1, 7, 10, 44),
                    fabricateTime(2016, 0, 1, 10, 33, 0)
                    )).toBe('Three hours ago');
            });

            it ("should be A day ago", function() {
                expect(sut.since(
                    fabricateTime(2016, 0, 1, 7, 10, 44),
                    fabricateTime(2016, 0, 2, 7, 33, 0)
                )).toBe('A day ago');
            });

            it ("should be Ten days ago", function() {
                expect(sut.since(
                    fabricateTime(2016, 0, 1, 7, 10, 44),
                    fabricateTime(2016, 0, 11, 7, 11, 0)
                )).toBe('Ten days ago');
            });

            it ("should be A week ago", function() {
                expect(sut.since(
                    fabricateTime(2016, 0, 1, 7, 10, 44),
                    fabricateTime(2016, 0, 8, 7, 11, 0)
                )).toBe('A week ago');
            });

            it ("should be A week ago", function() {
                expect(sut.since(
                    fabricateTime(2016, 0, 1, 7, 10, 44),
                    fabricateTime(2016, 0, 8, 7, 11, 0)
                )).toBe('A week ago');
            });
            it ("should be A month ago", function() {
                expect(sut.since(
                    fabricateTime(2016, 0, 1, 7, 10, 44),
                    fabricateTime(2016, 1, 2, 7, 11, 0)
                )).toBe('A month ago');
            });

            it ("should be Two months ago", function() {
                expect(sut.since(
                    fabricateTime(2016, 0, 1, 7, 10, 44),
                    fabricateTime(2016, 2, 27, 7, 11, 0)
                )).toBe('Two months ago');
            });

            it ("should be A year ago", function() {
                expect(sut.since(
                    fabricateTime(2016, 0, 1, 7, 10, 44),
                    fabricateTime(2017, 2, 27, 7, 11, 0)
                )).toBe('A year ago');
            });

            it ("should be Two years ago", function() {
                expect(sut.since(
                    fabricateTime(2016, 0, 1, 7, 10, 44),
                    fabricateTime(2018, 0, 2, 7, 11, 0)
                )).toBe('Two years ago');
            });

        });

    });


});