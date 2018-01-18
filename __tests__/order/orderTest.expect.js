const supertest = require('supertest');
const api = supertest('http://localhost:3000');
const chai = require('chai');
const server = require('../../src/server')({ logger: false });
const db = require('../../src/db/db');

describe('API Order', function() {
   // db({ domain: '127.0.0.1', port: '27017', dbNme: 'shopping-cart' });
   // server.listen(3000, () => console.log('Server is running at:', 3000));
    it('GET (all) order', function(done) {
        // this.timeout(100);
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
});
