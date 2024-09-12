const express = require("express");
const router = express.Router();
const jwt = require("./jwt.js");
const cookieParser = require("cookie-parser");

router.get("/", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM data WHERE user_email = $1", [
      email,
    ]);
    res.json(data.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  // console.log(req.body);
  //  See if user exists
  try {
    const user = await pool.query(`SELECT * FROM users WHERE email= $1;`, [
      email,
    ]);

    //Verifying if the user exists in the database
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "User not found!" });
    } else {
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
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in!" });
  }
});

module.exports = router;
