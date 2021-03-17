const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  port: process.env.port,
  database: process.env.db,
});

module.exports = pool;
