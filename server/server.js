const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");
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
app.get("/api/users", (req, res) => {
  res.send("all users saying hello!");
});

// Create a user
app.post("/api/user", (req, res) => {
  res.send("created user saying hello!");
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
