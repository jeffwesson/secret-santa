const { Schema } = require('mongoose');

module.exports = new Schema(
	{ pair: [Schema.Types.ObjectId] },
	{ timestamps: { createdAt: 'created_at' } }
);
