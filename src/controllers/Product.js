const productModel = require('../db/models/product');

module.exports = () => ({
    getProduct: id => {

    },
    getProducts: () => {

    },
    updateProduct: (id, body) => {

    },
    deleteProdut: id => {

    },
    getRamProduct: () => new Promise((resolve, reject) => {
        productModel.find({}, (err, docs) => {
            let product = docs.splice(0, 1)[0];
            resolve(product);
        });
    })
});