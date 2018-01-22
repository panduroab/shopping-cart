const productModel = require('../db/models/product');

module.exports = () => ({
    getProduct: id => {return new Promise((resolve, reject ) => {
        productModel.findById(id, (err, doc) => {
            if(err){reject(err);}
            resolve(doc);
        })
    })
    },

    getAllProducts: () => {return new Promise((resolve,reject) => {
        productModel.find({}, (err, docs) => {
            if(err){reject(err);}
            resolve(docs);
        })
    })
    },

    updateProduct: (id, body) => {return new Promise((resolve, reject) => {
        productModel.findById(id, (err,product) => {
            if(err){
                res.status(500).send(err);
            } else {
                product.name = body.name;
                product.price = body.price;
                product.description = body.description;
                product.save( (err,product) => {
                    if(err){ 
                        res.status(500).send(err);
                        reject(err);
                    }
                    res.status(200).send(product);
                    resolve(product);
                });
            }
            //resolve(product);
            //reject(err);
        });
    });
    },

    deleteProdut: id => {return new Promise((resolve, reject) => {
        productModel.findByIdAndRemove(id, (err,product) => {
            if(err){reject(err);}
            resolve(product);
        })
    })
    },

    getRamProduct: () => new Promise((resolve, reject) => {
        productModel.find({}, (err, docs) => {
            if(err || docs.length < 1)
                reject(err);
            let product = docs.splice(0, 1)[0];
            resolve(product);
        });
    })
});