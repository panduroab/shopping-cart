const express = require('express');
const router = express.Router();
const categoryModel = require('../db/models/category');

// Get all products by category
router.get('/', (req, res) => {
    let name = req.query.name;
    if(!name)
        res.send('Add a query param in the URL like ?name=other');
    categoryModel.getProductsOn(name)
        .then(products => res.status(200).send(products))
        .catch(err => res.status(500).send(err));
});

module.exports = router;
