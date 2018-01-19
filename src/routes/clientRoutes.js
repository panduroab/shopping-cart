const express = require('express');
const router = express.Router();
const ClientModel = require('../db/models/client');

//Get all
router.get('/',(req,res)=>{
    //Get all the clients from DB
    ClientModel.find({}).exec((err, docs) => {
        if (err)
            res.status(404).send(err);
        res.status(200).send(docs);
    });
    res.status(200);
});

//Get by ID
router.get('/:id',(req,res)=>{
    //Get a client by his ID
    ClientModel.findById(req.params.id, (err, doc) => {
        if (err)
            res.status(404).send(err);
        res.status(200).send(doc);
    });
});

//Post
router.post('/',(req,res)=>{
    ClientModel.create({
        name        : req.body.name,
        lastnamefa  : req.body.lastnamefa,
        lastnamemo  : req.body.lastnamemo,
        birthdate   : req.body.birthdate,
        address     : req.body.address
    },(err, order)=>{
        if(err) res.status(500).send('Internal Server Error');
        res.status(200).send('Client registered');
    });
});

//Delete
router.delete('/:id',(req, res)=>{
    ClientModel.findByIdAndRemove(req.params.id, (err, client) => {
        if(err)
            res.status(500).send('Internal Server Error');
        if(client)
            res.status(200).send('OK delete ' + client);
        else
            res.status(201).send('NOT OK');
    });
});

module.exports = router;