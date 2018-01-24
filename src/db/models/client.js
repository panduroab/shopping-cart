const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const collectionName = 'client';

var clientSchema = new Schema({
    name        : String,
    lastnamefa  : String,
    lastnamemo  : String,
    birthdate   : Date,
    address     : String
}, { versionKey: false });

var clientModel = mongoose.model(collectionName, clientSchema);

module.exports = clientModel;