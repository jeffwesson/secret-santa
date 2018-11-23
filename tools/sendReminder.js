const configs = require('../configs');
const debug = require('debug')('secret-santa:tools:generatePairs');
const each = require('async/each');
const models = require('../models');
const mongoose = require('mongoose');
const Twilio = require('twilio');
const waterfall = require('async/waterfall');

const twilio = new Twilio(
	configs.get('TWILIO_ACCOUNT_SID'),
	configs.get('TWILIO_AUTH_TOKEN')
);

if (mongoose.connection.readyState !== 1) {
	mongoose.connect(configs.get('dburi'), { useMongoClient: true });
}

function getUser(next) {
	debug('getUser');
	const number = process.argv[2];
	models.users.findOne({ number }, (err, user) => {
		if (err || !user) {
			err = err || `No user found with phone number: ${number}`;
			debug(err);
			return next(err);
		}
		next(null, user._id.toString());
	});
}

function getPair(id, next) {
	debug('getPair');
	models.pairs.findOne({
		'pair.1': id,
		'updatedAt': { '$gte': new Date(`${Number(date.getFullYear()) - 1}-12-31T00:00:00.000Z`) }
	}, (err, pair) => {
		if (err || !pair) {
			err = err || `No pair found with id: ${id}`;
			debug(err);
			return next(err);
		}
		next(null, [pair.pair]);
	});
}

function sendTexts(pairs, next) {
	debug('sendTexts');
	each(pairs, (pair, done) => {
		const wisherId = mongoose.Types.ObjectId(pair[0]);
		const secretSantaId = mongoose.Types.ObjectId(pair[1]);

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
			getWisher,
			getSecretSanta,
			composeText,
			sendText
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
	getUser,
	getPair,
	sendTexts
], finish);
