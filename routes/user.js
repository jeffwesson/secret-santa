const debug = require('debug')('secret-santa:route:user');
const express = require('express');
const models = require('../models');
const router = express.Router();

router.use('/', (req, res, next) => {
	// CORS
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

router.post('/', (req, res, next) => {
	const _user = new models.users(req.body);
	const { name, number, list } = _user;

	models.users.findOneAndUpdate(
		{ number },
		{ $set: { name, list } },
		{ new: true, upsert: true },
		(err, user) => {
			if (err) {
				debug(err);
				res.status(500);
				return next(err);
			}

			res.status(200);
			res.json(user);

			next(null);
		}
	);
});

module.exports = router;
