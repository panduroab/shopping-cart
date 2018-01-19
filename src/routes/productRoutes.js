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
    let id = req.params.id,
        body = req.body;
    ProductModel.findById(id, (err, prod) => {
        if (err){
            res.status(404).send(err)
        } else if (prod){
            prod.name = req.body.name || prod.name;
            prod.price = req.body.price || prod.price;
            prod.description = req.body.description || prod.description;
            prod.save((err, prod) => {
                if (err)
                    res.status(500).send(err);
                res.status(200).send(prod);
            });
        } else {
            res.status(404).send(err);
        }
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