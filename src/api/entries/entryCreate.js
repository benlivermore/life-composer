var EntryModel = require('./entryModel');

function createEntry(request, response) {
    var postedEntry = new EntryModel({
        body: request.body.entry,
        createdDate: Date.now()
    });

    postedEntry.save(function(err) {
        if (!err) {
            return response.json(postedEntry);
        } else {
            return response.json({
                error: "problem"
            });
        }
    });

}

module.exports = {
    create: createEntry
};