'use strict';
// read-set env vars
require('dotenv').config();

// Pkg Dependencies
const express = require('express'),
	exphbs = require('express-handlebars'),
	bodyParser = require('body-parser'),
	path = require('path');

// App Init
const app = express();
// DB Dependency
const db = require('./app/models');

// App PORT
const PORT = process.env.PORT || 8080;

// logging (middleware)
app.use(require('./app/middleware/logger'));

// Set static folder
app.use(express.static(path.join(__dirname, '/app/public')));

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set DEFAULT Views dir
app.set('views', path.join(__dirname, './app/views'));

// Handlebars
app.engine(
	'handlebars',
	exphbs({
		defaultLayout: 'main',
		helpers: require('./config/handlebars-helper').helpers,
	}),
);
app.set('view engine', 'handlebars');

// Routes
app.use('/', require('./app/routes/html'));
app.use('/api', require('./app/routes/api'));

// Handle 400
app.use(function(req, res) {
	res.status(400);
	res.render('400');
});

// Handle 404
app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

// Handle 500
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.type('plain/text');
	res.status(500);
	res.render('500');
});

// Listen...
db.sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.info(
			`===> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`,
		);
	});
});
