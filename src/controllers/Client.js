const ClientModel = require('../db/models/client');

module.exports = () => ({
    getClient: id => new Promise((resolve, reject) => {
        let query = { _id: id };
        ClientModel.find(query).exec((err, docs) => {
            if(err)
                reject(err);
            resolve(docs);
        });
    }),
    getAllClients: () => new Promise((resolve, reject) => {
        ClientModel.findById({}, (err, doc) => {
            if(err)
                reject(err);
            resolve(doc);
        });
    }),
    deleteClient: id => new Promise((resolve, reject) => {
        OrderModel.findByIdAndRemove(id, (err, client) => {
            if(err)
                reject(err);
            if(client)
                return resolve('OK delete');
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
        OrderModel.findById(id, (err, order) => {
            if(err)
                reject(err);
            order.status = body.status || order.status;
            order.date = body.date || order.date;
            order.products = body.products || order.products;
            order.client_id = body.client_id || order.client_id;
            order.updated_at = Date.now();
            order.save((err, doc) => {
                if(err)
                    reject(err);
                resolve(doc);
            });
        });
    }),
    getRandomClient: () => new Promise((resolve, reject) => {
        ClientModel.find({}, (err, docs) => {
            if(err)
                reject(err);
            let client = docs.splice(0, 1)[0];
            resolve(client);
        });
    })
});