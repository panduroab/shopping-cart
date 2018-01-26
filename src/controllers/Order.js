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
                resolve(order);
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

    // FIXME: consultar productos y existencias
    // - comparar existencia con solicitado
    // - actualizar existencias
    // - crear orden 
    postOrder: (order) => new Promise(async (resolve, reject) => {
        if (Array.isArray(order.products) && typeof (order.products[0].product) === 'string' && typeof (order.products[0].quantity) === 'number') {
            let rejected_products = [];
            let stock_products = [];
            for (let product of order.products) {
                await productController.getProduct(product.product)
                    .then(result => {
                        stock_products.unshift(result.stock);
                        if (product.quantity > result.stock) {
                            rejected_products.push(product.product);
                        }
                    }).catch(err => reject(err));
            }
            let mess = "Products out of stock: " + rejected_products;
            if (rejected_products.length > 0) resolve(mess);
            if (rejected_products.length === 0) {
                orderModel.create(order, async (err, order) => {
                    if (err) reject(err);
                    for (let product of order.products) {
                        let bodyProduct = {
                            "stock": stock_products.pop()-product.quantity
                        };
                        await productController.updateProduct(product.product, bodyProduct);
                    }
                    resolve(order);
                });
            }
        }
        else {
            reject(err);
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