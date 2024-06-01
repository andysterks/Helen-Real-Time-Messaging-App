const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("../db/db");

const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/api/name", (req, res) => {
  const response = {
    name: "Asheeta",
    //  name: "Enanaye",
  };
  res.send(response);
});

// Get all messages
app.get("/api/messages", (req, res) => {
  res.send("all messages saying hello!");
});

// Create a chat message
app.post("/api/message", (req, res) => {
  res.send("created message saying hello!");
  console.log("created message saying hello!");
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json("all users saying hello!");
  } catch (error) {
    console.error(error);
  }
});

// Create a user
app.post("/api/user", async (req, res) => {
  const { message } = req.body;
  const newUser = await pool.query(
    "INSERT INTO users (message) VALUES ($1) RETURNING *",
    [message]
  );

  res.json(newUser.rows[0]);
});

// Get a single users
app.get("/api/user/{id}", (req, res) => {
  res.send("single user saying hello!");
});

app.get("/api/username", (req, res) => {
  console.log("Enanaye calling POST Request");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
