'use strict';
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var mongoPort = 27017;

var db = new Db('hplipsum', new Server('localhost', mongoPort));
db.open(function(err, db) {
	if (err) {
		console.log('ERROR: Can\'t connect to mongoDB on port ' + mongoPort);
		throw (err);
	}

	db.collection('index', function(err, index) {
		if (err) {
			console.log('ERROR: Can\'t create collection');
			throw (err);
		}

		index.findOne({
			_id: '_seeds'
		}, function(err, object) {
			console.log(object);
			db.close();
		});


	});
});