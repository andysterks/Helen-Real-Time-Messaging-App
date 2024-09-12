const express = require("express");
const router = express.Router();
// const jwt = require("./jwt");



router.post("/register", async (req, res) => {
  const { username, email } = req.body;
  console.log(req.body);
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

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );
    res.json({ users: newUser.rows });
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});


module.exports = router;
