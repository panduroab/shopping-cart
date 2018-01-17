const   route   = require('express').Router(),
    OrderModel  = require('../db/models/product');

// #region GET ------------------------------------------------------------------------------------
route.get('/', (req, res) => {
    res.status(200).send('get deproducto');
    
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
    
});
// #endregion

module.exports = route;