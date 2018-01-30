const supertest = require('supertest');
const chai = require('chai');
const assert = require('assert').assert;
const productController = require('../../src/controllers/Product')();
const expect = require('chai').expect;
const should = require('chai').should();
const mongoose = require('mongoose');
const server = require('../../src/server')({ logger: false });
const db = require('../../src/db/db')({ domain: '127.0.0.1', port: '27017', dbName: 'shopping-cart' }).then(con => {con.dropDatabase()}).catch(err => { });

describe('CONTROLLER Product', () => {
    before(() => {
        for(let i=0; i<10; i++) {
            let productObj = {
                name: `producto ${i}`,
                price: 1 + Math.floor(Math.random()*99),
                description: 'test description',
                stock: 1 + Math.floor(Math.random()*99),
                category: `test ${Math.floor(Math.random()*3)}`
            };
            productController.postProduct(productObj)
                .then(product => {}).catch(err => {});
        }
    });
    it('should search products by name', done => {
        let name = `producto ${1 + Math.floor(Math.random()*9)}`;
        supertest(server).get(`/api/product/search?value=${name}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if(err) {
                    done(err);
                } else {
                    done();
                }
            });
    });
    it('should search products by category', done => {
        let category = `test ${Math.floor(Math.random()*3)}`;
        supertest(server).get(`/api/product/search?category=${category}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if(err) {
                    done(err);
                } else {
                    done();
                }
            });
    });
});
