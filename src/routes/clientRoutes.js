const route  = require('express').Router();
const clientOrder = require('../db/models/client');
module.exports = (app, bodyParser, logger) => {
    app.use(bodyParser.json());
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
}
//Get all
route.get('/',(req,res)=>{
    //Get all the clients from DB
    clientOrder.find({}).exec((err, docs) => {
		if (err)
			res.status(404).send(err);
		res.status(200).send(docs);
	});
    res.status(200)
})
//Get by ID
route.get('/:id',(res,req)=>{
    //Get a client by his ID
    clientOrder.findById(req.params.id, (err, doc) => {
		if (err)
			res.status(404).send(err);
		res.status(200).send(doc);
	});
})
//Post
route.post('/',(req,res)=>{
    //Check that it does not contain null
    if(!req.body.name||!req.body.lastnamefa||!req.body.lastnamemo||req.body.birthdate||req.body.address){
        return res.status(206).send({ success: false, msg: 'It\'s necessary to have all the attributes', data: req.body });
        //Build a new Client
        let client = new clientOrder({
            name        : req.body.name,
            lastnamefa  : req.body.lastnamefa,
            lastnamemo  : req.body.lastnamemo,
            birthdate   : req.body.birthdate,
            address     : req.body.address
        })
    }
    client.save((err, data) => {
		if (err)
			res.status(404).send(err);
		res.status(200).send({ success: true, msg: 'Client Registered', data: data });
	});
    res.status(200)
})
//Delete
route.delete('/:id',(req, res)=>{
    res.status(200)
})