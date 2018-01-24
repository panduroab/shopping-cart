const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = 'product';

var productSchema = new Schema({
    name:        { type: String },
    price:       { type: Number },
    description: { type: String },
    stock:       { type: Number },
    category:    { type: String }
}, { versionKey: false });

let productModel = mongoose.model(collectionName, productSchema);

module.exports = productModel;

module.exports.getByCategory = category => new Promise((resolve, reject) => {
    productModel.find({ category: category }, (err, products) => {
        if(err)
            reject(err);
        if(products.length < 1)
            resolve([]);
        resolve(products)
    });
});