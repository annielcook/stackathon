'use strict';
var mongoose = require('mongoose');
var Route = mongoose.model('Route');
var router = require('express').Router();

router.get('/', function(req, res, next) {
	Route.find({}).populate('start_address end_address').exec()
		.then(function(routes) {
			res.json(routes)
		})
		.then(null, next);
});

router.post('/', function(req, res, next) {
	Route.create(req.body)
		.then(function(address) {
			res.json(address);
		})
		.then(null, next);
});

module.exports = router;