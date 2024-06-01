const { Pool, Client } = require("pg");
const Path = require("path");
require("dotenv").config();


const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});



module.exports = pool;




// (async () => {
//   const client = await pool.connect();
//   try {
//     const { rows } = await pool.query("SELECT current_user");
//     const currentUser = rows[0]["current_user"];
//     console.log(currentUser);
//   } catch (err) {
//     console.error(err);
//   } finally {
//     client.release();
//   }
// })();