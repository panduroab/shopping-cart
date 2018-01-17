const express = require('express');
module.exports = (app, bodyParser, logger) => {
    app.use(bodyParser.json());
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    const route = express.Router(),
        OrderModel = require('../db/models/order');

    // #region GET ------------------------------------------------------------------------------------
    route.get('/', (req, res) => {
        OrderModel.find({}, (err, order) => {
            if (err) res.status(500).send('Internal Server Error');
            res.status(200).send(order);
        });
    });
    // #endregion
    // #region GET ------------------------------------------------------------------------------------
    route.get('/:id', (req, res) => {
        OrderModel.findById(req.params.id, (err, order) => {
            if (err) res.status(500).send('Internal Server Error');
            res.status(200).send(order);
        });
    });
    // #endregion
    // #region POST -----------------------------------------------------------------------------------
    route.post('/', (req, res) => {
        console.log(req.body);
        OrderModel.create({
            status: req.body.status,
            date: req.body.date,
            products: req.body.products,
            client_id: req.body.client_id
        }, (err, order) => {
            if (err) res.status(500).send('Internal Server Error');
            res.status(200).send('OK');
        });
    });
    // #endregion
    // #region PUT ------------------------------------------------------------------------------------
    route.put('/:id', (req, res) => {
        let id = req.params.id,
            body = req.body;
        OrderModel.findById(id, (err, doc) => {
            if (err) {
                res.status(500).send(err);
            } else {
                doc.status = req.body.status || doc.status;
                doc.date = req.body.date || doc.date;
                doc.products = req.body.products || doc.products;
                doc.client_id = req.body.client_id || doc.client_id;
                // doc.created_at = req.body.created_at || doc.created_at;
                doc.updated_at = Date.now();
                // doc.deleted_at = req.body.deleted_at || doc.deleted_at;

                // Update the document
                doc.save((err, doc) => {
                    if (err)
                        res.status(500).send(err);
                    res.status(200).send(doc);
                });
            }
        });
    });
    // #endregion
    // #region DELETE ---------------------------------------------------------------------------------
    route.delete('/:id', (req, res) => {
        OrderModel.findByIdAndRemove(req.params.id, (err, order) => {
            if (err) res.status(500).send('Internal Server Error');
            res.status(200).send('OK delete ' + req.params.id);
        }
        );
    });
    // #endregion

    app.use('/api/order/', route);

};