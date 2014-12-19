var mongoose = require('mongoose');

var EntrySchema = new mongoose.Schema({
    text: String,
    createdDate: Date
});

var EntryModel = mongoose.model('Entry', EntrySchema);

module.exports = EntryModel;