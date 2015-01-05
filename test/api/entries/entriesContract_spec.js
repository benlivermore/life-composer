/*jshint expr: true*/
var request = require('supertest'),
    composerAPI = require('../../../src/app'),
    chai = require("chai"),
    expect = chai.expect,
    describeByPlugin = require('../../../src/chai-describer'),
    Descriptor = describeByPlugin.Descriptor,
    MongoClient = require('mongodb').MongoClient,
    app = composerAPI.start('mongodb://localhost/test', 3000),
    testDB;

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
    testDB.createCollection("entries", function() {
        done();
    });
});

afterEach(function(done) {
    testDB.collection('entries', function(err, collection) {
        collection.remove({}, function() {});
        done();
    });
});

describe('GET /entries', function() {
    it('respond with 200', function(done) {
        request(app)
            .get('/entries')
            .expect(200, '[]', done);
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
                text: 'test post'
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
                    id: Descriptor(function(val) {
                        return val.length > 0;
                    })

                });

                done();
            });


    });
});