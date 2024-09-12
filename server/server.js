const express = require("express");
const app = express();
const router = express.Router();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./db");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const port = 3001;

app.use(cors());
app.use(express.json());


const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT || 5432,
});

pool.connect().then(() => {
  console.log("Connected to PostgreSQL database");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
