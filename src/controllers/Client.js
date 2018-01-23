const ClientModel = require('../db/models/client');

module.exports = () => ({
    getClient: id => new Promise((resolve, reject) => {
        ClientModel.findById(id, (err, doc) => {
            if(err)
                reject(err);
            resolve(doc);
        });
    }),
    getAllClients: () => new Promise((resolve, reject) => {
        ClientModel.find({}, (err, docs) => {
            if(err)
                reject(err);
            resolve(docs);
        });
    }),
    deleteClient: id => new Promise((resolve, reject) => {
        ClientModel.findByIdAndRemove(id, (err, client) => {
            if(err)
                reject(err);
            if(client)
                resolve('OK delete');
            resolve('NOT OK');
        });
    }),
    postClient: body => new Promise((resolve, reject) => {
        let clientObj = {
            name:       body.name,
            lastnamefa: body.lastnamefa,
            lastnamemo: body.lastnamemo,
            birthdate:  body.birthdate,
            address:    body.address
        };
        ClientModel.create(clientObj, (err, doc) => {
            if(err)
                reject(err);
            resolve(doc);
        });
    }),
    updateClient: (id, body) => new Promise((resolve, reject) => {
        ClientModel.findById(id, (err, client) => {
            if(err)
                reject(err);
            client.status = body.status || client.status;
            client.date = body.date || client.date;
            client.products = body.products || client.products;
            client.client_id = body.client_id || client.client_id;
            client.updated_at = Date.now();
            client.save((err, doc) => {
                if(err)
                    reject(err);
                resolve(doc);
            });
        });
    }),
    getRandomClient: () => new Promise((resolve, reject) => {
        ClientModel.find({}, (err, docs) => {
            if(err || docs.length < 1)
                reject(err);
            let client = docs.splice(0, 1)[0];
            resolve(client);
        });
    })
});