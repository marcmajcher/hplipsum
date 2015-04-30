'use strict';
var config = require('../../config/config');
var mongoose = require('mongoose');

var db = mongoose.connect(config.db, function (err) {
	if (err) {
		console.error('Could not connect to MongoDB in core.server.controller.js!');
		console.log(err);
	}
});
var index = db.connection.collection('index');

var defaultWords = 250;
var defaultParas = 2;
var words;
var paras;
var index;

var textArr;
var pindex;
var windex;
var foundPeriod;

/**
 * Module dependencies.
 */
exports.index = function (req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};


var getNextWord = function (arr, res) {
	index.find({
			w1: arr[0],
			w2: arr[1]
		},
		function (err, object) {
			object.toArray(function (err, docs) {
				if (err) {
					throw err;
				}

				var w3 = docs[Math.floor(Math.random() * docs.length)].w3;
				textArr[pindex] += ' ' + w3;

				windex++;

				if (windex >= words) {
					if (w3.match(/\.$/)) {
						foundPeriod = true;
					}
				}

				if (windex < words || !foundPeriod) {
					arr.push(w3);
					arr.shift();
					getNextWord(arr, res);
				}
				else {
					pindex++;
					if (pindex < paras) {
						newParagraph(res);
					}
					else {
						res.send(textArr);
					}
				}
			});

		});
};


var newParagraph = function (res) { // jshint ignore: line
	windex = 0;
	foundPeriod = false;

	/* Choose a random paragraph seed */
	index.findOne({
		_id: '_seeds'
	}, function (err, object) {
		var seed = object.seeds[Math.floor(Math.random() * object.seeds.length)];
		textArr[pindex] = seed.join(' ');
		getNextWord(seed, res);
	});
};


var getText = function (res) {
	textArr = [];
	pindex = 0;
	newParagraph(res);
};


exports.ipsum = function (req, res) {
	words = (req.wordCount > 0) ? req.wordCount : defaultWords;
	paras = (req.paragraphCount > 0) ? req.paragraphCount : defaultParas;
	getText(res);
};