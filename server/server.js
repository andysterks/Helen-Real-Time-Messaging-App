const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

// Use CORS middleware
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("api/name", (req, res) => {
  const response = {
    name: "Asheeta",
    // name: "Enanaye",
  };
  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
