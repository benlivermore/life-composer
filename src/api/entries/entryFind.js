var EntryModel = require('./entryModel');


function cleanEntry(entry) {
    return {
        id: entry._id,
        text: entry.text || "",
        date: entry.date,
        createdDate: entry.createdDate
    };
}

function cleanAllEntries(entries) {
    return entries.map(function(entry) {
        return cleanEntry(entry);
    });
}

function findAllEntries(req, res) {

    return EntryModel.find(function(err, entries) {
        var entriesJson = cleanAllEntries(entries);
        if (!err) {
            res.json(entriesJson);
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