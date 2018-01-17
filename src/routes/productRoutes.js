const express = require('express');
module.exports = (app, bodyParser, logger) => {
    app.use(bodyParser.json());
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    const route = express.Router(),
        ProductModel = require('../db/models/product');

    // #region GET ------------------------------------------------------------------------------------
    route.get('/', (req, res) => {
        res.status(200).send('GetProduct');
    });
    // #endregion
    // #region POST -----------------------------------------------------------------------------------
    route.post('/', (req, res) => {

    });
    // #endregion
    // #region PUT ------------------------------------------------------------------------------------
    route.put('/:id', (req, res) => {
        ProductModel.findById( req.params.id, (err,prod)=> {
            if(err)
                    res.status(404).send(err)
            if(req.body.name) prod.name = req.body.name;
            if(req.body.price) prod.price = req.body.price; 
            if(req.body.description) prod.description = req.body.description;
            prod.save( (err, prod) => {if(err) res.status(404).send(err);});
            res.status(200).send("Product updated succesfully");
        });

    });
    // #endregion
    // #region DELETE ---------------------------------------------------------------------------------
    route.delete('/:id', (req, res) => {
        ProductModel.findByIdAndRemove(req.params.id, err => {
            if(err)
                    res.status(404).send(err);
            res.status(200).send('Product deletedsuccesfully');
        });
    });
    // #endregion

    app.use('/api/products/', route);

};