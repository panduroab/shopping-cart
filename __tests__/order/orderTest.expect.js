const supertest = require('supertest');
const chai = require('chai');
const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('assert').assert;
const orderController = require('../../src/controllers/Order')();
const orderObj = { status: 'pending', products: [], client_id: 1 };

const config = {
    logger: 'dev',
    dbConfig: {
        domain: '127.0.0.1',
        port: '27017',
        dbName: 'shopping-cart'
    }
};

const server = require('../../src/server')(config);

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
                .then(res => {done()})
                .catch(err => done(err));
        }).catch(err => {
            done(err);
        });
    });
    it('POST should create an order', done => { 
        supertest(server).post('/api/order')
            .set('Accept', 'application/json')
            .send(orderObj)
            .expect('content-Type', /json/)
            .expect(200)
            .then(res => done())
            .catch(err => done(err));
    });
    it('Should put an order /id', done => {
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
        }).catch(err => {
            done(err);
        });
    });
    it('Should delete order /id', done => {
        let url = '/api/order';
        orderController.getRandomOrder().then(result => {
            let order = result;
            let id = order._id;
            supertest(server).delete(`${url}/${id}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then(res => done())
                .catch(err => done(err));
        }).catch(err => {
            done(err);
        });
    });
});
describe('Types Order',function(){
    it('GET the type of all orders', done => {
        supertest(server).get('/api/order')
        .expect(200)
        .end(function(err,res){
            res.body.forEach((order,index) => {
                expect(order).to.have.property('status');
                expect(order.status).to.not.equal(null);
                expect(order).to.have.property('date');
                expect(order.date).to.not.equal(null);
                expect(order).to.have.property('products');
                expect(order.products).to.not.equal(null);
                expect(order).to.have.property('client_id');
                expect(order.client_id).to.not.equal(null);
                expect(order).to.have.property('created_at');
                expect(order.created_at).to.not.equal(null);
                expect(order).to.have.property('updated_at');
                expect(order.updated_at).to.not.equal(null);
                expect(order).to.have.property('deleted_at');
                expect(order.deleted_at).to.not.equal(null);  
            });
            done();
        });
    });
    it('Get the correct typesfor the JSON',done =>{
        let url = '/api/order';
        orderController.getRandomOrder().then(result => {
            order = result;
            let id = order._id;
            supertest(server).get(`${url}/${id}`)
            .expect(200)
            .end(function(err,res){
                expect(res.body).to.have.property('status');
                expect(res.body.status).to.not.equal(null);
                expect(res.body).to.have.property('date');
                expect(res.body.date).to.not.equal(null);
                expect(res.body).to.have.property('products');
                expect(res.body.products).to.not.equal(null);
                expect(res.body).to.have.property('client_id');
                expect(res.body.client_id).to.not.equal(null);
                expect(res.body).to.have.property('created_at');
                expect(res.body.created_at).to.not.equal(null);
                expect(res.body).to.have.property('updated_at');
                expect(res.body.updated_at).to.not.equal(null);
                expect(res.body).to.have.property('deleted_at');
                expect(res.body.deleted_at).to.not.equal(null);
                done();
            });
        });
    });
    it('Check that the element post have the correct type',done=>{
        supertest(server).post('/api/order')
        .set('Accept', 'application/json')
        .send(orderObj)
        .expect(200)
        .end(function(err,res){
            expect(res.body).to.have.property('status');
            expect(res.body.status).to.not.equal(null);
            expect(res.body).to.have.property('date');
            expect(res.body.date).to.not.equal(null);
            expect(res.body).to.have.property('products');
            expect(res.body.products).to.not.equal(null);
            expect(res.body).to.have.property('client_id');
            expect(res.body.client_id).to.not.equal(null);
            expect(res.body).to.have.property('created_at');
            expect(res.body.created_at).to.not.equal(null);
            expect(res.body).to.have.property('updated_at');
            expect(res.body.updated_at).to.not.equal(null);
            expect(res.body).to.have.property('deleted_at');
            expect(res.body.deleted_at).to.not.equal(null);
            done();
        });
    });
    it('Check that the element deleted have the correct type',done=>{
        let url = '/api/order';
        orderController.getRandomOrder().then(result => {
            order = result;
            let id = order._id;
            supertest(server).delete(`${url}/${id}`)
            .expect(200)
            .end(function(err,res){
                expect(res.body).to.have.property('status');
                expect(res.body.status).to.not.equal(null);
                expect(res.body).to.have.property('date');
                expect(res.body.date).to.not.equal(null);
                expect(res.body).to.have.property('products');
                expect(res.body.products).to.not.equal(null);
                expect(res.body).to.have.property('client_id');
                expect(res.body.client_id).to.not.equal(null);
                expect(res.body).to.have.property('created_at');
                expect(res.body.created_at).to.not.equal(null);
                expect(res.body).to.have.property('updated_at');
                expect(res.body.updated_at).to.not.equal(null);
                expect(res.body).to.have.property('deleted_at');
                expect(res.body.deleted_at).to.not.equal(null);
                done();
            });
        });
        it('Should check the type of the update order', done => {
            orderController.getRandomOrder().then(result => {
                order = result;
                let id = order._id;
                supertest(server).put(`/api/order/${id}`)
                .expect(200)
                .end(function(err,res){
                    expect(res.body).to.have.property('status');
                    expect(res.body.status).to.not.equal(null);
                    expect(res.body).to.have.property('date');
                    expect(res.body.date).to.not.equal(null);
                    expect(res.body).to.have.property('products');
                    expect(res.body.products).to.not.equal(null);
                    expect(res.body).to.have.property('client_id');
                    expect(res.body.client_id).to.not.equal(null);
                    expect(res.body).to.have.property('created_at');
                    expect(res.body.created_at).to.not.equal(null);
                    expect(res.body).to.have.property('updated_at');
                    expect(res.body.updated_at).to.not.equal(null);
                    expect(res.body).to.have.property('deleted_at');
                    expect(res.body.deleted_at).to.not.equal(null);
                    done();
                });
            });
        });
    });
});
