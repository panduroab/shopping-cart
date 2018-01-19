const orderModel = require('../db/models/order');

module.exports = () => ({
    getOrder: id => {

    },
    getAllOrders: () => {

    },
    deleteOrder: id => {

    },
    updateOrder: (id, body) => {

    },
    getRandomOrder: () => new Promise((resolve, reject) => {
        orderModel.find({}, (err, docs) => {
            let order = docs.splice(0, 1)[0];
            resolve(order);
        });
    }),
    a:'a'
});