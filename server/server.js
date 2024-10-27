const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const { Pool } = require("pg");
const loginRoutes = require("./router/loginRouters");
const registerRoutes = require("./router/registerRouters");
const { createDeflate } = require("zlib");
const router = express.Router();
require("dotenv").config();createDeflate

const port = 3001;



app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use("/api", loginRoutes);
app.use("/api", registerRoutes);

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
