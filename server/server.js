const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");
const { Client } = require("pg");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

const port = 3001;

const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from this origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

// Database connection configuration
const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
});

// Secret key for JWT
const SECRET_KEY = process.env.SECRET_KEY;
// Endpoint for user login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch user from database
    const queryResult = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    const user = queryResult.rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const userCheck = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const addUserQuery =
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email";
    const newUserResult = await client.query(addUserQuery, [
      username,
      email,
      hashedPassword,
    ]);

    // Generate a JWT token (optional)
    const newUser = newUserResult.rows[0];

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Respond with the new user and token
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Example of a protected route
app.get("/api/user", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

// Get all messages
app.get("/api/messages", (req, res) => {
  res.send("all messages saying hello!");
});

// // Create a chat message
app.post("/api/message", (req, res) => {
  res.send("created message saying hello!");
});

// // Get all users
app.get("/api/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json("all users saying hello!");
  } catch (error) {
    console.error(error);
  }
});

// // Create a user
app.post("/api/user", async (req, res) => {
  const { message } = req.body;
  const newUser = await pool.query(
    "INSERT INTO users (message) VALUES ($1) RETURNING *",
    [message]
  );

  res.json(newUser.rows[0]);
});

// Get a single users
// app.get("/api/user/{id}", (req, res) => {
//   res.send("single user saying hello!");
// });

// app.get("/api/username", (req, res) => {
//   console.log("Enanaye calling POST Request");
// });

app.listen(port, () => {
  console.log(`Server listening and running on ${port}`);
});
