'use strict';
var mongoose = require('mongoose');
var Address = mongoose.model('Address');
var router = require('express').Router();

router.get('/', function(req, res, next) {
	Address.find({isFavorite: true}).exec()
		.then(function(favs) {
			res.json(favs)
		})
		.then(null, next);
});


module.exports = router;