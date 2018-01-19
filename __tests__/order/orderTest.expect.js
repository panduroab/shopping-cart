const supertest = require('supertest');
const chai = require('chai');
const assert = require('assert').assert;
const server = require('../../src/server')({ logger: false });

const orderController = require('../../src/controllers/Order')();

describe('API Order', function () {
    it('GET should fetch all orders', done => {
        supertest(server).get('/api/order')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => done())
            .catch(err => done(err));
    });
    it('Should get order /id', done => {
        let url = '/api/order';
        orderController.getRandomOrder().then(result => {
            order = result;
            let id = order._id;
            supertest(server).get(`${url}/${id}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => done())
                .catch(err => done(err));
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
    it('Should put an order /id', done => {
        let orderObj = {
            "status": "pending",
            "date": "2018-01-18T18:51:49.207Z",
            "products": [],
            "client_id": 1,
            "__v": 0
        };
        orderController.getRandomOrder().then(result => {
            order = result;
            let id = order._id;
            supertest(server).put(`/api/order/${id}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .send(orderObj)
                .expect(200)
                .then(res => done())
                .catch(err => done(err));
        });
    });
    it('Should delete order /id', done => {
        let url = '/api/order';
        orderController.getRandomOrder().then(result => {
            let order = result;
            let id = order._id;
            supertest(server).delete(`${url}/${id}`)
                // .set('Accept', 'application/json')
                .expect('Content-Type', /text/)
                .expect(200)
                .then(res => done())
                .catch(err => done(err));
        });
    });
});
