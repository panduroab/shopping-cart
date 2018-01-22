const supertest = require('supertest');
const chai = require('chai');
const should = chai.should();
const clientController = require('../../src/controllers/Client')();
const clientModel = require('../../src/db/models/client');

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
            name:       'name',
            lastnamefa: 'lastnamefa',
            lastnamemo: 'lastnamemo',
            birthdate:  '1985-01-23',
            address:    'address #281'
        };
        clientController.postClient(clientObj)
        .then(clients => done())
        .catch(err => done(err));
    });
    it('Should fetch all clients', done => {
        clientController.getAllClients()
        .then(clients => done()).catch(err => done(err));
    });
    clientController.getRandomClient().then(client => {
        it('Should fetch a client', done => {
            let id = client._id;
            clientController.getClient(id)
            .then(client => {
                client.should.to.have.property('name');
                client.name.should.to.not.equal(null);
                done();
            }).catch(err => {
                done(err);
            });
        });
    }).catch();
    clientController.getRandomClient().then(client => {
        it('Should delete a client', done => {
            let id = client._id;
            clientController.deleteClient(id)
            .then(result => {
                result.should.be.a('string');
                done();
            }).catch(err => {
                done(err);
            });
        });
    }).catch();
});

describe('API Client',function(){
    it('POST should create an client', done => {
        let client = {
            name        : 'Gerardo',
            lastnamefa  : 'Gutierrez',
            lastnamemo  : 'Castaneda',
            birthdate   : new Date(1993,11,20),
            address     : 'Somewhere #12'
        };
        supertest(server).post('/api/client')
            .set('Accept', 'application/json')
            .send(client)
            .expect(200)
            .then(res => done())
            .catch(err => done(err));
    });
    it('Get should fetch all clients', done =>{
        supertest(server).get('/api/client')
            .set('Accept','application/json')
            .expect('Content-Type',/json/)
            .expect(200)
            .then(res => {
                id=res.body._id;
                done();
            })
            .catch(err => {done(err);});
    });
    it('Should get client /id', done => {
        clientController.getRandomClient().then(client => {
            let id = client._id;
            supertest(server).get(`/api/client/${id}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if(err)
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
                    if(err)
                        return done(err);
                    done();
                });
        }).catch(err => {
            done(err);
        });
    });
});