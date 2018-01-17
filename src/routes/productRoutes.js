const express = require('express');
module.exports = (app, bodyParser, logger) => {
    app.use(bodyParser.json());
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    const route = express.Router(),
        ProductModel = require('../db/models/product');

    // #region GET ------------------------------------------------------------------------------------
    route.get('/', (req, res) => {
        ProductModel.find({}, (err,prod) => {
            if(err) res.status(500).send("Internal Server Error");
            res.status(200).send(prod);
        });
    });

    route.get('/:id', (req, res) => {
        ProductModel.findById(req.params.id, (err,prod) => {
            if(err) res.status(500).send("Internal Server Error");
            res.status(200).send(prod);
        });
    });
    // #endregion
    // #region POST -----------------------------------------------------------------------------------
    route.post('/', (req, res) => {
        //Check that it doesn't content a null
        if(!req.body.name||!req.body.price||!req.body.description){
            return res.status(206).send({ success: false, msg: 'It\'s necessary to have all the attributes', data: req.body });
            let pruduct = new ProductModel({
                name        : req.body.name,
                price       : req.body.price,
                description : req.body.description
            })
        }
        product.save((err, data) => {
            if (err)
                res.status(404).send(err);
            res.status(200).send({ success: true, msg: 'Product Registered', data: data });
        });
        res.status(200)
        
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