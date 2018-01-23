const express = require('express');
const router = express.Router();
const ClientModel = require('../db/models/client');

//Get all
router.get('/', (req, res) => {
    //Get all the clients from DB
    ClientModel.find({}).exec((err, docs) => {
        if (err)
            res.status(404).send(err);
        res.status(200).send(docs);
    });
    res.status(200);
});

//Get by ID
router.get('/:id', (req, res) => {
    //Get a client by his ID
    ClientModel.findById(req.params.id, (err, doc) => {
        if (err) res.status(500).send(err);
        if (!doc) res.status(404).send('Client not found');
        res.send(doc);
    });
});

//Post
// falta validar que los datos no lleguen vacios
router.post('/', (req, res) => {
    ClientModel.create({
        name: req.body.name,
        lastnamefa: req.body.lastnamefa,
        lastnamemo: req.body.lastnamemo,
        birthdate: req.body.birthdate,
        address: req.body.address
    }, (err, order) => {
        if (err) res.status(500).send('Internal Server Error');
        res.status(200).send(order);
    });
});

//Delete
router.delete('/:id', (req, res) => {
    ClientModel.findByIdAndRemove(req.params.id, (err, client) => {
        if (err)
            res.status(500).send('Internal Server Error');
        if (client)
            res.status(200).send(client);
        else
            res.status(404).send('Client not found');
    });
});

//Put
router.put('/:id', (req, res) => {
    if (typeof (req.body.name) === 'string' &&
        typeof (req.body.lastnamefa) === 'string' &&
        typeof (req.body.lastnamemo) === 'string' &&
        typeof (req.body.birthdate) === 'string' &&
        typeof (req.body.address) === 'string') {
        ClientModel.findById(req.params.id, (err, cli) => {
            if (err) res.status(404).send(err);
            if (cli) {
                cli.name = req.body.name || cli.name;
                cli.lastnamefa = req.body.lastnamefa || cli.lastnamefa;
                cli.lastnamemo = req.body.lastnamemo || cli.lastnamemo;
                cli.birthdate = req.body.birthdate || cli.birthdate;
                cli.address = req.body.address || cli.address;
                cli.save((err, clie) => {
                    if (err) res.status(404).send(err);
                    res.status(200).send(cli);
                });
            } else {
                res.status(404).send(cli);
            }
        });
    } else {
        res.status(404).send('Fields are wrong');
    }
});

module.exports = router;