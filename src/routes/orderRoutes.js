const express = require('express');
const router = express.Router();
const OrderModel = require('../db/models/order');

router.get('/', (req, res) => {
    OrderModel.find({}, (err, order) => {
        if (err) return res.status(500).send('Internal Server Error');
        res.status(200).send(order);
    });
});

router.get('/:id', (req, res) => {
    OrderModel.findById(req.params.id, (err, order) => {
        if (err) res.status(500).send('Internal Server Error');
        res.status(200).send(order);
    });
});

router.post('/', (req, res) => {
    OrderModel.create({
        status: req.body.status,
        products: req.body.products,
        client_id: req.body.client_id
    }, (err, order) => {
        if (err)
            res.status(500).send('Internal Server Error');
        res.status(200).send('OK');
    });
});

router.put('/:id', (req, res) => {
    if (typeof (req.body.status) === 'string' &&
        typeof (req.body.date) === 'string' && // verificar formato de fecha
        typeof (req.body.created_at) === 'string' &&
        typeof (req.body.updated_at) === 'string' &&
        typeof (req.body.deleted_at) === 'string' &&
        typeof (req.body.client_id) === 'number') {
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
        res.status(400).send('Bad request');
    }
});

router.delete('/:id', (req, res) => {
    OrderModel.findByIdAndRemove(req.params.id, (err, order) => {
        if (err) res.status(500).send('Internal Server Error');
        if (order)
            res.status(200).send('OK delete ' + order);
        else
            res.status(404).send('NOT OK');
    }
    );
});

module.exports = router;