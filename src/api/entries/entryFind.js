var EntryModel = require('./entryModel');

function findAllEntries(req, res) {

    return EntryModel.find(function(err, entries) {
        if (!err) {
            res.json(entries);
        } else {
            res.json({
                error: 'error'
            });
        }
    });
}

module.exports = {
    findAll: findAllEntries
};