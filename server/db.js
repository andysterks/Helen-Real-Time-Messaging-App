const { Pool } = require("pg");
require("dotenv").config();

// DATABASE CONNECTION AND CONFIGURATION
const database = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT || 5432,
};

const pool = new Pool(database);
pool
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
    return pool.query("SELECT * FROM users"); // Example query
  })
  .then((result) => {
    console.log("Query result:", result.rows);
    return pool.end(); // Close the connection
  })
  .then(() => {
    console.log("Connection to PostgreSQL closed");
  })
  .catch((err) => {
    if (err.code === "ECONNREFUSED") {
      console.error(
        "Connection refused. Ensure PostgreSQL server is running and accessible at",
        database.host
      );
    } else {
      console.error("Error connecting to PostgreSQL database:", err);
    }
  });

module.exports = pool;
