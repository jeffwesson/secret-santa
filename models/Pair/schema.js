const { Schema } = require('mongoose');

module.exports = new Schema({
	pair: [Schema.Types.ObjectId],
	timestamp: { type: Date, default: Date.now }
});
