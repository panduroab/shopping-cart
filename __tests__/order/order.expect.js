const expect = require('chai');
const mocha = require('mocha');
const request = require('supertest');
const app = require('../../src/routes/orderRoutes');

describe('Order', () => {
    it('Should get order /id', (done) => {
        let url = '/api/order/5a5f77938b4a360b1a791c1a';
        request(app)
            .post(url)
            .set('Accep', 'json')
            .end((err, res) => {
                console.log(res);
                expect(res.body._id).to.be.equal('5a5f77938b4a360b1a791c1a');
                done();
            });
    });
});