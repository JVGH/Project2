'use strict';

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

module.exports = {
	development: {
		username: process.env.DEV_MYSQL_USER,
		password: process.env.DEV_MYSQL_PASSWORD,
		database: process.env.DEV_MYSQL_DBNAME,
		host: process.env.DEV_MYSQL_HOST,
		port: parseInt(process.env.DEV_MYSQL_PORT),
		dialect: 'mysql',
	},
	test: {
		username: 'root',
		password: null,
		database: 'database_test',
		host: '127.0.0.1',
		dialect: 'mysql',
	},
	production: {
		use_env_variable:
			'zj2x67aktl2o6q2n.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
		dialect: 'mysql',
	},
};
