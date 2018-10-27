const bodyParser = require('body-parser');
const configs = require('./configs');
const cookieParser = require('cookie-parser');
const express = require('express');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const stylus = require('stylus');
const user = require('./routes/user');

const app = express();

// create db connection
const dbUri = configs.get('dburi');

if (mongoose.connection.readyState !== 1) {
	mongoose.connect(dbUri, { useMongoClient: true });
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res, next) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/api/v1/user', user);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send({ error: err.message });
});

module.exports = app;
