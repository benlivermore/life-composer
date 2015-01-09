var EntryModel = require('./entryModel');

module.exports = {

    updateOne: function(request, response) {
        var id = request.params.id;

        var updates = {
            date: request.body.date
        };

        EntryModel.findByIdAndUpdate(id, updates, function(err, entry) {
            var cleanEntry = EntryModel.cleanEntry(entry);
            if (!err) {
                response.json(cleanEntry);
            } else {
                response.json({
                    error: "error"
                });
            }
        });

    }
};