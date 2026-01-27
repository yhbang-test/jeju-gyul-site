const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'your_password',
  database: 'jeju_gyul',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool.promise();