var express = require('express'),
    EntryModel = require('./entryModel'),
    findAllEntries = require('./entryFind').findAll,
    findOneEntry = require('./entryFind').findOne,
    updateOneEntry = require('./entryUpdate').updateOne,
    createEntry = require('./entryCreate').create,
    isValidMongoId = require('mongoose').Types.ObjectId.isValid,
    entryRouter = express.Router(),
    entryRoute,
    entryRouteWithId;

entryRoute = entryRouter.route('/');
entryRouteWithId = entryRouter.route('/:id');

entryRoute.get(findAllEntries);
entryRouteWithId.get(findOneEntry);
entryRoute.post(createEntry);
entryRouteWithId.put(updateOneEntry);

module.exports = entryRouter;