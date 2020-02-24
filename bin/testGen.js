const words =  250;
const paras =  3;


function getNextWord(words) {

}


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