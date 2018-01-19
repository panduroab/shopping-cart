const supertest = require('supertest');
const chai = require('chai');
const server = require('../../src/server')({ logger: false });
var id = '';
var id2 = '';
var productObj = { name: 'Test', price: 5, description: 'test description' } ;

describe('API Product', function () {

    it('POST product', done => {
        supertest(server).post('/api/product')
            .set('Accept', 'application/json')
            .send(productObj)
            .expect('Content-Type', /text/)
            .expect(200)
            .then(res => {
                //id2 = res.body;
                //console.log(id2);
                done();
            })
            .catch(err => {
                console.log(err);
            });
    });

    it('GET should fetch all products', done => {
        supertest(server).get('/api/product')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                id = res.body[0]._id;
                console.log(id);
                done();
            })
            .catch(err => {
                console.log(err);
            });
    });

    it('GET product id', done => {
        supertest(server).get(`/api/product/${id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                console.log(res.body);
                done();
            })
            .catch(err => {
                console.log(err);
            });
    });

    it('PUT product', done => {
        let productObj = { name: 'newtest1234', price: 100, description: 'new test description' }
        supertest(server).put(`/api/product/${id}`)
            .set('Accept', 'application/json')
            .send(productObj)
            .expect('Content-Type', /text/)
            .expect(200)
            .then(res => {
                console.log(res.body);
                done();
            })
            .catch(err => {
                console.log(err);
            });
    });
    
    /*
        it('DELETE product', done => {
            supertest(server).delete('/api/product/5a61010e62040b04cae8e13c')
                .expect('Content-Type', /text/)
                .expect(200)
                .then(res => {
                    done();
                })
                .catch(err => {
                    console.log(err); 
                });
        });
    */
});
