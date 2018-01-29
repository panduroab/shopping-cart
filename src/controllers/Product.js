const productModel = require('../db/models/product');

module.exports = () => ({
    getProduct: id => {
        return new Promise((resolve, reject) => {
            productModel.findById(id, (err, doc) => {
                if(err) reject(err);
                if(doc && doc._id) resolve(doc);
                if(doc===null) resolve({});
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
                category: body.category,
                imageUrl:body.imageUrl
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
                } else {
                    product.name = body.name;
                    product.price = body.price;
                    product.description = body.description? body.description : product.description;
                    product.stock = body.stock? body.stock : product.stock;
                    product.category = body.category? body.category : product.category;
                    product.imageUrl = body.imageUrl? body.imageUrl : product.imageUrl;
                    
                    
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
    }),

    getProductsArr: idArr => new Promise((resolve, reject) => {
        productModel.find({ _id: { $in: idArr }}, (err, docs) => {
            if(err || docs.length < 1)
                reject(err);
            resolve(docs);
        });
    })
});