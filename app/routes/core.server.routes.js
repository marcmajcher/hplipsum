'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	app.route('/').get(core.index);
	app.route('/ipsum/').get(core.ipsum);
	app.route('/ipsum/:words').get(core.ipsum);
	app.route('/ipsum/:words/:paras').get(core.ipsum);

	app.param('words', function(req, res, next, words) {
		req.wordCount = words;
		next();
	});

	app.param('paras', function(req, res, next, paras) {
		req.paragraphCount = paras;
		next();
	});
};