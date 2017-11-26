const configs = require('../configs')
	, debug = require('debug')('secret-santa:tools:generatePairs')
	, each = require('async/each')
	, randomPairs = require('../lib/randomPairs')
	, models = require('../models')
	, mongoose = require('mongoose')
	, Twilio = require('twilio')
	, waterfall = require('async/waterfall')
;

const twilio = new Twilio(
	configs.get('TWILIO_ACCOUNT_SID')
	, configs.get('TWILIO_AUTH_TOKEN')
);

if (mongoose.connection.readyState !== 1) {
	mongoose.connect(configs.get('dburi'), { useMongoClient: true });
}

function getUsers(next) {
	debug('getUsers');
	models.users.find({}, (err, users) => {
		if (err) {
			return next(err);
		}

		next(null, users.map(u => u._id.toString()));
	});
}

function generatePairs(people, next) {
	debug('generatePairs');
	next(null, randomPairs(people));
}

function savePairs(pairs, next) {
	debug('savePairs');
	each(pairs, (pair, done) => {
		const doc = new models.pairs({
			pair: pair.map(id => mongoose.Types.ObjectId(id))
		});

		doc.save(err => {
			if (err) {
				debug(err);
			}
			done(err);
		});
	}, err => next(err, pairs));
}

function sendTexts(pairs, next) {
	debug('sendTexts');
	each(pairs, (pair, done) => {
		const wisherId = mongoose.Types.ObjectId(pair[0])
			, secretSantaId = mongoose.Types.ObjectId(pair[1])
		;

		function getWisher(cb) {
			debug('getWisher');
			models.users.findById(wisherId, (err, wisher) => {
				cb(err, { wisher });
			});
		}

		function getSecretSanta(data, cb) {
			debug('getSecretSanta');
			let { wisher } = data;
			models.users.findById(secretSantaId, (err, secretSanta) => {
				cb(err, { secretSanta, wisher });
			});
		}

		function composeText(data, cb) {
			debug('composeText');
			let body = `Ho ho ho!
Santa needs your help with his many lists, could you take care of this one?

${data.wisher.name} ${iterateList(data.wisher.list)}.`;

			let from = '+15592037260';
			let to = `+1${data.secretSanta.number}`;

			function iterateList(list) {
				return list.reduce((str, wish, i) => {
					if (list.length === 1) {
						str += `${wish.verb}s ${wish.item}`;
					} else if (i + 1 === list.length) {
						str += `and ${wish.verb}s ${wish.item}`;
					} else {
						str += `${wish.verb}s ${wish.item}, `;
					}
					return str;
				}, '');
			}

			cb(null, { body, from, to });
		}

		function sendText(data, cb) {
			debug('sendText');
			let { body, from, to } = data;
			twilio.messages.create({ body, from, to }).then(msg => {
				debug(msg.sid);
				cb(null);
			});
		}

		waterfall([
			getWisher
			, getSecretSanta
			, composeText
			, sendText
		], done);
	}, err => next(err));
}

function finish(err) {
	debug('finish');
	if (err) {
		debug(err);
	}
	mongoose.disconnect();
}

waterfall([
	getUsers
	, generatePairs
	, savePairs
	, sendTexts
], finish);
