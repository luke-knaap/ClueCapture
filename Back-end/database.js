const { Sequelize } = require("sequelize");
require('dotenv').config()


const port = 3306;

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
	host: "localhost",
	dialect: "mysql",
	port: port,
});

// Test the connection
sequelize
	.authenticate()
	.then(() => {
		console.log("Connection has been established for SQL on the default port:" + port);
	})
	.catch((err) => {
		console.error("Unable to connect to the database:", err);
	});

module.exports = sequelize;
