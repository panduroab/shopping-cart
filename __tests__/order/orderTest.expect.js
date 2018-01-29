const supertest = require('supertest');
const chai = require('chai');
const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('assert').assert;
const orderController = require('../../src/controllers/Order')();
const clientController = require('../../src/controllers/Client')();
const productController = require('../../src/controllers/Product')();
const server = require('../../src/server')({ logger: false });
const db = require('../../src/db/db')({ domain: '127.0.0.1', port: '27017', dbName: 'shopping-cart' }).then(con => {con.dropDatabase()}).catch(err => {});
var orderObj = {};


    let productObj={ 
        name: 'test', 
        price: 1, 
        description: 'test description' ,
        stock: 3,category:'other',
        imageUrl:'https://lh3.googleusercontent.com/5Bra7-aT9kQDI40ZV7HsXg-SXi841bPdQwQt9kh-Nw3GoWkVP5nrkHYMNmNOjLJaIQ=h310',
    };
    let clientObj ={
        name: 'name',
        lastnamefa: 'lastnamefa',
        lastnamemo: 'lastnamemo',
        birthdate: '1985-01-23',
        address: 'address #281',
    };
    let idClient='',idProduct='';
    clientController.postClient(clientObj).then(async res=>idClient=await res._id).catch();
    productController.postProduct(productObj).then(async res=>idProduct=await res.id).catch();
    console.log('idClient',idClient);
    
    orderObj = { status: 'pending', products: [{product:idProduct,quantity:1}], client_id:idClient };


describe('API Order', function () {
    console.log('API',orderObj);
    
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
    console.log('Types',orderObj);
    
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
        }).catch(err=>{done(err)});
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
        }).catch(err=>{done(err)});
    });
    it('Should check the type of the update order', done => {
        orderController.getRandomOrder().then(result => {
            order = result;
            let id = order._id;
            supertest(server).put(`/api/order/${id}`)
            .send(order)
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
        }).catch(err=>{done(err)});
    });
});
describe('Controller Order',function(){
    console.log('Controller',orderObj);
    it('Get a order',done => {
        orderController.getRandomOrder().then(order=>{
            let id = order._id;
            orderController.getOrder(id).then(res=>{
                res.should.equal('object');
                done();
            }).catch(err=>done(err))
        }).catch(err=>done(err));
    });
    it('Delete a order',done => {
        orderController.getRandomOrder().then(order=>{
            let id = order._id;
            orderController.deleteOrder(id).then(res=>{
                res.should.be.a('object');
                done();
            }).catch(err=>done(err))
        }).catch(err=>done(err));
    });
    it('Post a order',done => {
        orderController.postOrder(orderObj).then(order=>{
            order.should.equal(orderObj);
            done();
        }).catch(err=>done(err));
    });
    it('Get fetch all order',done => {   
        orderController.getAllOrders().then(order=>{
            if(!order){
                order[0].should.to.have.property('status');
                order[0].status.should.to.not.equal(null);
                order[0].should.to.have.property('date');
                order[0].date.should.to.not.equal(null);
                order[0].should.to.have.property('products');
                order[0].products.should.to.not.equal(null);
                order[0].should.to.have.property('client_id');
                order[0].client_id.should.to.not.equal(null);
                order[0].should.to.have.property('created_at');
                order[0].created_at.should.to.not.equal(null);
                order[0].should.to.have.property('updated_at');
                order[0].updated_at.should.to.not.equal(null);
                order[0].should.to.have.property('deleted_at');
                order[0].deleted_at.should.to.not.equal(null); 
            }
            done();
        }).catch(err=>done(err));
    });
    it('Update a order',done => {
        orderController.getRandomOrder().then(order=>{
            let id = order._id;
            orderController.updateOrder(id,orderObj).then(res=>{
                res.should.equal(orderObj);
                done();
            }).catch(err=>done(err))
        }).catch(err=>done(err))
    })   
});