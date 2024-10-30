const express = require("express");
const router = express.Router();
// const jwt = require("../jwt.js");
const bcrypt = require("bcrypt");
const db = require("../db");

router.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  console.log(req.body)
  // Basic example check (replace this with real validation)
  if (username === 'user' && password === 'pass') {
    res.status(200).json({ message: 'Login successful!' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});


// router.post("/api/login", async (req, res) => {
//   const { email, password } = req.body;

//   //  See if user exists
//   try {
//     const user = await db.query(`SELECT * FROM users WHERE email= $1;`, [
//       email,
//     ]);

//     //Verifying if the user exists in the database
//     if (user.rows.length === 0) {
//       return res.status(400).json({ message: "User not found!" });
//     }

//     const passwordIsMatch = await bcrypt.compare(
//       password,
//       user.rows[0].password
//     );

//     if (!passwordIsMatch) {
//       return res.status(400).json({ message: "Enter the correct password!" });
//     }
//     const token = jwt.sign(
//       { id: user.rows[0].id, email: user.rows[0].email },
//       JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.json({ message: "Login successful!", token });
//   } catch (error) {
//     res.status(500).json({ message: "Error logging in!" });
//   }
// });

// router.post("/data", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const data = await pool.query("SELECT * FROM data WHERE user_email = $1", [
//       email,
//     ]);
//     res.json(data.rows);
//   } catch (err) {
//     console.error("Error fetching data:", err.message);
//     res.status(500).json({ message: "Error fetching data" });
//   }
// });

module.exports = router;
