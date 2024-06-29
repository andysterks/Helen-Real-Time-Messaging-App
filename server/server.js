const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");
const { Pool } = require("pg");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const port = 3001;

app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST ,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT || 5432,
});


pool
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");

    // Execute SQL queries here

    pool.query("SELECT * FROM users", (err, result) => {
      if (err) {
        console.error("Error executing query", err);
      } else {
        console.log("Query result:", result.rows);
      }

      // Close the connection when done
      pool
        .end()
        .then(() => {
          console.log("Connection to PostgreSQL closed");
        })
        .catch((err) => {
          console.error("Error closing connection", err);
        });
    });
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database", err);
  });

// Secret key for JWT
const SECRET_KEY = process.env.SECRET_KEY;

// Endpoint for user login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.query.body;

  try {
    // Fetch user from database
    const pool = await pool.connect();
    const database = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = queryResult.rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });
    console.log("User authenticated successfully, token generated");
    res.json({ token });
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Received registration request:", req.body);

  try {
    // Check if the user already exists
    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userCheck.rows.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const addUserQuery =
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email";
    const newUserResult = await pool.query(addUserQuery, [
      username,
      email,
      hashedPassword,
    ]);
    const newUser = newUserResult.rows[0];

    // Generate a JWT token for the new user

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    console.log("JWT token generated successfully:", token);
  } catch (error) {
    console.error("Error generating JWT token:", error);
    return res
      .status(500)
      .json({ message: "Error generating token", error: error.message });
  }

  console.log("User registered successfully. Token generated");

  res.status(201).json({ user: newUser, token });
  // res.send(`User ${username} registered successfully`);
  console.error("Error during registration:", error);
  res
    .status(500)
    .json({ message: "Internal server error", error: error.message });
});

// Example of a protected route
// app.get("/api/user", authenticateToken, (req, res) => {
//   res.json({ message: "This is a protected route", user: req.user });
// });

// // Get all messages
// app.get("/api/messages", (req, res) => {
//   res.send("all messages saying hello!");
// });

// // // Create a chat message
// app.post("/api/message", (req, res) => {
//   res.send("created message saying hello!");
// });

// // // Get all users
// app.get("/api/users", async (req, res) => {
//   try {
//     const allUsers = await pool.query("SELECT * FROM users");
//     res.json("all users saying hello!");
//   } catch (error) {
//     console.error(error);
//   }
// });

// // Create a user
// app.post("/api/user", async (req, res) => {
//   console.log("Received request:", req.body);
//   // const { message } = req.body;
//   const { email, password } = req.body;

//   try {
//     if (email === newUser.email && password === newUser.password) {
//       // User exists and password matches
//       console.log("Responding with user data:", newUser); // Log the user data response
//       res.json({ token: "response.data.token" });
//     } else {
//       // User does not exist
//       console.log("User not found"); // Log user not found
//       res.status(404).json({ message: "User not found" });
//     }

//     console.log("Responding with user data:", newUser);
//     res.json(newUser);
//   } catch (error) {
//     console.error("Error processing request:", error);
//     res
//       .status(500)
//       .json({ message: "Internal server error", error: error.message });
//   }
// });

// Get a single users
// app.get("/api/user/{id}", (req, res) => {
//  console.log("single user saying hello!");
// });

// app.get("/api/username", (req, res) => {
//   console.log("Enanaye calling POST Request");
// });

app.listen(port, () => {
  console.log(`Server listening and running on ${port}`);
});
