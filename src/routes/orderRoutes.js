const express = require('express');
module.exports = (app, bodyParser, logger) => {
    app.use(bodyParser.json());
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    const route = express.Router(),
        OrderModel = require('../db/models/order');

    // #region GET ------------------------------------------------------------------------------------
    route.get('/', (req, res) => {
        res.status(200).send('Client deleted');
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
        }, (err, order)=>{
            if(err) res.status(500).send('Internal Server Error');
            res.status(200).send('');
        });
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