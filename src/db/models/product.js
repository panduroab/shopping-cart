const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = 'product';

var productSchema = new Schema({
    name        : String,
    price       : Number,
    description : String
});

let productModule = mongoose.model(collectionName, productSchema);
module.exports = productModule;