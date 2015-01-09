/*jshint expr: true*/
var request = require('supertest'),
    composerAPI = require('../../../src/app'),
    chai = require("chai"),
    expect = chai.expect,
    describeByPlugin = require('/Users/blivermore/workspace/chai-describer/src/chai-describer'),
    Descriptor = describeByPlugin.Descriptor,
    MongoClient = require('mongodb').MongoClient,
    app = composerAPI.start('mongodb://localhost/test', 3000),
    testDB,
    expectedEntry1,
    expectedEntry2;

chai.use(describeByPlugin);

before(function(done) {
    MongoClient.connect("mongodb://localhost/test", function(err, db) {
        testDB = db;
        done();
    });
});

after(function(done) {
    testDB.close(function() {
        done();
    });

});

beforeEach(function(done) {
    testDB.createCollection("entries", function(err, collection) {
        testDB.collection('entries', function(err, collection) {
            collection.insert({
                "text": "entry 1",
                "date": '1420784009676',
                "createdDate": Date.now(),
                "extraneous": 'property'

            }, function(err, data) {
                expectedEntry1 = data[0];

                collection.insert({
                    "text": "entry 2",
                    "date": "1420785000000",
                    "createdDate": Date.now(),
                    "extraneous": 'property'

                }, function(err, data) {
                    expectedEntry2 = data[0];
                    done();
                });
            });




        });

    });
});

afterEach(function(done) {
    testDB.collection('entries', function(err, collection) {
        collection.remove({}, function() {});
        done();
    });
});

describe('GET /entries', function() {
    it('respond with a the list of all entries if no id given', function(done) {
        request(app)
            .get('/entries')
            .expect(200)
            .end(function(err, response) {
                var entry1, entry2;
                if (err) {
                    return done(err);
                }
                entry1 = response.body[0];
                entry2 = response.body[1];

                expect(entry1).to.be.describedBy({
                    createdDate: Descriptor.Date,
                    text: "entry 1",
                    date: "2015-01-09T06:13:29.676Z",
                    id: Descriptor.String
                });

                expect(entry2).to.be.describedBy({
                    createdDate: Descriptor.Date,
                    text: "entry 2",
                    date: "2015-01-09T06:30:00.000Z",
                    id: Descriptor.String
                });

                done();
            });

    });

    it('respond with a specific entry if valid id given', function(done) {
        request(app)
            .get('/entries/' + expectedEntry1._id)
            .expect(200)
            .end(function(err, response) {
                expect(response.body).to.be.describedBy({
                    createdDate: Descriptor.Date,
                    text: "entry 1",
                    date: "2015-01-09T06:13:29.676Z",
                    id: expectedEntry1._id.toString()
                });

                done();
            });
    });


});

describe('When the page does not exist', function() {
    it('respond with 404', function(done) {
        request(app)
            .get('/nothing')
            .expect(404, done);
    });
});

describe('POST /entries', function() {
    it('respond with 200', function(done) {
        request(app)
            .post('/entries')
            .send({
                text: 'test post',
                date: '1420491945907'
            })
            .expect(200)
            .end(function(err, response) {
                if (err) {
                    return done(err);
                }

                expect(response.body).to.be.describedBy({
                    createdDate: Descriptor(function(val) {
                        return !!val;
                    }),
                    text: "test post",
                    date: "2015-01-05T21:05:45.907Z",
                    id: Descriptor(function(val) {
                        return val.length > 0;
                    })
                });

                done();
            });


    });
});