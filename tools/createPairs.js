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

		if (users.length % 2 !== 0) {
			return next('There needs to be an even number of people.');
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
		let where = {
			_id: {
				$in: pair.map(id => mongoose.Types.ObjectId(id))
			}
		};

		models.users.find(where).lean().exec((err, users) => {
			each(composeTexts(users), (text, cb) => {
				let { body, to, from } = text;
				twilio.messages.create({ body, to, from })
					.then(msg => {
						debug(msg.sid);
						cb(null);
					});
				;
			}, err => done(err));
		});
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

// helpers
function composeTexts(users) {
	const from = '+15592037260';
	return users.reduce((texts, user, i) => {
		const to = `+1${users[i ? 0 : 1].number}`
			, body = `Ho ho ho!
Santa needs your help with his many lists, could you take care of this one?

${user.name} ${iterateList(user.list)}.`
		;

		texts.push({ body, to, from });

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

		return texts;
	}, []);
}
