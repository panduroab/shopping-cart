const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = 'product';

var productSchema = new Schema({
    name:        { type: String },
    price:       { type: Number },
    description: { type: String },
    stock:       { type: Number },
    category:    { type: String },
    imageUrl:    { type: String }
}, { versionKey: false });

let productModel = mongoose.model(collectionName, productSchema);

module.exports = productModel;

module.exports.getByCategory = category => new Promise((resolve, reject) => {
    productModel.find({ category: { $regex: category, $options: 'i' }}, (err, products) => {
        if(err)
            reject(err);
        if(products.length < 1)
            resolve([]);
        resolve(products)
    });
});

module.exports.getByName = name => new Promise((resolve, reject) => {
    productModel.find({ name: { $regex: name, $options: 'i' }}, (err, products) => {
        if(err)
            reject(err);
        if(products.length < 1)
            resolve([]);
        resolve(products)
    });
});
