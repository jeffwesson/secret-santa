const schema = require('./schema');

module.exports = require('mongoose').model('User', schema);
