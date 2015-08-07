'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	street: { type: String },
	city: { type: String },
	state: { type: String },
	zip: { type: String },
	isFavorite: { type: Boolean }
})

mongoose.model('Address', schema);