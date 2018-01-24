const chai = require('chai');
const mocha = require('mocha');
const db = require('../../src/db/db');

describe('Database connection (mongoDB)', () => {
    let config = {
        domain: '127.0.0.1',
        port: '27017',
        dbName: 'shopping-cart'
    };
    it(`should connect to: mongodb://${config.domain}:${config.port}:${config.dbName}`, done => {
<<<<<<< HEAD
        db(config).then(res => {
            done();
        }).catch(err => {
            done(err);
        });
=======
        db(config).then(res => done()).catch(err => done(err));
>>>>>>> 7996b2b7adc46c6fedd6676697020ed6f9149076
    }).timeout(5000);
});