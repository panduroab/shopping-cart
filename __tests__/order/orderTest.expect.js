const supertest = require('supertest');
const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const assert = require('assert').assert;
const orderController = require('../../src/controllers/Order')();
const productController = require('../../src/controllers/Product')();
const clientController = require('../../src/controllers/Client')();
const server = require('../../src/server')({ logger: false });
const db = require('../../src/db/db')({ domain: '127.0.0.1', port: '27017', dbName: 'shopping-cart' }).then(con => {con.dropDatabase()}).catch(err => {});

const orderObj = { status: 'pending', products: [], client_id: 1 };// FIXME: Remove this!

describe('API Order', function () {
    let global_product;
    let global_client;
    before(async () => {
        let productObj = {
            name: 'test',
            price: 100,
            description: 'test description',
            stock: 300,
            category: 'other'
        };
        let clientObj = {
            name: 'name',
            lastnamefa: 'lastnamefa',
            lastnamemo: 'lastnamemo',
            birthdate: '1985-01-23',
            address: 'address #281'
        };
        await productController.postProduct(productObj)
            .then(product => global_product = product).catch(err => {});
        await clientController.postClient(clientObj)
            .then(client => global_client = client).catch(err => {});
    });
    it('POST should create an order', done => {
        let orderObj = {
            products: [
                {
                    product: global_product._id,
                    quantity: Math.floor(Math.random()*10)+1
                }
            ],
            client_id: global_client._id
        };
        supertest(server).post('/api/order')
            .set('Accept', 'application/json')
            .send(orderObj)
            .expect('content-Type', /json/)
            .expect(200)
            .then(res => done())
            .catch(err => done(err));
    });
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
    it('Should put an order /id', done => {
        orderController.getRandomOrder().then(result => {
            let orderObj = {
                status: 'pending',
                products: [
                    {
                        product: global_product._id.toString(),
                        quantity: 1
                    }
                ],
                client_id: global_client._id.toString()
            };
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
    let global_product;
    let global_client;
    before(async () => {
        let productObj = {
            name: 'test',
            price: 100,
            description: 'test description',
            stock: 300,
            category: 'other'
        };
        let clientObj = {
            name: 'name',
            lastnamefa: 'lastnamefa',
            lastnamemo: 'lastnamemo',
            birthdate: '1985-01-23',
            address: 'address #281'
        };
        await productController.postProduct(productObj)
            .then(product => global_product = product).catch(err => {});
        await clientController.postClient(clientObj)
            .then(client => global_client = client).catch(err => {});
    });
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
        let orderObj = {
            products: [
                {
                    product: global_product._id.toString(),
                    quantity: Math.floor(Math.random()*10)+1
                }
            ],
            client_id: global_product._id.toString()
        };
        supertest(server).post('/api/order')
        .set('Accept', 'application/json')
        .send(orderObj)
        .expect(200)
        .then(res => {
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
        }).catch(err => done(err))
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
            let id = result._id;
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
    let global_product;
    let global_client;
    before(async () => {
        let productObj = {
            name: 'test',
            price: 100,
            description: 'test description',
            stock: 300,
            category: 'other'
        };
        let clientObj = {
            name: 'name',
            lastnamefa: 'lastnamefa',
            lastnamemo: 'lastnamemo',
            birthdate: '1985-01-23',
            address: 'address #281'
        };
        await productController.postProduct(productObj)
            .then(product => {
                global_product = product;
            }).catch(err => {});
        await clientController.postClient(clientObj)
            .then(client => global_client = client)
            .catch(err => {});
    });
    it('Post a order',done => {
        let orderObj = {
            products: [
                {
                    product: global_product._id.toString(),
                    quantity: Math.floor(Math.random()*10)+1
                }
            ],
            client_id: global_product._id.toString()
        };
        orderController.postOrder(orderObj).then(order=>{
            order.should.be.an('object');
            done();
        }).catch(err=>done(err));
    });
    it('Get a order',done => {
        orderController.getRandomOrder()
        .then(order=>{
            let id = order._id;
            return orderController.getOrder(id);
        }).then(result=>{
            result.should.be.an('object');
            done();
        }).catch(err=>done(err));
    });
    it('Get fetch all order',done => {
        orderController.getAllOrders()
        .then(orders => {
            let order = orders[0];
            if(order){
                order.should.to.have.property('status');
                order.status.should.to.not.equal(null);
                order.should.to.have.property('date');
                order.date.should.to.not.equal(null);
                order.should.to.have.property('products');
                order.products.should.to.not.equal(null);
                order.should.to.have.property('client_id');
                order.client_id.should.to.not.equal(null);
                order.should.to.have.property('created_at');
                order.created_at.should.to.not.equal(null);
                order.should.to.have.property('updated_at');
                order.updated_at.should.to.not.equal(null);
                order.should.to.have.property('deleted_at');
                order.deleted_at.should.to.not.equal(null);
                done();
                return;
            } else {
                done(new Error('No order have been registered in the Database'));
            }
        }).catch(err=>done(err));
    });
    it('Update a order',done => {
        orderController.getRandomOrder().then(order=>{
            let id = order._id;
            orderController.updateOrder(id,orderObj).then(res=>{
                res.should.be.an('object');
                done();
            }).catch(err=>done(err))
        }).catch(err=>done(err))
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
});