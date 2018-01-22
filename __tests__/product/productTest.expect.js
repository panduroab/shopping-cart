const supertest = require('supertest');
const chai = require('chai');
const assert = require('assert').assert;
//const assert = require('assert');
const productController = require('../../src/controllers/Product')();

const expect = require('chai').expect;
const should = require('chai').should();

const config = {
    logger: 'dev',
    dbConfig: {
        domain: '127.0.0.1',
        port: '27017',
        dbName: 'shopping-cart'
    }
};

const server = require('../../src/server')(config);

const productObj = { name: 'test', price: 1, description: 'test description' };

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
        }).catch(err => {
            done(err);
        });
    });
    it('POST should create an product', done => {
        supertest(server).post('/api/product')
            .set('Accept', 'application/json')
            .send(productObj)
            .expect('content-Type', /json/)
            .expect(200)
            .then(res => done())
            .catch(err => done(err));
    });
    it('Should put a product', done => {
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
        }).catch(err => {
            done(err);
        });
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
        }).catch(err => {
            done(err);
        });
    });
});

describe('Types Product', function(){
    it('Correct types at get all products', done => {
        supertest(server).get('/api/product')
        .expect(200)
        .end( (err, res) => {
            //console.log(res.body);
            res.body.forEach((product, index) => {
                expect(product).to.have.property('name');
                expect(product.name).to.not.equal(null);
                expect(product).to.have.property('price');
                expect(product.price).to.not.equal(null);
                expect(product).to.have.property('description');
                expect(product.description).to.not.equal(null);
            });
            done();
        });
    });
    it('Correct types at get a product', done => {
        productController.getRamProduct().then(result => {
            let product = result;
            let id = product._id;
            supertest(server).get(`/api/product/${id}`)
            .expect(200)
            .end((err, res) => {
                expect(product).to.have.property('name');
                expect(product.name).to.not.equal(null);
                expect(product).to.have.property('price');
                expect(product.price).to.not.equal(null);
                expect(product).to.have.property('description');
                expect(product.description).to.not.equal(null);
                done();
            });
        }).catch(err => {done(err);});
    });
    it('Correct types at post a product', done => {
        supertest(server).post('/api/product')
        .set('Accept', 'application/json')
        .send(productObj)
        .expect(200)
        .end((err, res) => {
            expect(product).to.have.property('name');
            expect(product.name).to.not.equal(null);
            expect(product).to.have.property('price');
            expect(product.price).to.not.equal(null);
            expect(product).to.have.property('description');
            expect(product.description).to.not.equal(null);
            done();
        });
    });
    it('Correct types at update a product', done => {
        productController.getRamProduct().then(result => {
            let product = result;
            let id = product._id;
            supertest(server).put(`/api/products/${id}`)
            .send(productObj)
            .expect(200)
            .end((err, res) => {
                expect(product).to.have.property('name');
                expect(product.name).to.not.equal(null);
                expect(product).to.have.property('price');
                expect(product.price).to.not.equal(null);
                expect(product).to.have.property('description');
                expect(product.description).to.not.equal(null);
                done();
            });
        }).catch(err => done(err));
    });
    it('Correct types at delete a product', done => {
        productController.getRamProduct().then(result => {
            let prodcut = result;
            let id = product._id;
            supertest(server).delete(`/api/product/${id}`)
            .expect(200)
            .end((err, res) => {
                expect(product).to.have.property('name');
                expect(product.name).to.not.equal(null);
                expect(product).to.have.property('price');
                expect(product.price).to.not.equal(null);
                expect(prodcut).to.have.property('description');
                expect(product.description).to.not.equal(null);
                done();
            });
        }).catch(err => done(err));
    });
});

describe('CONTROLLER Product', function(){
    it('should get all', done => {
        productController.getAllProducts().then(result => {
            result.forEach((product) => {
                product.should.to.have.property('name');
                product.name.should.to.not.equal(null);
            })
            done();
        }).catch(err => done(err));
    });
});



