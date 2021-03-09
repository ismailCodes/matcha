const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
  user: process.env.user,
  host: 'localhost',
  port: 5432,
  database: process.env.db,
});

module.exports = pool;
