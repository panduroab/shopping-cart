const express = require('express');
module.exports = (app) => {
    const route = express.Router(),
        OrderModel = require('../db/models/order');

    // #region GET ------------------------------------------------------------------------------------
    route.get('/', (req, res) => {
        res.status(200).send('Client deleted');
    });
    // #endregion
    // #region POST -----------------------------------------------------------------------------------
    route.post('/', (req, res) => {

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
                doc.updated_at = Date.now;
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
        // console.log(req.params.id);
        // Cliente.findByIdAndRemove(req.params.id, (err, user) => {
        //     if (err) return;
        //     res.status(200).send('Client deleted');
        // });
    });
    // #endregion

    app.use('/api/order/', route);

};