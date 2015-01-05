var EntryModel = require('./entryModel');

function createEntry(request, response) {
    var postedEntry = new EntryModel({
        text: request.body.text,
        createdDate: Date.now()
    });

    postedEntry.save(function(err) {
        if (!err) {
            return response.json({
                id: postedEntry._id,
                text: postedEntry.text,
                createdDate: postedEntry.createdDate
            });
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