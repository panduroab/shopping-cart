const mongoose = require('mongoose');

module.exports = config => new Promise((resolve, reject) => {
    mongoose.connect(`mongodb://${config.domain}/${config.dbName}`);
    mongoose.Promise = global.Promise;

    var db = mongoose.connection;

    db.on('connected', event => {
        let msg = 'db: mongodb is connected';
        resolve(db);
    });

    db.on('error', event => {
        let msg = 'MongoDB connection error';
        let error = new Error(msg);
        reject(error);
    });
});