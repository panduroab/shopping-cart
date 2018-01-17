const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = 'product';


var productSchema = new Schema({
    name:        { type: String },
    price:       { type: Number },
    description: { type: String }
});

let productModule = mongoose.model(collectionName, productSchema);
module.exports = productModule;