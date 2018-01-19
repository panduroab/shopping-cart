const supertest = require('supertest');
const chai = require('chai');
const server = require('../../src/server')({logger:false});
var client = { 
            name        : 'Gerardo',
            lastnamefa  : 'Gutierrez',
            lastnamemo  : 'Castaneda',
            birthdate   : new Date(1993,11,20),
            address     : 'Somewhere #12' 
        };
var id = '';

describe('API Client',function(){
    it('POST should create an client', done => {
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
        supertest(server).get(`/api/client/${id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {done();})
            .catch(err => {done(err);});
    });
    it('Should delete client /id', done => {
        supertest(server).delete(`/api/order/${id}`)
            // .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            .expect(200)
            .then(res => {done();})
            .catch(err => {done(err);});
    });

});
