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