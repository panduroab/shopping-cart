const productModel = require('../db/models/product');

module.exports = () => ({
    getProduct: id =>  new Promise((resolve, reject ) => {
        productModel.findById(id, (err, doc) => {
            if(err){reject(err);}
            resolve(doc);
        })
    }),
    getProducts: () =>  new Promise((resolve,reject) => {
        productModel.find({}, (err, docs) => {
            resolve(docs);
            reject(err);
        })
    }),
    updateProduct: (id, body) =>  new Promise((resolve, reject) => {
        productModel.findById(id, (err,product) => {
            if(err){
                res.status(500).send(err);
            } else {
                product.name = body.name;
                product.price = body.price;
                product.description = body.description;
                product.save( (err,product) => {
                    if(err){ res.status(500).send(err);}
                    res.status(200).send(err);
                })
            }
            resolve(product);
            reject(err);
        })
    }),

    deleteProdut: id => new Promise((resolve, reject) => {
        productModel.find(id, (err,product) => {
            resolve(product);
            reject(err);
        })
    }),

    getRamProduct: () => new Promise((resolve, reject) => {
        productModel.find({}, (err, docs) => {
            if(err || docs.length < 1)
                reject(err);
            let product = docs.splice(0, 1)[0];
            resolve(product);
        });
    })
});