/*jshint expr: true*/
var request = require('supertest'),
    composerAPI = require('../../../src/app'),
    chai = require("chai"),
    expect = chai.expect,
    describeByPlugin = require('../../../src/chai-plugin-example'),
    MongoClient = require('mongodb').MongoClient,
    app = composerAPI.start('mongodb://localhost/test', 3000),
    testDB;

chai.use(describeByPlugin);

//expect style
//expect(obj).to.be.described.By(description);

//isAnObjectDescribedBy(obj, description);

//basic object description by equivalence
// description = {
//     test: "test"
// };

// //nested object description
// description = {
//     test: {
//         test2: "test2"
//     }
// };

// //object description by function
// description = {
//     test: function(valueToTest) {
//         return valueToTest = "my description";
//     }
// }

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
                expect({
                    test: "you"
                }).to.be.describedBy({
                    test: function() {
                        return true;
                    }
                });
                expect(response.body.createdDate).to.be.ok;
                expect(response.body.text).to.equal("test post");
                done();
            });


    });
});