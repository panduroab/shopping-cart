const orderModel = require('../db/models/order');
const productController = require('../controllers/Product')()
const clientController = require('../controllers/Client')()

module.exports = () => ({
    getOrder: id => {
        return new Promise((resolve, reject) => {
            orderModel.findById(id, async (err, order) => {
                if (err)
                    reject(err);
                if (order) {
                    let products = [];
                    for (let product of order.products) {
                        let cant = product.quantity;
                        await productController.getProduct(product.product)
                            .then(product => {
                                let objAux = {};
                                objAux._id = product._id;
                                objAux.name = product.name;
                                objAux.price = product.price;
                                objAux.description = product.description;
                                objAux.stock = product.stock;
                                objAux.category = product.category;
                                objAux.quantity = cant;
                                if (product.id) {
                                    products.push(objAux);
                                } else {
                                    let objAviso = { message: 'id does not exist' }
                                    products.push(objAviso);
                                }
                            })
                            .catch(err => reject(err));
                    }
                    order.products = products;
                    await clientController.getClient(order.client_id).then(result => {
                        order.client_id = result;
                    }).catch(err => reject(err));
                    resolve(order);
                } else {
                    resolve(order);
                }
            });
        })
    },
    getAllOrders: () => {
        return new Promise((resolve, reject) => {
            orderModel.find({}, (err, docs) => {
                if (err) { reject(err) };
                resolve(docs);
            })
        })
    },
    deleteOrder: id => {
        return new Promise((resolve, reject) => {
            orderModel.findByIdAndRemove(id, (err, order) => {
                if (err) { reject(err) };
                resolve(order);
            })
        })
    },
    updateOrder: (id, body) => {
        return new Promise((resolve, reject) => {
            orderModel.findById(id, (err, doc) => {
                if (err) {
                    reject(err)
                } else {
                    doc.status = body.status;
                    doc.date = body.date;
                    doc.products = body.products;
                    doc.client_id = body.client_id;
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
    postOrder: (order) => new Promise(async (resolve, reject) => {
        if (Array.isArray(order.products) && typeof (order.products[0].product) === 'string' && typeof (order.products[0].quantity) === 'number') {
            let unavailable_prds = [];
            let available_prds = [];
            for (let product_request of order.products) {
                await productController.getProduct(product_request.product)
                    .then(result => {
                        if (product_request.quantity > result.stock) {
                            unavailable_prds.push(product_request.product);//id
                        } else {                            
                            result._doc.qty = product_request.quantity;
                            available_prds.unshift(result);                            
                        }
                    }).catch(err => reject(err));
            }
            let mess = "Products out of stock: " + unavailable_prds;
            if (unavailable_prds.length > 0) {
                return resolve(mess);
            } else {
                // Update STOCK before creating the order
                for(let product of available_prds) {
                    let bodyProduct = { stock: parseInt((product.stock - product._doc.qty),10) };
                    await productController.updateProduct(product._id, bodyProduct)
                        .then(result => {})//!!!
                        .catch(err => {});//!!!
                }
            }
            await orderModel.create(order, (err, order) => {
                if (err) return reject(err);
                return resolve(order);
            });
        } else {
            reject('Rejected');
        }
    }),
    getRandomOrder: () => new Promise((resolve, reject) => {
        orderModel.find({}, (err, docs) => {
            if (err || docs.length < 1)
                reject(err);
            let order = docs.splice(0, 1)[0];
            resolve(order);
        });
    }),
    getProductsof: (id) => new Promise((resolve, reject) => {
        orderModel.findById(id, async (err, order) => {
            if (err)
                reject(err);
            let products = [];
            for (let product of order.products) {
                await productController.getProduct(product.product)
                    .then(product => products.push(product))
                    .catch(err => reject(err));
            }
            resolve(products);
        });
    }),
    getProductsByArr: id => new Promise((resolve, reject) => {
        orderModel.findById({ _id: id }, (err, order) => {
            if (err)
                reject(err);
            if (!order)
                resolve({});
            let idArr = order.products.map(product => product.product);
            productController.getProductsArr(idArr)
                .then(products => resolve(products))
                .catch(err => reject(err));
        });
    })
});