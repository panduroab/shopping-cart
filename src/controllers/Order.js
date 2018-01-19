const orderModel = require('../db/models/order');

module.exports = () => ({
    getOrder: id => {new Promise((resolve,reject)=>{
        orderModel.findById(id,(err,doc)=>{
            resolve(doc);
            reject(err);
        })
    })
    },
    getAllOrders: () => {new Promise((resolve,reject)=>{
        orderModel.find({},(err,docs)=>{
            resolve(order);
            reject(err);
        })
    })
    },
    deleteOrder: id => {new Promise((resolve,reject)=>{
        orderModel.findByIdAndRemove(id,(err,order)=>{
            resolve(order);
            reject(err);
        })
    })
    },
    updateOrder: (id, body) => {new Promise((resolve,reject)=>{
        OrderModel.findById(id, (err, doc) => {
            if (err) {
                res.status(500).send(err);
            } else {
                doc.status = body.status ;
                doc.date = body.date ;               
                doc.products = body.products ;
                doc.client_id = body.client_id ;
                doc.updated_at = Date.now();    
                doc.save((err, doc) => {
                    if (err)
                        res.status(500).send(err);
                    res.status(200).send(doc);
                });
            }
        });
    }) 
    },
    
    getRandomOrder: () => new Promise((resolve, reject) => {
        orderModel.find({}, (err, docs) => {
            if(err || docs.length < 1)
                reject(err);
            let order = docs.splice(0, 1)[0];
            resolve(order);
        });
    })
});