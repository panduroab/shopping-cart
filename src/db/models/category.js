const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = 'category';

const productModel = require('../../db/models/product');

var CategorySchema = new Schema({
    name: { type: String, default: 'other' }
}, { versionKey: false });

let CategoryModel = mongoose.model(collectionName, CategorySchema);

module.exports = CategoryModel;

module.exports.getProductsOn = name => new Promise((resolve, reject) => {
    productModel.getByCategory(name)
    .then(products => resolve(products))
    .catch(err => reject(err))
});