var isAnObjectDescribedBy = require('./isAnObjectDescribedBy').isAnObjectDescribedBy;

// expect(obj).to.be.described.By(description);
function describedByPlugin(_chai, utils) {

    _chai.Assertion.addMethod('describedBy', function(objDescription) {
        var obj = this._obj,
            matchesDescription;

        matchesDescription = isAnObjectDescribedBy(obj, objDescription);
        this.assert(
            matchesDescription, "expected #{this} to match #{exp}", "expected #{this} not to match #{exp}", objDescription, obj, true
        );
    });

}
describedByPlugin.Descriptor = require('./isAnObjectDescribedBy').Descriptor;
module.exports = describedByPlugin;