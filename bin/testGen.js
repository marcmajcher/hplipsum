'use strict';
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var mongoPort = 27017;

var words = process.argv[2] || 250;
var paras = process.argv[3] || 3;
var index;

var db = new Db('hplipsum', new Server('localhost', mongoPort));
var textArr = [];
var pindex = 0;
var windex;
var foundPeriod;

var dumpText = function() {
	textArr.forEach(function(arr) {
		console.log(arr.join(' '));
		console.log('');
	});
};

var getNextWord = function(arr) {
	index.find({
			w1: arr[0],
			w2: arr[1]
		},
		function(err, object) {
			object.toArray(function(err, docs) {
				if (err) {
					throw err;
				}

				var w3 = docs[Math.floor(Math.random() * docs.length)].w3;
				textArr[pindex].push(w3);

				windex++;

				if (windex >= words) {
					if (w3.match(/\.$/)) {
						foundPeriod = true;
					}
				}

				if (windex < words || !foundPeriod) {
					arr.push(w3);
					arr.shift();
					getNextWord(arr);
				}
				else {
					pindex++;
					if (pindex < paras) {
						newParagraph();
					}
					else {
						db.close();
						dumpText();
					}
				}
			});

		});
};

var newParagraph = function() {
	windex = 0;
	foundPeriod = false;

	/* Choose a random paragraph seed */
	index.findOne({
		_id: '_seeds'
	}, function(err, object) {
		var seed = object.seeds[Math.floor(Math.random() * object.seeds.length)];

		textArr[pindex] = seed.slice();
		getNextWord(seed);
	});
};

db.open(function(err, db) {
	if (err) {
		console.log('ERROR: Can\'t connect to mongoDB on port ' + mongoPort);
		throw (err);
	}

	db.collection('index', function(err, dbindex) {
		if (err) {
			console.warn('ERROR: Can\'t create collection');
			throw (err);
		}
		index = dbindex;

		newParagraph();
	});
});