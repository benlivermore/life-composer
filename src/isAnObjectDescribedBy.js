var _ = require('underscore');

function isEquivalentIgnoringFunctions(val, description) {
    return typeof description === "function" || _.isEqual(val, description);
}

function isAnObjectDescribedBy(obj, objDescription) {
    var matchesDescription = true;

    matchesDescription = !_.some(obj, function(val, key) {
        return !isEquivalentIgnoringFunctions(val, objDescription[key]);
    });

    if (matchesDescription) {
        matchesDescription = _.every(objDescription, function(descriptor, descriptorKey) {
            var objectVal = obj[descriptorKey];
            if (typeof descriptor === "function") {
                return Boolean(descriptor(objectVal));
            } else {
                return obj.hasOwnProperty(descriptorKey);
            }
        });
    }

    return matchesDescription;

}

module.exports = isAnObjectDescribedBy;