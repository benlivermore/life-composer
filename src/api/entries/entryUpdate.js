var EntryModel = require('./entryModel');

module.exports = {


    updateOne: function(request, response) {
        var id = request.params.id;

        var updates = {
            date: request.body.date
        };

        EntryModel.findByIdAndUpdate(id, updates, function(err, entry) {

            if (!err) {
                response.json({
                    id: entry._id,
                    text: entry.text,
                    date: entry.date,
                    createdDate: entry.createdDate
                });
            } else {
                response.json({
                    error: "error"
                });
            }
        });

    }
};