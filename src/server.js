const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db/db');
const OrderRoutes = require('./routes/orderRoutes')(app, bodyParser, logger);
const ProductRoutes = require('./routes/productRoutes')(app, bodyParser, logger);
const ClientRoutes = require('./routes/clientRoutes')(app, bodyParser, logger);

module.exports = () => {
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.get('/', (req, res, next) => {
        res.send(`Shopping Cart API`);
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