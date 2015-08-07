'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	start_address: {type: mongoose.Schema.ObjectId, ref: 'Address'},
	end_address: {type: mongoose.Schema.ObjectId, ref: 'Address'}
})

mongoose.model('Route', schema);