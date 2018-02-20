const express = require('express');
const router = express.Router();
const OrderModel = require('../db/models/order');
const orderCrtl = require('../controllers/Order')();

router.get('/', (req, res) => {
    let clientId = req.query.clientId;
    if(clientId) {
        // TODO: Verify existent client
        OrderModel.find({ client_id: clientId }, (err, orders) => {
            if (err)
                return res.status(500).send('Internal Server Error');
            if (orders.length < 1)
                res.status(204).send('Client has no orders yet');
            else
                res.status(200).send(orders);
        });
    } else {
        OrderModel.find({}, (err, order) => {
            if (err) return res.status(500).send('Internal Server Error');
            res.status(200).send(order);
        });
    }
});

router.post('/', (req, response) => {
    orderCrtl.postOrder(req.body)
        .then(res => response.status(200).send(res))
        .catch(err => response.status(400).send(err)); //cambiar status
});

router.put('/:id', (req, res) => {
    if (typeof (req.body.status) === 'string' &&
        Array.isArray(req.body.products) &&
        typeof (req.body.client_id) === 'string') {
        let id = req.params.id,
            body = req.body;
        OrderModel.findById(id, (err, doc) => {
            if (err) {
                res.status(500).send(err);
            } else if (doc) {
                doc.status = req.body.status || doc.status;
                doc.date = req.body.date || doc.date;
                doc.products = req.body.products || doc.products;
                doc.client_id = req.body.client_id || doc.client_id;
                doc.updated_at = Date.now();
                doc.save((err, doc) => {
                    if (err)
                        res.status(500).send(err);
                    res.status(200).send(doc);
                });
            } else {
                res.status(404).send(err);
            }
        });
    } else {
        res.status(400).send({});
    }
});

router.delete('/:id', (req, res) => {
    OrderModel.findByIdAndRemove(req.params.id, (err, order) => {
        if (err) res.status(500).send('Internal Server Error');
        if (order)
            res.status(200).send(order);
        else
            res.status(404).send({});
    }
    );
});

router.get('/:id', (req, res) => {
    orderCrtl.getOrder(req.params.id).then(result => {
        if (result.length < 1) {
            res.status(404).send('Not Found');
        } else {
            res.status(200).send(result);
        }
    }).catch(err => res.status(500).send('Internal Server Error ' + err))
});

router.get('/:id/products', (req, res) => {
    orderCrtl.getProductsof(req.params.id).then(result => {
        if (result.length < 1) {
            res.status(404).send('Not Found');
        } else {
            res.status(200).send(result);
        }
    }).catch(err => res.status(500).send('Internal Server Error ' + err))
});

router.get('/:id/productsv2', (req, res) => {
    orderCrtl.getProductsByArr(req.params.id).then(result => {
        if (result.length < 1) {
            res.status(404).send('Not Found');
        } else {
            res.status(200).send(result);
        }
    }).catch(err => res.status(500).send('Internal Server Error ' + err))
});

module.exports = router;