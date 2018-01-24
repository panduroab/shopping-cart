const orderModel = require('../db/models/order');
const productController = require('../controllers/Product')()
const clientController = require('../controllers/Client')()

module.exports = () => ({
    getOrder: id => { return new Promise((resolve,reject)=>{
        orderModel.findById(id, async (err, order) => {
            if(err)
                reject(err);
            let products = [];
            for(let product_id of order.products){
                await productController.getProduct(product_id)
                .then(product =>{ products.push(product)
                    console.log(product);
                    
                })
                .catch(err => reject(err));
            }
            order.products = products;
            await clientController.getClient(order.client_id).then(result=>{                
                order.client_id = result; 
            }).catch(err=>reject(err));
            resolve(order);
        });
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
                reject(err)
            } else {
                doc.status = body.status ;
                doc.date = body.date ;               
                doc.products = body.products ;
                doc.client_id = body.client_id ;
                doc.updated_at = Date.now();    
                doc.save((err, doc) => {
                    if (err)
                       reject(err)
                    resolve(doc) 
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
            reject();
        }
    }),
    
    getRandomOrder: () => new Promise((resolve, reject) => {
        orderModel.find({}, (err, docs) => {
            if(err || docs.length < 1)
                reject(err);
            let order = docs.splice(0, 1)[0];
            resolve(order);
        });
    }),
    getProductsof: (id) => new Promise((resolve,reject) => {
        orderModel.findById(id, async (err, order) => {
            if(err)
                reject(err);
            let products = [];
            for(let product_id of order.products){
                await productController.getProduct(product_id)
                .then(product => products.push(product))
                .catch(err => reject(err));
            }
            resolve(products);
        });
    })
}); 