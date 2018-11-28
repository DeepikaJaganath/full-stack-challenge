let request = require('request');
let chai = require('chai');
let app = require('../../src/app.js');
let baseUrl = require('../../src/constant.js').NOTIFICATION_URL;
let loginUrl = require('../../src/constant').REDIRECT_URL;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
let expect = chai.expect;

describe("Registering a new user", function() {

    const input = {
        email: 'dummyemail@gmail.com',
        password: 'abCD1234@'
    }
    let token;

    describe("Save a user", function() {
        it("should save a user", function(done) {
            chai.request(baseUrl)
            .post('/register')
            .send(input)
            .end(function(err, res) {
                token = res.body.token;
                expect(res.status).to.equal(200);
                done();
            })
        })
    })

    describe('Authenticate user', function() {
        it('should verify user and redirect to login page', function(done) {
            chai.request(baseUrl)
            .get(`/verify/${token}`)
            .end(function(err, res) {
                expect(loginUrl)
                done();
            })
        })
    })

    describe('Login user', function() {
        it('should login user', function(done) {
            chai.request(baseUrl)
            .post('/login')
            .send(input)
            .end(function(err, res){
                expect(res.status).to.equal(200);
                done();
            })
        })
    })
})
