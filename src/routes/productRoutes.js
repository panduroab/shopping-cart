const express = require('express');
const router = express.Router();
const ProductModel = require('../db/models/product');
const CategoryModel = require('../db/models/category');

router.get('/search', (req, res) => {
    let value = req.query.value;
    let category = req.query.category;
    if(!value && !category)
        res.send('either use value or category to search')
    else if(value)
        ProductModel.getByName(value)
            .then(products => res.status(200).send(products))
            .catch(err => res.status(500).send(err))
    else
        CategoryModel.getProductsOn(category)
            .then(products => res.status(200).send(products))
            .catch(err => res.status(500).send(err));
});

router.get('/', (req, res) => {
    let pageSize = Number(req.query.items) > 0 ? Number(req.query.items) : 12;
    let page = req.query.page;

    let category = req.query.category || '';
    let name = req.query.name || '';

    let query = {
        name: { $regex: name, $options: 'i' },
        category: { $regex: category, $options: 'i' },
    };
    if(page) {
        ProductModel.find(query).skip(pageSize * page).limit(pageSize).exec((err, prod) => {
            if(err)
                res.status(500).send("Internal Server Error");
            res.status(200).send(prod);
        });
    } else {
        ProductModel.find({}, (err, prod) => {
            if(err)
                res.status(500).send("Internal Server Error");
            res.status(200).send(prod);
        });
    }
});

router.get('/:id', (req, res) => {
    ProductModel.findById(req.params.id, (err, prod) => {
        if (err) res.status(500).send("Internal Server Error");
        res.status(200).send(prod);
    });
});

router.post('/', (req, res) => {
    if (typeof(req.body.name) === 'string' && typeof(req.body.price) === 'number' && typeof(req.body.description) === 'string') {

        ProductModel.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            stock: req.body.stock,
            category: req.body.category,
            imageUrl: req.body.imageUrl
        }, (err, prod) => {
            if (err) {res.status(500).send('Internal Server Error')};
            res.status(200).send(prod);
        });
    } else {
        res.status(404).send("Error: the filds are incorrect");
    }
});

router.put('/:id', (req, res) => {
    if (typeof(req.body.name) === 'string' && typeof(req.body.price) === 'number' && typeof(req.body.description) === 'string') {
        let id = req.params.id,
            body = req.body;
        ProductModel.findById(id, (err, prod) => {
            if (err) {
                res.status(404).send(err)
            } else if (prod) {
                prod.name = req.body.name || prod.name;
                prod.price = req.body.price || prod.price;
                prod.description = req.body.description || prod.description;
                prod.stock = req.body.stock || prod.stock;
                prod.category = req.body.category || prod.category;
                prod.imageUrl = req.body.imageUrl || prod.imageUrl;
                prod.save((err, prod) => {
                    if (err)
                        res.status(500).send(err);
                    res.status(200).send(prod);
                });
            } else {
                res.status(404).send(err);
            }
        });
    } else {
        res.status(404).send("Error: the filds are incorrect");
    }
});

router.delete('/:id', (req, res) => {
    ProductModel.findByIdAndRemove(req.params.id, (err, product) => {
        if (err) { res.status(500).send('Internal Server Error'); }
        if (product) {
            res.status(200).send('Product deleted succesfully');
        } else { 
            res.status(404).send('not ok'); 
        }
    });
});

module.exports = router;