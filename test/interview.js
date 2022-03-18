const chai = require('chai');
const chaiHttp = require('chai-http');
const { response } = require('express');
const server = require('../index');

chai.should();

chai.use(chaiHttp);

var expect = chai.expect;

describe('interview API', () => {
    // test 5 calculation subroutes in interview route
    // No.1: test the addition route
    describe('POST /api/interview/add', function() {
        it('should add correctly', function() {
            chai.request(server)
                .post('/api/interview/add')
                .send({left: 2, right: 3})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    res.text.should.be.eql('5');
                })
        })

        it('should handle large number addition', function() {
            chai.request(server)
            .post('/api/interview/add')
            .send({left: 8255419297916905, right: -8529644131188499})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                res.text.should.be.eql('-274224833271594');
            })
        })
    })

    // No. 2: test the subtraction route
    describe('POST /api/interview/subtract', function() {
        it('should subtract correctly', function() {
            chai.request(server)
                .post('/api/interview/subtract')
                .send({left: 2, right: 3})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    res.text.should.be.eql('-1');
                })
        })

        it('should handle large number subtraction', function() {
            chai.request(server)
                .post('/api/interview/subtract')
                .send({left: -5206889747708587, right: 5689872014175681})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    res.text.should.be.eql('-10896761761884268');
                })
        })
    })

    // No 3. test the multiplication route
    describe('POST /api/interview/multiply', function() {
        it('should multiply correctly', function() {
            chai.request(server)
                .post('/api/interview/multiply')
                .send({left: 2, right: 3})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    res.text.should.be.eql('6');
                })
        })

        it('should handle large number multiplication', function() {
            chai.request(server)
                .post('/api/interview/multiply')
                .send({left: 7479075182356157, right: -5062951094146851})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    res.text.should.be.eql('-37866191877716664250389942011607');
                })
        })
    })

    // No 4. test the division route
    describe('POST /api/interview/divide', function() {
        it('should divide correctly', function() {
            chai.request(server)
                .post('/api/interview/divide')
                .send({left: 2, right: 3})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    res.text.should.be.eql('0.66666666666666666666666666666667');
                })
        })

        it('should handle large number division', function() {
            chai.request(server)
                .post('/api/interview/divide')
                .send({left: -4564296926102159, right: -3097013314139843})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    res.text.should.be.eql('1.47377375010408562210791785906658');
                })
        })
    })

    // No 5. test the remainder route
    describe('POST /api/interview/modulus', function() {
        it('should calculate remainder correctly', function() {
            chai.request(server)
                .post('/api/interview/modulus')
                .send({left: 2, right: 3})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    res.text.should.be.eql('2');
                })
        })

        it('should handle large number modulus calculation', function() {
            chai.request(server)
                .post('/api/interview/modulus')
                .send({left: 1831554870988401, right: 4836617542542109})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    res.text.should.be.eql('1831554870988401');
                })
        })
    })

    // Test the interview POST route
    describe('POST /api/interview', function() {
        it('should call external post route successfully with ID and correct result', function() {
            chai.request(server)
                .post('/api/interview')
                .send({id: "97ea56bd-ec0b-4b04-92ef-a444935dd0b6", result: 1961713190436970})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    res.text.should.be.eql('Correct')
                })
        })

        it('should catch catch error when the result is incorrect', function() {
            chai.request(server)
                .post('/api/interview')
                .send({id: "97ea56bd-ec0b-4b04-92ef-a444935dd0b6", result: 1961713190436972})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    res.text.should.be.eql('Incorrect result.')
                })
        })       
    })

    // Test the interview GET route
    describe('GET /api/interview', function() {
        it('should call the external get route, use the response to calculate the result and compare the result with the external post route', function() {
            chai.request(server)
                .get('/api/interview')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                })
        })
    })




})