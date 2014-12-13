var express = require('express'),
    EntryModel = require('./entryModel'),
    findAllEntries = require('./entryFind').findAll,
    createEntry = require('./entryCreate').create,
    isValidMongoId = require('mongoose').Types.ObjectId.isValid,
    entryRouter = express.Router(),
    entryRoute,
    entryRouteWithId;

entryRoute = entryRouter.route('/');
entryRouteWithId = entryRouter.route('/:id');

entryRoute.get(findAllEntries);
entryRoute.post(createEntry);

module.exports = entryRouter;