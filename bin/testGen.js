'use strict';
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var mongoPort = 27017;

var words = process.argv[2] || 250;
var paras = process.argv[3] || 1;

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

		/* Choose a random paragraph seed */
		index.findOne({
			_id: '_seeds'
		}, function(err, object) {
			var seed = object.seeds[Math.floor(Math.random() * object.seeds.length)];

			console.log('Seed: ' + seed.join(' '));

			index.find({
					w1: seed[0],
					w2: seed[1]
				},
				function(err, object) {
					object.toArray(function(err, docs) {
						if (err) {
							throw err;
						}

						var w3 = docs[Math.floor(Math.random() * docs.length)].w3;
						seed.push(w3);
						console.log(seed.join(' '));
						db.close();
					});

				});

		});


	});
});