const supertest = require('supertest');
const api = supertest('http://localhost:3000');
const chai = require('chai');
const server = require('../../src/server')({ logger: false });
const db = require('../../src/db/db');

describe('API Order', function () {
    // db({ domain: '127.0.0.1', port: '27017', dbNme: 'shopping-cart' });
    // server.listen(3000, () => console.log('Server is running at:', 3000));
    it('GET should fetch all orders', done => {
        api.get('/api/order')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                //console.log(res.body);
                done();
            })
            .catch(err => {
                console.log(err);
            });
    });
    it('Should get order /id', done => {
        let url = '/api/order';
        let id = '5a5f7aa660373a0c27edf708';
        api.get(`${url}/${id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                done();
            })
            .catch(err => {
                console.log(err);
            });
    });
    it('POST should create an order', done => {
        let orderObj = { status: 'pending', products: [], client_id: 1 };
        api.post('/api/order')
            .set('Accept', 'application/json')
            .send(orderObj)
            .expect(200)
            .then(res => done())
            .catch(err => done(err));
    });
});
