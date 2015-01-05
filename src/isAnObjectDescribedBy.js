var _ = require('underscore');

function isEquivalentOrDescriptor(val, description) {
    return description instanceof Descriptor || _.isEqual(val, description);
}

function Descriptor(doesMatch) {
    this.doesMatch = function(obj) {
        return Boolean(doesMatch(obj));
    };
}

function isAnObjectDescribedBy(obj, objDescription) {
    var matchesDescription = true;

    matchesDescription = _.every(obj, function(val, key) {
        return isEquivalentOrDescriptor(val, objDescription[key]);
    });

    if (matchesDescription) {
        matchesDescription = _.every(objDescription, function(descriptor, descriptorKey) {
            var objectVal = obj[descriptorKey];

            if (descriptor instanceof Descriptor) {
                return descriptor.doesMatch(objectVal);
            } else {
                return obj.hasOwnProperty(descriptorKey);
            }
        });
    }

    return matchesDescription;

}

function createDescriptor(doesMatch) {
    //use Object.create instead?
    var descriptor = new Descriptor(doesMatch);
    return descriptor;
}




module.exports = {
    isAnObjectDescribedBy: isAnObjectDescribedBy,
    Descriptor: createDescriptor
};