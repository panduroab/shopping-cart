const supertest = require('supertest');
const chai = require('chai');
const clientController = require('../../src/controllers/Client')();

const config = {
    logger: false,
    dbConfig: {
        domain: '127.0.0.1',
        port: '27017',
        dbName: 'shopping-cart'
    }
};

const server = require('../../src/server')(config);

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
                        done(err);
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
                .expect('Content-Type', /text/)
                .expect(200)
                .then(res => {done();})
                .catch(err => {done(err);
                });
        }).catch(err => {
            done(err);
        });
    });
});
