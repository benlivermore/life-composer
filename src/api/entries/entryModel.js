var mongoose = require('mongoose');

var EntrySchema = new mongoose.Schema({
    text: String,
    date: Date,
    createdDate: Date
});

var EntryModel = mongoose.model('Entry', EntrySchema);

EntryModel.cleanEntry = function cleanEntry(entry) {
    return {
        id: entry._id,
        text: entry.text || "",
        date: entry.date,
        createdDate: entry.createdDate
    };
};

module.exports = EntryModel;