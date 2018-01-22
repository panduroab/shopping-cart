
const orderModel = require('../db/models/order');

module.exports = () => ({
    getOrder: id => { return new Promise((resolve,reject)=>{
        orderModel.findById(id,(err,doc)=>{
            if(err) { reject(err)};
            resolve(doc);  
        })
    })
    },
    getAllOrders: () => {return new Promise((resolve,reject)=>{
        orderModel.find({},(err,docs)=>{
            if(err) {reject(err)};
            resolve(order);
        })
    })
    },
    deleteOrder: id => {return new Promise((resolve,reject)=>{
        orderModel.findByIdAndRemove(id,(err,order)=>{
            if(err) {reject(err)};
            resolve(order);
        })
    })
    },
    updateOrder: (id, body) => {return new Promise((resolve,reject)=>{
        orderModel.findById(id, (err, doc) => {
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
    postOrder: (order) => new Promise((resolve,reject)=>{
        if( typeof(order.status)     == 'String'&&
            typeof(order.date)       == 'Date'  &&
            Array.isArray(products)             &&
            typeof(order.client_id ) =='String' &&
            typeof(order.created_at) =='Date'   &&
            typeof(order.updateOrder)=='Date'   &&
            typeof(order.deleted_at) =='Date'){
        orderModel.create(order,(err, order)=>{
            if(err){reject(err)}
            resolve(order);
        })}
        else{
            reject(err, 'No compatible types')
        }
    }),
    
    getRandomOrder: () => new Promise((resolve, reject) => {
        orderModel.find({}, (err, docs) => {
            if(err || docs.length < 1)
                reject(err);
            let order = docs.splice(0, 1)[0];
            resolve(order);
        });
    })
});