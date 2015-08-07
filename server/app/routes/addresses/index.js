'use strict';
var mongoose = require('mongoose');
var Address = mongoose.model('Address');
var router = require('express').Router();

router.get('/', function(req, res, next) {
	Address.find({}).exec()
		.then(function(addresses) {
			res.json(addresses)
		})
		.then(null, next);
});

router.post('/', function(req, res, next) {
	Address.create(req.body)
		.then(function(address) {
			res.json(address);
		})
		.then(null, next);
});

module.exports = router;