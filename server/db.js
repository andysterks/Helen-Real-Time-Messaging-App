const { Pool } = require("pg");
require("dotenv").config();

// DATABASE CONNECTION AND CONFIGURATION
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT || 5432,
});

module.exports = pool;
