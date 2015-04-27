'use strict';
var fs = require('fs');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

var mongoClient = require('mongodb').MongoClient;
var mongoPort = 27017;

console.log('Indexing text');

var dataDir = 'data/';
var textDir = dataDir + 'text/';
var indexFile = dataDir + 'index.json';
var index = {
	__seed: []
};
var fileCount;

var populateDB = function(index) {

	var db = new Db('hplipsum', new Server('localhost', mongoPort));
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
			collection.remove();
			//index = {dammit: 123};
			// use mongoimport instead?
			
			console.log(index);
			collection.insert(index);
		});
		db.close();
		console.log('Created index in db');

	});
};

var processFile = function(file) {
	fs.readFile(textDir + file, function(err, data) {
		var words = String(data).split(/\s+/);
		index.__seed.push([words[0], words[1]]);
		words.forEach(function(word, i) {
			if (i <= words.length - 3) {
				if (!index[word]) {
					index[word] = {};
				}
				index[word][words[i + 1]] = words[i + 2];
			}
		});
		fileCount--;
		if (fileCount === 0) {
			populateDB(index);
			// fs.writeFile(indexFile, JSON.stringify(index), function(err) {
			//	if (err) {
			//		throw(err);
			//	}
			//	console.log('Index file saved to '+indexFile);
			// });
		}
	});
};


fs.readdir(textDir, function(err, files) {
	fileCount = files.length;
	files.forEach(processFile);
});