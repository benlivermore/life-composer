var expect = require('chai').expect,
    isAnObjectDescribedBy = require('../src/isAnObjectDescribedBy').isAnObjectDescribedBy,
    Descriptor = require('../src/isAnObjectDescribedBy').Descriptor;

describe('isAnObjectDescribedBy', function() {

    describe('when comparing by basic object equivalence', function() {
        it('should return true if there are two empty objects', function() {
            var obj = {},
                objectDescription = {};

            expect(isAnObjectDescribedBy(obj, objectDescription)).to.be.true();
        });

        it('should return false if description has a prop that object does not', function() {
            var obj = {
                    test: "same"
                },
                objectDescription = {
                    test: "same",
                    descriptionOnly: "description only"
                };

            expect(isAnObjectDescribedBy(obj, objectDescription)).to.be.false();
        });

        it('should return false if object has a prop that description does not', function() {
            var obj = {
                    test: "same",
                    objectOnly: "object only"
                },
                objectDescription = {
                    test: "same"
                };

            expect(isAnObjectDescribedBy(obj, objectDescription)).to.be.false();
        });

        it('should return true if description has a prop with same value', function() {
            var obj = {
                    test: "same"
                },
                objectDescription = {
                    test: "same"
                };

            expect(isAnObjectDescribedBy(obj, objectDescription)).to.be.true();
        });

        it('should return false if description has a prop that has a different value from obj', function() {
            var obj = {
                    test: "not definition"
                },
                objectDescription = {
                    test: "description"
                };

            expect(isAnObjectDescribedBy(obj, objectDescription)).to.be.false();
        });

        it('should return true when describing deeply equivalent objects', function() {
            var objEmpty, objectDescriptionEmpty, objDeep, objectDescriptionDeep;

            objEmpty = {
                test: {}
            };
            objectDescriptionEmpty = {
                test: {}
            };

            expect(isAnObjectDescribedBy(objEmpty, objectDescriptionEmpty)).to.be.true();

            objDeep = {
                test: {
                    deep: {
                        equivalence: "test"
                    }
                }
            };
            objectDescriptionDeep = {
                test: {
                    deep: {
                        equivalence: "test"
                    }
                }
            };

            expect(isAnObjectDescribedBy(objDeep, objectDescriptionDeep)).to.be.true();
        });


        it('should return false when describing deep objects that are not equivalent', function() {
            var objWithDifPropNames, objWithDifPropNamesDescription, objDeep, objectDescriptionDeep;


            objWithDifPropNames = {
                test: {}
            };
            objWithDifPropNamesDescription = {
                testNot: {}
            };

            expect(isAnObjectDescribedBy(objWithDifPropNames, objWithDifPropNamesDescription)).to.be.false();


            objDeep = {
                test: {
                    deep: {
                        equivalence: "test1"
                    }
                }
            };
            objectDescriptionDeep = {
                test: {
                    deep: {
                        equivalence: "test2"
                    }
                }
            };

            expect(isAnObjectDescribedBy(objDeep, objectDescriptionDeep)).to.be.false();
        });

        // it('should return false if function is not equivalent to a function in description', function() {
        //     var obj = {
        //             test: function() {}
        //         },
        //         objDescriptionWithFunction = {
        //             test: function() {
        //                 return true;
        //             }
        //         };

        //     expect(isAnObjectDescribedBy(obj, objDescriptionWithFunction)).to.be.false();
        // });
    });

    describe('when comparing by descriptive function', function() {


        it('should return true if function returns truthy value', function() {
            var obj = {
                    test: "not definition"
                },
                objDescriptionWithTrue = {
                    test: Descriptor(function() {
                        return true;
                    })
                },
                objDescriptionWithTruthy = {
                    test: Descriptor(function() {
                        return "truthy";
                    })
                };

            expect(isAnObjectDescribedBy(obj, objDescriptionWithTrue)).to.be.true();
            expect(isAnObjectDescribedBy(obj, objDescriptionWithTruthy)).to.be.true();
        });

        it('should return false if function returns falsy value', function() {
            var obj = {
                    test: "not definition"
                },
                objDescriptionWithFalse = {
                    test: Descriptor(function() {
                        return false;
                    })
                },
                objDescriptionWithFalsy = {
                    test: Descriptor(function() {
                        return 0;
                    })
                };

            expect(isAnObjectDescribedBy(obj, objDescriptionWithFalse)).to.be.false();
            expect(isAnObjectDescribedBy(obj, objDescriptionWithFalsy)).to.be.false();
        });

        it('should return true if function returns truthy value using the actual property value', function() {
            var obj = {
                    test: "my test value"
                },
                objectDescription = {
                    test: Descriptor(function(objValue) {
                        return objValue === "my test value";
                    })
                };

            expect(isAnObjectDescribedBy(obj, objectDescription)).to.be.true();
        });

        it('should return false if function returns falsy value using the actual property value', function() {
            var obj = {
                    test: "my test value"
                },
                objectDescription = {
                    test: Descriptor(function(objValue) {
                        return objValue === "some other value";
                    })
                };

            expect(isAnObjectDescribedBy(obj, objectDescription)).to.be.false();
        });

    });
});