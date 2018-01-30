const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const OrderRoutes = require('./routes/orderRoutes');
const ProductRoutes = require('./routes/productRoutes');
const ClientRoutes = require('./routes/clientRoutes');
const path = require('path');
const cors = require('cors');

module.exports = config => {
    if(config.logger)
        app.use(logger(config.logger));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(cors());

    app.get('/', (req, res, next) => {
        res.send(`Shopping Cart API`);
    });

    // routes
    app.use('/api/order', OrderRoutes);
    app.use('/api/product', ProductRoutes);
    app.use('/api/client', ClientRoutes);

    app.use('/api', (req, res) => {
        res.sendFile(path.join(__dirname + '/api.html'));
    });

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