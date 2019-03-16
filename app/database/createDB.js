const mysql = require('mysql2/promise');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];

mysql
	.createConnection({
		host: process.env.DB_HOST || config.host,
		port: process.env.DB_PORT || config.port,
		user: process.env.DB_USER || config.username,
		password: process.env.DB_PASSWORD || config.password,
	})
	.then((connection) => {
		connection
			.query(`CREATE DATABASE IF NOT EXISTS ${config.database};`)
			.then((res) => {
				console.info('Database create or successfully checked');
				process.exit(0);
			});
	});
