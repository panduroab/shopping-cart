const supertest = require('supertest');
const chai = require('chai');
const assert = require('assert');
const server = require('../../src/server')({ logger: false });

describe('API Order', function () {
    it('GET should fetch all orders', done => {
        supertest(server).get('/api/order')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                //console.log(res.body);
                done();
            })
            .catch(err => {
                done(err);
            });
    });
    it('Should get order /id', done => {
        let url = '/api/order';
        let id = '5a60ecc523ac9505ff84dd2d';
        supertest(server).get(`${url}/${id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                done();
            })
            .catch(err => {
                done(err);
            });
    });
    it('POST should create an order', done => {
        let orderObj = { status: 'pending', products: [], client_id: 1 };
        supertest(server).post('/api/order')
            .set('Accept', 'application/json')
            .send(orderObj)
            .expect('content-Type', /text/)
            .expect(200)
            .then(res => done())
            .catch(err => done(err));
    });
    it('Should delete order /id', done => {
        let url = '/api/order';
        let id = '5a5f7aa660373a0c27edf708';
        supertest(server).delete(`${url}/${id}`)
            // .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            .expect(200)
            .then(res => {
                console.log(res);
                done();
            })
            .catch(err => {
                done(err);
            });
    });
});
