const productModel = require('../db/models/product');

module.exports = () => ({
    getProduct: id => {
        return new Promise((resolve, reject) => {
            productModel.findById(id, (err, doc) => {
                if (err) { reject(err); }
                resolve(doc);
            })
        })
    },

    getAllProducts: () => {
        return new Promise((resolve, reject) => {
            productModel.find({}, (err, docs) => {
                if (err) { reject(err); }
                resolve(docs);
            })
        })
    },

    postProduct: body => {
        return new Promise((resolve, reject) => {
            let productObj = {
                name: body.name,
                price: body.price,
                description: body.description,
                stock: body.stock,
                category: body.category
            };
            productModel.create(productObj, (err, doc) => {
                if (err) { reject(err); }
                resolve(doc);
            });
        });
    },

    updateProduct: (id, body) => {
        return new Promise((resolve, reject) => {
            productModel.findById(id, (err, product) => {
                if (err) {
                    reject(err);
                    //res.status(500).send(err);
                } else {
                    product.name = body.name;
                    product.price = body.price;
                    product.description = body.description;
                    product.stock = body.stock;
                    product.category = body.category;
                    product.save((err, product) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(product);
                    });
                }
            });
        });
    },

    deleteProdut: id => {
        return new Promise((resolve, reject) => {
            productModel.findByIdAndRemove(id, (err, product) => {
                if (err) { reject(err); }
                if (product) {
                    resolve('product deleted')
                } else {
                    resolve('not ok')
                }
            })
        })
    },

    getRamProduct: () => new Promise((resolve, reject) => {
        productModel.find({}, (err, docs) => {
            if (err || docs.length < 1)
                reject(err);
            let product = docs.splice(0, 1)[0];
            resolve(product);
        });
    })
});