const { Schema } = require('mongoose');

module.exports = new Schema({
	pair: [Schema.Types.ObjectId],
	timestamp: { type: Date, default: new Date() }
});
