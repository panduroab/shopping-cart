const supertest = require('supertest');
const chai = require('chai');
const assert = require('assert');
const server = require('../../src/server')({ logger: false });

const productController = require('../../src/controllers/Product')();

describe('API Product', function () {
    it('GET should fetch all products', done => {
        supertest(server).get('/api/product')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => done())
            .catch(err => done(err));
    });
    it('Should get product /id', done => {
        let url = '/api/product';
        let product;
        productController.getRamProduct().then(result => {
            product = result;
            let id = product._id;
            supertest(server).get(`${url}/${id}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => done())
                .catch(err => done(err));
        });
    });
    it('POST should create an product', done => {
        let productObj = { name: 'test', price: 1, description: 'test description' };
        supertest(server).post('/api/product')
            .set('Accept', 'application/json')
            .send(productObj)
            .expect('content-Type', /text/)
            .expect(200)
            .then(res => done())
            .catch(err => done(err));
    });
    it('Should put an product', done => {
        let productObj = { name: 'test', price: 1, description: 'test description' };
        productController.getRamProduct().then(result => {
            product = result;
            let id = product._id;
            supertest(server).put(`/api/product/${id}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .send(productObj)
                .expect(200)
                .then(res => done())
                .catch(err => done(err));
        })
    });
    it('Should delete product /id', done => {
        let url = '/api/product';
        productController.getRamProduct().then(result => {
            let product = result;
            let id = product._id;
            supertest(server).delete(`${url}/${id}`)
                .expect('Content-Type', /text/)
                .expect(200)
                .then(res => done())
                .catch(err => done(err));
        });
    });
});

/*

describe('CONTROLLER Product', function(){
    it('should get all products', done => {
        productController.getProducts().then(result => {
            
        })
        done();
    })
})

*/

