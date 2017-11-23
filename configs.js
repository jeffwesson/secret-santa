const _ = require('lodash')
	, debug = require('debug')('secret-santa:configs')
	, nconf = require('nconf')
	, path = require('path')
;

nconf
	.env()
	.file({ file: path.join(__dirname, '/_config.json') })
;

let env = nconf.get('NODE_ENV');
if (!env) {
	env = 'development';
}
nconf.set('env', env);

let port = nconf.get('PORT') || 3001;
nconf.set('port', parseInt(port, 10));

let dbUri = nconf.get('MONGODB_URI')
	|| nconf.get('MONGO_URI')
	|| nconf.get('MONGOHQ_URL')
	|| nconf.get('MONGOLAB_URI')
	|| nconf.get('mongoUrl')
;
nconf.set('dburi', dbUri);

let twilio = {
	sid: nconf.get('TWILIO_ACCOUNT_SID')
	, token: nconf.get('TWILIO_AUTH_TOKEN')
};
nconf.set('twilio', twilio);

nconf.defaults({
	baseUrl: `http://localhost:${port}`
	, dburi: 'mongodb://localhost/secret-santa'
});

if (nconf.get('env') === 'development') {
	configs();
}

function configs() {
	debug(':: CONFIGS ::');
	debug('env: %s', nconf.get('env'));
	debug('dburi: %s', nconf.get('dburi'));
	debug('baseUrl: %s', nconf.get('baseUrl'));
	debug('port: %s', nconf.get('port'));
	debug('twilio: %s', JSON.stringify(nconf.get('twilio')));
}

module.exports = nconf;
