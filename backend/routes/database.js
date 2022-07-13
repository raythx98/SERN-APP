var mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    user: process.env.MYSQL_USER,
    host: process.env.MYSQL_HOST,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})

module.exports = db;