const express = require('express');
const router = express.Router();
const ProductModel = require('../db/models/product');

router.get('/', (req, res) => {
    ProductModel.find({}, (err, prod) => {
        if (err) res.status(500).send("Internal Server Error");
        res.status(200).send(prod); //prod
    });
});

router.get('/:id', (req, res) => {
    ProductModel.findById(req.params.id, (err, prod) => {
        if (err) res.status(500).send("Internal Server Error");
        res.status(200).send(prod); //prod
    });
});

router.post('/', (req, res) => {
    //console.log(req.body);
    ProductModel.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    }, (err, order)=>{
        if(err) res.status(500).send('Internal Server Error');
        res.status(200).send("Product added");
    });
});

router.put('/:id', (req, res) => {
    ProductModel.findById(req.params.id, (err, prod) => {
        if (err)
            res.status(404).send(err)
        if (req.body.name) prod.name = req.body.name;
        if (req.body.price) prod.price = req.body.price;
        if (req.body.description) prod.description = req.body.description;
        prod.save((err, prod) => { if (err) res.status(404).send(err); });
        res.status(200).send("Product updated succesfully");
    });
});

router.delete('/:id', (req, res) => {
    ProductModel.findByIdAndRemove(req.params.id, (err, product) => {
        if (err){ res.status(500).send('Internal Server Error'); }
        if (product){
            res.status(200).send('Product deleted succesfully');
        } else { res.status(404).send('not ok');}
        
    });
});

module.exports = router;