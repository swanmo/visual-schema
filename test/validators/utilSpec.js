define(['validators/util'], function(validatorsUtil) {

    var sut;
    describe('Validator Util', function() {
        beforeEach(
            function() {
                sut = validatorsUtil.getInstance();
            }
        );
        describe('withoutNs', function() {
            it ('should remove colon', function() {
                expect(sut.withoutNs('xs:whatever')).toBe('whatever');
            });

            xit ('should accept strings without ns-prefix', function() {
                expect(sut.withoutNs('whatever')).toBe('whatever');
            });
        });

        describe('validateChildren', function() {
            it ('should approve element "elem" with namespace', function() {
                expect(sut.validateChildren({children: [{tagName: 'x:elem'}]}, ['sample', 'elem', 'xxx'])).toBeUndefined();
            });
        });

        describe('validateAttr', function() {
            it ('should approve attribute "test"', function() {
                //expect(sut.validateAttr({children: [{tagName: 'x:elem'}]}, ['sample', 'elem', 'xxx'])).toBeUndefined();
            });

        });
    });


});