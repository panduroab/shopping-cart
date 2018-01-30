const supertest = require('supertest');
const chai = require('chai');
const assert = require('assert').assert;
const productController = require('../../src/controllers/Product')();
const expect = require('chai').expect;
const should = require('chai').should();
const mongoose = require('mongoose');
const server = require('../../src/server')({ logger: false });
const db = require('../../src/db/db')({ domain: '127.0.0.1', port: '27017', dbName: 'shopping-cart' }).then(con => {con.dropDatabase()}).catch(err => { });


const productObj = { name: 'test', price: 1, description: 'test description' ,stock: 3,category:'other',imageUrl:'https://lh3.googleusercontent.com/5Bra7-aT9kQDI40ZV7HsXg-SXi841bPdQwQt9kh-Nw3GoWkVP5nrkHYMNmNOjLJaIQ=h310'};

describe('CONTROLLER Product', function () {
    let product = {};

    it('should post a product', done => {
        productController.postProduct(productObj).then(product => {
            product.should.to.have.property('name');
            product.name.should.to.not.equal(null);
            product.should.to.have.property('price');
            product.price.should.to.not.equal(null);
            product.should.to.have.property('description');
            product.description.should.to.not.equal(null);
            product.should.to.have.property('stock');
            product.stock.should.to.not.equal(null);
            product.should.to.have.property('category');
            product.category.should.to.not.equal(null);
            product.should.to.have.property('imageUrl');
            product.imageUrl.should.to.not.equal(null);
            done();
        }).catch(err => done(err));
    });
    it('should get all', done => {
        productController.getAllProducts().then(result => {
            result[0].should.to.have.property('name');
            result[0].name.should.to.not.equal(null);
            result[0].should.to.have.property('price');
            result[0].price.should.to.not.equal(null);
            result[0].should.to.have.property('description');
            result[0].description.should.to.not.equal(null);
            result[0].should.to.have.property('stock');
            result[0].stock.should.to.not.equal(null);
            result[0].should.to.have.property('category');
            result[0].category.should.to.not.equal(null);
            result[0].should.to.have.property('imageUrl');
            result[0].imageUrl.should.to.not.equal(null);
            done();
        }).catch(err => done(err));
    });
    it('should get a product', done => {
        productController.getRamProduct().then(result => {
            let product = result;
            let id = product._id;
            productController.getProduct(id).then(result => {
                result.should.to.have.property('name');
                result.name.should.to.not.equal(null);
                result.should.to.have.property('price');
                result.price.should.to.not.equal(null);
                result.should.to.have.property('description');
                result.description.should.to.not.equal(null);
                result.should.to.have.property('category');
                result.category.should.to.not.equal(null);
                result.should.to.have.property('stock');
                result.stock.should.to.not.equal(null);
                result.should.to.have.property('category');
                result.category.should.to.not.equal(null);
                result.should.to.have.property('imageUrl');
                result.imageUrl.should.to.not.equal(null);
                done();
            }).catch(err => done(err));
        }).catch();
    });
    it('should update a product', done => {
        productController.getRamProduct().then(result => {
            let product = result;
            let id = product._id;
            productController.updateProduct(id, productObj).then(product => {
                product.should.to.have.property('name');
                product.name.should.to.not.equal(null);
                product.should.to.have.property('price');
                product.price.should.to.not.equal(null);
                product.should.to.have.property('description');
                product.description.should.to.not.equal(null);
                product.should.to.have.property('stock');
                product.stock.should.to.not.equal(null);
                product.should.to.have.property('category');
                product.category.should.to.not.equal(null);
                product.should.to.have.property('imageUrl');
                product.imageUrl.should.to.not.equal(null);
                done();
            }).catch(err => done(err));
        }).catch(err => done(err));
    });
    it('should delete a product', done => {
        productController.getRamProduct().then(result => {
            let product = result;
            let id = product._id;
            productController.deleteProdut(id).then(result => {
                result.should.be.a('string');
                done();
            }).catch(err => done(err));
        }).catch(err => done(err));
    });
});

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

describe('Types Product', function () {
    it('Correct types at post a product', done => {
        supertest(server).post('/api/product')
            .set('Accept', 'application/json')
            .send(productObj)
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.have.property('name');
                expect(res.body.name).to.not.equal(null);
                expect(res.body).to.have.property('price');
                expect(res.body.price).to.not.equal(null);
                expect(res.body).to.have.property('description');
                expect(res.body.description).to.not.equal(null);
                expect(res.body).to.have.property('category');
                expect(res.body.category).should.to.not.equal(null);
                expect(res.body).to.have.property('stock');
                expect(res.body.stock).should.to.not.equal(null);
                expect(res.body).to.have.property('imageUrl');
                expect(res.body.imageUrl).should.to.not.equal(null);
                done();
            });
    });
    it('Correct types at get all products', done => {
        supertest(server).get('/api/product')
            .expect(200)
            .end((err, res) => {
                expect(res.body[0]).to.have.property('name');
                expect(res.body[0].name).to.not.equal(null);
                expect(res.body[0]).to.have.property('price');
                expect(res.body[0].price).to.not.equal(null);
                expect(res.body[0]).to.have.property('description');
                expect(res.body[0].description).to.not.equal(null);
                expect(res.body[0]).to.have.property('stock');
                expect(res.body[0].stock).should.to.not.equal(null);
                expect(res.body[0]).to.have.property('category');
                expect(res.body[0].category).should.to.not.equal(null);
                expect(res.body[0]).to.have.property('imageUrl');
                expect(res.body[0].imageUrl).should.to.not.equal(null);
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
                    expect(product).to.have.property('stock');
                    expect(product.stock).should.to.not.equal(null);
                    expect(product).to.have.property('category');
                    expect(product.category).should.to.not.equal(null);
                    expect(product).to.have.property('imageUrl');
                    expect(product.imageUrl).should.to.not.equal(null);
                    done();
                });
        }).catch(err => { done(err); });
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
                    expect(product).to.have.property('stock');
                    expect(product.stock).should.to.not.equal(null);
                    expect(product.description).to.not.equal(null);
                    expect(product).to.have.property('category');
                    expect(product.category).should.to.not.equal(null);
                    expect(product).to.have.property('imageUrl');
                    expect(product.imageUrl).should.to.not.equal(null);
                    done();
                });
        }).catch(err => done(err));
    });
    it('Correct types at delete a product', done => {
        productController.getRamProduct().then(result => {
            let product = result;
            let id = product._id;
            supertest(server).delete(`/api/product/${id}`)
                .expect(200)
                .end((err, res) => {
                    expect(product).to.have.property('name');
                    expect(product.name).to.not.equal(null);
                    expect(product).to.have.property('price');
                    expect(product.price).to.not.equal(null);
                    expect(product).to.have.property('description');
                    expect(product.description).to.not.equal(null);
                    expect(product).to.have.property('stock');
                    expect(product.stock).should.to.not.equal(null);
                    expect(product).to.have.property('category');
                    expect(product.category).should.to.not.equal(null);
                    expect(product).to.have.property('imageUrl');
                    expect(product.imageUrl).should.to.not.equal(null);
                    done();
                });
        }).catch(err => done(err));
    });
});
