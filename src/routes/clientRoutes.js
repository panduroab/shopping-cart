const route  = require('express').Router();
const clientOrder = require('../db/models/client');

//GET
route.get('/',(req,res)=>{
    res.status(200)
})
//Post
route.post('/',(req,res)=>{
    res.status(200)
})
//Delete
route.delete('/:id',(req, res)=>{
    res.status(200)
})