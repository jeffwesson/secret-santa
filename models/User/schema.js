const { Schema } = require('mongoose');

module.exports = new Schema({
	name: { type: String, required: true }
	, number: { type: String, required: true }
	, list: [{
		verb: { type: String, required: true }
		, item: { type: String, required: true }
	}]
});
