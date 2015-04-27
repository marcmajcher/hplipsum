'use strict';
var fs = require('fs');

console.log('Indexing text');

var dataDir = 'data/';
var textDir = dataDir + 'text/';
var indexFile = dataDir + 'index.json';
var index = {
	__seed: []
};
var fileCount;

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
			fs.writeFile(indexFile, JSON.stringify(index), function(err) {
				if (err) {
					throw(err);
				}
				console.log('Index file saved to '+indexFile);
			});
		}
	});
};

fs.readdir(textDir, function(err, files) {
	fileCount = files.length;
	files.forEach(processFile);
});