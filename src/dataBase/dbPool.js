const mysql = require('mysql');
const config = require('./config').dbPool;

module.exports = mysql.createPool(config);
