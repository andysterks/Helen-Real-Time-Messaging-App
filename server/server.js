const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    headers: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

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

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  //  See if user exists
  try {
    const user = await pool.query(`SELECT * FROM users WHERE email= $1;`, [
      email,
    ]);

    //Verifying if the user exists in the database
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "User not found!" });
    }

    const passwordIsMatch = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!passwordIsMatch) {
      return res.status(400).json({ message: "Enter the correct password!" });
    }
    const token = jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful!", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in!" });
  }
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const isUserExisting = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (isUserExisting.rows.length > 0) {
      return res
        .status(409)
        .json({ message: "Email already registered. Try Logging in." });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );
    return res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
