const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = 'client';

var clientSchema = new Schema({
    name        : String,
    lastnamefa  : String,
    lastnamemo  : String,
    birthdate   : Date,
    address     : String
});

var  clientModel = mongoose.model(collectionName,clientSchema);
module.exports = clientSchema;