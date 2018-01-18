const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const OrderRoutes = require('./routes/orderRoutes');
const ProductRoutes = require('./routes/productRoutes');
const ClientRoutes = require('./routes/clientRoutes');
const db = require('./db/db');

module.exports = config => {
    db({ domain: '127.0.0.1', port: '27017', dbName: 'shopping-cart' });

    if(config.logger) app.use(logger(config.logger));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get('/', (req, res, next) => {
        res.send(`Shopping Cart API`);
    });

    // routes
    app.use('/api/order', OrderRoutes);
    app.use('/api/product', ProductRoutes);
    app.use('/api/client', ClientRoutes);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function (err, req, res, next) {
        let status = err.status || 500;
        res.status(status);
        res.send({
            message: err.message,
            status
        });
    });

    return app;
};