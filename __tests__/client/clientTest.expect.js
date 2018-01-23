const supertest = require('supertest');
const chai = require('chai');
const should = chai.should();
const clientController = require('../../src/controllers/Client')();
const clientModel = require('../../src/db/models/client');
const expect = require('chai').expect;

const config = {
    logger: false,
    dbConfig: {
        domain: '127.0.0.1',
        port: '27017',
        dbName: 'shopping-cart'
    }
};

const server = require('../../src/server')(config);

describe('ClientController', () => {
    it('Should create a client', done => {
        let clientObj = {
            name: 'name',
            lastnamefa: 'lastnamefa',
            lastnamemo: 'lastnamemo',
            birthdate: '1985-01-23',
            address: 'address #281'
        };
        clientController.postClient(clientObj)
            .then(clients => done())
            .catch(err => done(err));
    });
    it('Should fetch all clients', done => {
        clientController.getAllClients()
            .then(clients => done()).catch(err => done(err));
    });
    it('Should fetch a client', done => {
        clientController.getRandomClient().then(client => {
            let id = client._id;
            clientController.getClient(id)
                .then(client => {
                    client.should.to.have.property('name');
                    client.name.should.to.not.equal(null);
                    done();
                }).catch(err => {
                    done(err);
                });
        }).catch();
    });
    it('Should delete a client', done => {
        clientController.getRandomClient().then(client => {
            let id = client._id;
            clientController.deleteClient(id)
                .then(result => {
                    result.should.be.a('string');
                    done();
                }).catch(err => {
                    done(err);
                });
        }).catch();
    });
});

describe('API Client', function () {
    it('POST should create an client', done => {
        let client = {
            name: 'Gerardo',
            lastnamefa: 'Gutierrez',
            lastnamemo: 'Castaneda',
            birthdate: new Date(1993, 11, 20),
            address: 'Somewhere #12'
        };
        supertest(server).post('/api/client')
            .set('Accept', 'application/json')
            .send(client)
            .expect(200)
            .then(res => done())
            .catch(err => done(err));
    });
    it('Get should fetch all clients', done => {
        supertest(server).get('/api/client')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                id = res.body._id;
                done();
            })
            .catch(err => { done(err); });
    });
    it('Should get client /id', done => {
        clientController.getRandomClient().then(client => {
            let id = client._id;
            supertest(server).get(`/api/client/${id}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err)
                        return done(err);
                    done();
                });
        }).catch(err => {
            done(err);
        });
    });
    it('Should delete client /id', done => {
        clientController.getRandomClient().then(client => {
            let id = client._id;
            supertest(server).delete(`/api/client/${id}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err)
                        return done(err);
                    done();
                });
        }).catch(err => {
            done(err);
        });
    });
});

describe('Types client', () => {
    it('GET the type of all the clients', done => {
        supertest(server).get('/api/client')
            .expect(200)
            .end((err, res) => {
                res.body.forEach((client, index) => {
                    expect(client).to.have.property('_id');
                    expect(client._id).to.not.equal(null);
                    expect(client).to.have.property('name');
                    expect(client.name).to.not.equal(null);
                    expect(client).to.have.property('lastnamefa');
                    expect(client.lastnamefa).to.not.equal(null);
                    expect(client).to.have.property('lastnamemo');
                    expect(client.lastnamemo).to.not.equal(null);
                    expect(client).to.have.property('birthdate');
                    expect(client.birthdate).to.not.equal(null);
                    expect(client).to.have.property('address');
                    expect(client.address).to.not.equal(null);
                });
                done();
            });
    });
    it('GET the correct typesfor the JSON', done => {
        clientController.getRandomClient().then(result => {
            supertest(server).get(`/api/client/${result._id}`)
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.have.property('_id');
                    expect(res.body._id).to.not.equal(null);
                    expect(res.body).to.have.property('name');
                    expect(res.body.name).to.not.equal(null);
                    expect(res.body).to.have.property('lastnamefa');
                    expect(res.body.lastnamefa).to.not.equal(null);
                    expect(res.body).to.have.property('lastnamemo');
                    expect(res.body.lastnamemo).to.not.equal(null);
                    expect(res.body).to.have.property('birthdate');
                    expect(res.body.birthdate).to.not.equal(null);
                    expect(res.body).to.have.property('address');
                    expect(res.body.address).to.not.equal(null);
                    done();
                });
        }).catch(err => done(err));
    });
    it('Check the element post have the correct type', done => {
        const clientObj = {
            "name": "Samuel",
            "lastnamefa": "Marin",
            "lastnamemo": "Escobedo",
            "birthdate": new Date(),
            "address": "Mi casa"
        };
        supertest(server).post('/api/client/')
            .set('Accept', 'application/json')
            .send(clientObj)
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.have.property('_id');
                expect(res.body._id).to.not.equal(null);
                expect(res.body).to.have.property('name');
                expect(res.body.name).to.not.equal(null);
                expect(res.body).to.have.property('lastnamefa');
                expect(res.body.lastnamefa).to.not.equal(null);
                expect(res.body).to.have.property('lastnamemo');
                expect(res.body.lastnamemo).to.not.equal(null);
                expect(res.body).to.have.property('birthdate');
                expect(res.body.birthdate).to.not.equal(null);
                expect(res.body).to.have.property('address');
                expect(res.body.address).to.not.equal(null);
                done();
            });
    });
    it('Check the element deleted have the correct type', done => {
        clientController.getRandomClient().then(result => {
            supertest(server).delete(`/api/order/${result._id}`)
                .expect(200)
                .end((err, res) => {
                    res.body.should.be.a('Object');
                    done();
                });
        }).catch(err => done(err));
    });
    it('Should check the type of the update client', done => {
        const clientObj = {
            "name": "Samuel",
            "lastnamefa": "Marin",
            "lastnamemo": "Escobedo",
            "birthdate": new Date(),
            "address": "Mi casa"
        };
        clientController.getRandomClient().then(result => {
            supertest(server).put(`/api/order/${result._id}`)
                .expect(200)
                .send(clientObj)
                .end((err, res) => {
                    expect(result).to.have.property('_id');
                    expect(result._id).to.not.equal(null);
                    expect(result).to.have.property('name');
                    expect(result.name).to.not.equal(null);
                    expect(result).to.have.property('lastnamefa');
                    expect(result.lastnamefa).to.not.equal(null);
                    expect(result).to.have.property('lastnamemo');
                    expect(result.lastnamemo).to.not.equal(null);
                    expect(result).to.have.property('birthdate');
                    expect(result.birthdate).to.not.equal(null);
                    expect(result).to.have.property('address');
                    expect(result.address).to.not.equal(null);
                    done();
                })
        }).catch(err => done(err));
    });
});