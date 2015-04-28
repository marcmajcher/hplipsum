'use strict';
var fs = require('fs');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var mongoPort = 27017;

console.log('Indexing text');

var textDir = 'data/';
var fileNames;
var fileCount;
var index;
var db;
var insertCount = 0;

var insertWord = function(words, i) {
	if (i < words.length - 2 && words[i + 2] !== '') {
		index.insert({
			w1: words[i],
			w2: words[i + 1],
			w3: words[i + 2]
		}, {
			j: true,
			w: 1
		}, function(err, item) {
			insertCount++;
			insertWord(words, i + 1);
		});
	}
	else {
		console.log(' done with '+fileCount);
		fileCount--;

		if (fileCount === 0) {
			db.close();
			console.log('insert count: ' + insertCount);
			console.log('Text files successfully indexed.');
		}

	}
};

var processFile = function(file) {
	fs.readFile(textDir + file, function(err, data) {
		var words = String(data).split(/\s+/);

		console.log('Processing : ' + file);
		// console.log('  seeds: '+words[0]+', '+words[1]);

		/* Add first two words of story to seeds list */
		index.update({
			_id: '_seeds'
		}, {
			$push: {
				'seeds': [words[0], words[1]]
			}
		});

		insertWord(words, 0);

		// words.forEach(function(word, i) {
		// 	if (i < words.length - 2 && words[i + 2] !== '') {
		// 		index.insert({
		// 			w1: word,
		// 			w2: words[i + 1],
		// 			w3: words[i + 2]
		// 		}, {
		// 			j: true,
		// 			w: 1
		// 		}, function(err, item) {
		// 			insertCount++;
		// 		});
		// 	}
		// });

		/* When we're all done, close the mongo connection and exit */
		// fileCount--;

		// if (fileCount === 0) {
		// //	db.close();
		// 	console.log('insert count: ' + insertCount);
		// 	console.log('Text files successfully indexed.');
		// }
	});
};

/* Grab text file names */
fs.readdir(textDir, function(err, files) {
	fileNames = files;
	fileCount = files.length;
});

/* Connect to mongo, get collection handle, and process the text */
db = new Db('hplipsum', new Server('localhost', mongoPort));
db.open(function(err, db) {
	if (err) {
		console.log('ERROR: Can\'t connect to mongoDB on port ' + mongoPort);
		throw (err);
	}

	db.collection('index', function(err, collection) {
		if (err) {
			console.log('ERROR: Can\'t create collection');
			throw (err);
		}

		index = collection;
		index.remove();
		index.insert({
			_id: '_seeds',
			seeds: []
		});
	});

	fileNames.forEach(processFile);
});