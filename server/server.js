 const express = require("express");
 const app = express();
 const cors = require("cors");
 const path = require("path");
 const { Pool } = require("pg");
 const router = express.Router();
 require("dotenv").config();

const port = 3001;


// app.use(express.static(path.join(__dirname, "..", "client", "dist")));

// app.get("/*", async (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
// });


app.use(cors());
app.use(express.json());
app.use("/api", router); 


const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

pool.connect().then(() => {
  console.log("Connected to PostgreSQL database");
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
