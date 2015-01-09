var express = require('express'),
    EntryModel = require('./entryModel'),
    findAllEntries = require('./entryFind').findAll,
    findOne = require('./entryFind').findOne,
    createEntry = require('./entryCreate').create,
    isValidMongoId = require('mongoose').Types.ObjectId.isValid,
    entryRouter = express.Router(),
    entryRoute,
    entryRouteWithId;

entryRoute = entryRouter.route('/');
entryRouteWithId = entryRouter.route('/:id');

entryRoute.get(findAllEntries);
entryRouteWithId.get(findOne);
entryRoute.post(createEntry);

module.exports = entryRouter;