const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    collectionName = 'order';

var OrderSchema = new Schema({
    status:     { type: String, default: 'pending' },
    date:       { type: Date, default: Date.now },
    products:   { type: Array },
    client_id:  { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: Date.now }
}, { versionKey: false });

let OrderModel = mongoose.model(collectionName, OrderSchema);

module.exports = OrderModel;